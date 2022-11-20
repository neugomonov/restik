import {
	Button,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { IoMdCheckmarkCircle, IoMdTrash } from "react-icons/io";
import { useRecoilState } from "recoil";
import { _blur, _cart } from "../lib/recoil-atoms";
import MotionBox from "./motion/MotionBox";
import stringifyCartPositions from "./stringifyCartPositions";

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
	const [blurMode] = useRecoilState(_blur);

	// 🔨 There are other anonymous functions in the tree that need refactoring too, I'll deal with them later. Later...
	return (
		<DrawerFooter paddingBottom="1rem">
			<MotionBox>
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
			</MotionBox>
			<MotionBox>
				<Button
					leftIcon={<IoMdCheckmarkCircle />}
					mr={3}
					onClick={async () => {
						await onClose();
						await handleNew(session);
					}}
					disabled={cart.items.length === 0}
				>
					{t("proceed")}
				</Button>
			</MotionBox>
			<AlertDialog
				isOpen={isAlertOpen}
				// @ts-expect-error - Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<FocusableElement>'.
				leastDestructiveRef={cancelRef}
				onClose={onAlertClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent
						transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
						backdropFilter={blurMode.blur ? "auto" : "none"}
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
							<MotionBox>
								<Button
									// @ts-expect-error - Type 'MutableRefObject<undefined>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
									ref={cancelRef}
									onClick={onAlertClose}
								>
									{t("cancel")}
								</Button>
							</MotionBox>
							<MotionBox>
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
							</MotionBox>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</DrawerFooter>
	);
}
