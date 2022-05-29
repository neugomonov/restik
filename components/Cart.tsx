import React, { useRef } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";
import SidebarWithHeader from "./SidebarWithHeader";
import stringifyCartPositions from "./stringifyCartPositions";

import {
	Center,
	Box,
	useColorMode,
	Stack,
	HStack,
	Avatar,
	AvatarBadge,
	Heading,
	SimpleGrid,
	ButtonGroup,
	Button,
	useToast,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftAddon,
	Input,
	Select,
	Textarea,
	Checkbox,
	Link,
	Text,
	Image,
	IconButton,
	useDisclosure,
	Tag,
	Divider,
	chakra,
	Flex,
	AspectRatio,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import {
	IoMdAdd,
	IoMdCart,
	IoMdTrash,
	IoMdRemove,
	IoMdCheckmarkCircle,
} from "react-icons/io";
import { HiOutlineTranslate } from "react-icons/hi";

import info from "../lib/info";
import menu from "../lib/menu";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";

import LargeWithNewsletter from "./Footer";
import { MdOutlineSkipNext } from "react-icons/md";
import { BiMoviePlay, BiNews } from "react-icons/bi";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	addDoc,
	collection,
	FieldValue,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";

const Tooltip = dynamic(async () => (await import("@chakra-ui/react")).Tooltip);
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
const UnorderedList = dynamic(
	async () => (await import("@chakra-ui/react")).UnorderedList
);
const ListItem = dynamic(
	async () => (await import("@chakra-ui/react")).ListItem
);
const Menu = dynamic(async () => (await import("@chakra-ui/react")).Menu);
const MenuButton = dynamic(
	async () => (await import("@chakra-ui/react")).MenuButton
);
const MenuList = dynamic(
	async () => (await import("@chakra-ui/react")).MenuList
);
const MenuItem = dynamic(
	async () => (await import("@chakra-ui/react")).MenuItem
);

type FormState = {
	name: string;
	email: string;
	phone: string;
	company?: string;
	address: string;
	postal: string;
	city: string;
	floor?: string;
	time: string;
	notes?: string;
	payment: "cash" | "stripe";
	tip?: string;
};

const ProductImage = chakra(NextImage, {
	shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

export default function MenuBox() {
	const router = useRouter();
	const { data: session } = useSession();

	const [cart, setCart] = useRecoilState(_cart);
	const { register, handleSubmit, watch } = useForm<FormState>();
	const { colorMode } = useColorMode();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();
	const cancelRef = useRef();
	const { t, lang } = useTranslation("common");

	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	const deliveryHours = getDeliveryHours(new Date());

	const onSubmit = (data: FormData) => {
		console.log(data);
	};
	// console.log(JSON.stringify(cart.items));
	// let cartItemsString = cart.items.map(({ name }) => name);
	// console.log(cartItemsString.join(", "));
	// console.log(
	// 	cart.items
	// 		.map(function (x) {
	// 			return x.name;
	// 		})
	// 		.join(", ")
	// );

	// console.log(Object.values(cart.items).join());
	// console.log(cart.total);
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
								onClick={handleNew}
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
