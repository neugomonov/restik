import {
	IconButton,
	Stack,
	Tag,
	Text,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { IoMdCart } from "react-icons/io";
import { useRecoilState } from "recoil";
import { _blur, _cart } from "../lib/recoil-atoms";
import CartDrawerBody from "./CartDrawerBody";
import CartDrawerFooter from "./CartDrawerFooter";

const Drawer = dynamic(async () => (await import("@chakra-ui/react")).Drawer);
const DrawerHeader = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerHeader
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

export default function Cart() {
	const [cart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const { t } = useTranslation("common");
	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	const [blurMode] = useRecoilState(_blur);

	// 🔨 There are other anonymous functions in the tree that need refactoring too, I'll deal with them later. Later...
	return (
		<>
			<IconButton
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
								top={-3}
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
				boxShadow="lg"
				onClick={onOpen}
			/>
			<Drawer
				isOpen={isOpen}
				placement="right"
				// @ts-expect-error - Type 'MutableRefObject<undefined>' is not assignable to type 'RefObject<FocusableElement>'.
				finalFocusRef={btnRef}
				scrollBehavior="inside"
				onClose={onClose}
			>
				<DrawerOverlay>
					<DrawerContent
						transition="box-shadow .5s ease, background-color .5s ease, border .3s ease, border-color .3s ease, background .3s ease, backdrop-filter .3s ease"
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						backdropFilter={blurMode.blur ? "auto" : "none"}
						backdropBlur="20px"
					>
						<DrawerCloseButton />
						<DrawerHeader>{t("cart")}</DrawerHeader>
						<CartDrawerBody />
						<CartDrawerFooter />
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
}
