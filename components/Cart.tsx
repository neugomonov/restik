import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import stringifyCartPositions from "./stringifyCartPositions";

import {
	useColorMode,
	Stack,
	Heading,
	ButtonGroup,
	Button,
	useToast,
	Link,
	Text,
	IconButton,
	useDisclosure,
	Tag,
	Divider,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import useTranslation from "next-translate/useTranslation";
import {
	IoMdAdd,
	IoMdCart,
	IoMdTrash,
	IoMdRemove,
	IoMdCheckmarkCircle,
} from "react-icons/io";

import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";
import { useSession } from "next-auth/react";

const Drawer = dynamic(async () => (await import("@chakra-ui/react")).Drawer);
const DrawerBody = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerBody
);
const DrawerHeader = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerHeader
);
const DrawerFooter = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerFooter
);
const DrawerOverlay = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerOverlay
);
const DrawerContent = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerContent
);
const DrawerCloseButton = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerCloseButton
);
const Stat = dynamic(async () => (await import("@chakra-ui/react")).Stat);
const StatLabel = dynamic(
	async () => (await import("@chakra-ui/react")).StatLabel
);
const StatNumber = dynamic(
	async () => (await import("@chakra-ui/react")).StatNumber
);
const StatHelpText = dynamic(
	async () => (await import("@chakra-ui/react")).StatHelpText
);
const AlertDialog = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialog
);
const AlertDialogBody = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialogBody
);
const AlertDialogHeader = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialogHeader
);
const AlertDialogFooter = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialogFooter
);
const AlertDialogContent = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialogContent
);
const AlertDialogOverlay = dynamic(
	async () => (await import("@chakra-ui/react")).AlertDialogOverlay
);

export default function MenuBox() {
	const router = useRouter();
	const { data: session } = useSession();

	const [cart, setCart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const cancelRef = useRef();
	const { t, lang } = useTranslation("common");
	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	let handleNew = stringifyCartPositions();

	return (
		<>
			<IconButton
				isRound
				colorScheme="orange"
				aria-label={t("openCart")}
				size="lg"
				icon={
					<Stack direction="row" spacing={2}>
						<IoMdCart />
						<Text>{t("cart")}</Text>
						{cart.items.length > 0 && (
							<Tag
								borderRadius="full"
								colorScheme="red"
								variant="solid"
								position="absolute"
								top={items >= 10 ? -3 : -1}
								right={-1}
							>
								{items >= 10 ? "10+" : items}
							</Tag>
						)}
					</Stack>
				}
				position="fixed"
				bottom={5}
				right={5}
				width="7rem"
				boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
				onClick={onOpen}
			/>
			<Drawer
				isOpen={isOpen}
				placement="right"
				// @ts-expect-error
				finalFocusRef={btnRef}
				scrollBehavior="inside"
				onClose={onClose}
			>
				<DrawerOverlay>
					<DrawerContent
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						backdropFilter="auto"
						backdropBlur="20px"
					>
						<DrawerCloseButton />
						<DrawerHeader>{t("cart")}</DrawerHeader>

						<DrawerBody>
							{cart.items.length > 0 ? (
								<Stack spacing={3}>
									{cart.items.map((item) => (
										<Stack
											key={`${item.name}-${item.type}`}
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Text as="b">
												{item.quantity}x {item.name}
											</Text>
											<Text as="i">{item.type}</Text>
											<Divider width="1rem" />
											<ButtonGroup isAttached>
												<IconButton
													size="md"
													aria-label={t("remove")}
													icon={<IoMdRemove />}
													onClick={() => {
														if (item.quantity === 1) {
															setCart((previous) => ({
																items: previous.items.filter(
																	(element) =>
																		element.name !== item.name ||
																		element.type !== item.type
																),
																total: previous.total - item.price,
															}));
														} else {
															setCart((previous) => ({
																items: [
																	...previous.items.filter(
																		(element) =>
																			element.name !== item.name ||
																			element.type !== item.type
																	),
																	{
																		name: item.name,
																		type: item.type,
																		price: item.price,
																		quantity: item.quantity - 1,
																	},
																],
																total: previous.total - item.price,
															}));
														}
													}}
												/>
												<IconButton
													size="md"
													aria-label={t("add")}
													icon={<IoMdAdd />}
													onClick={() => {
														setCart((previous) => ({
															items: [
																...previous.items.filter(
																	(element) =>
																		element.name !== item.name ||
																		element.type !== item.type
																),
																{
																	name: item.name,
																	type: item.type,
																	price: item.price,
																	quantity: item.quantity + 1,
																},
															],
															total: previous.total + item.price,
														}));
														console.log(cart.items);
													}}
												/>
											</ButtonGroup>
										</Stack>
									))}
									<Divider />
									<Stat textAlign="right">
										<StatLabel>{t("grandTotal")}</StatLabel>
										<StatNumber>
											{cart.total} {info.currency}
										</StatNumber>
										<StatHelpText>{t("includesFreeDelivery")}</StatHelpText>
									</Stat>
								</Stack>
							) : (
								<Stack textAlign="center" marginTop="5rem">
									<Heading size="md">{t("emptyCart")}</Heading>
									<Text>
										Давай, добавь{" "}
										<Link
											color={colorMode === "dark" ? "yellow.500" : "orange.600"}
											onClick={async () => {
												await router.push("/menu", "/menu", {
													locale: "ru",
												});
											}}
										>
											что-нибудь вкусненькое
										</Link>
										!
									</Text>
								</Stack>
							)}
						</DrawerBody>

						<DrawerFooter paddingBottom="1rem">
							<Button
								mr="2"
								colorScheme="red"
								variant="outline"
								leftIcon={<IoMdTrash />}
								disabled={cart.items.length === 0}
								onClick={onAlertOpen}
							>
								{t("purge")}
							</Button>
							<Button
								leftIcon={<IoMdCheckmarkCircle />}
								mr={3}
								onClick={async () => {
									await onClose();
									await handleNew(session);
								}}
								disabled={cart.items.length === 0}
							>
								К заказу{" "}
							</Button>
							<AlertDialog
								isOpen={isAlertOpen}
								// @ts-expect-error
								leastDestructiveRef={cancelRef}
								onClose={onAlertClose}
							>
								<AlertDialogOverlay>
									<AlertDialogContent
										backdropFilter="auto"
										backgroundColor={
											colorMode === "dark"
												? "rgba(6, 8, 13, 0.75)"
												: "rgba(255, 255, 255, 0.75)"
										}
										backdropBlur="20px"
									>
										<AlertDialogHeader fontSize="lg" fontWeight="bold">
											{t("purgeCart")}
										</AlertDialogHeader>

										<AlertDialogBody>{t("purgeCartMessage")}</AlertDialogBody>

										<AlertDialogFooter>
											<Button
												// @ts-expect-error
												ref={cancelRef}
												onClick={onAlertClose}
											>
												{t("cancel")}
											</Button>
											<Button
												colorScheme="red"
												ml={3}
												onClick={() => {
													setCart({ items: [], total: 0 });
													onAlertClose();

													toast({
														title: t("cartPurged"),
														status: "success",
														duration: 3000,
														isClosable: true,
													});
												}}
											>
												{t("confirm")}
											</Button>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialogOverlay>
							</AlertDialog>
						</DrawerFooter>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
}
