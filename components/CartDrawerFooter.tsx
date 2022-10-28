import {
	Button,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import { IoMdCheckmarkCircle, IoMdTrash } from "react-icons/io";
import { useRecoilState } from "recoil";
import { _cart } from "../lib/recoil-atoms";
import stringifyCartPositions from "./stringifyCartPositions";
import { ThemeContext } from "./ThemeContext";

const DrawerFooter = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerFooter
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

export default function CartDrawerFooter() {
	const router = useRouter();
	const { data: session } = useSession();

	const [cart, setCart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();
	const toast = useToast();
	const { onClose } = useDisclosure();
	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const cancelRef = useRef();
	const { t } = useTranslation("common");
	const handleNew = stringifyCartPositions();
	const { darkMode } = useContext(ThemeContext);

	// 🔨 There are other anonymous functions in the tree that need refactoring too, I'll deal with them later. Later...
	return (
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
						backdropBlur={darkMode ? "20px" : "0px"}
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
	);
}
