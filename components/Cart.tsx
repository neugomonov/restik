import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useRef } from "react";
import stringifyCartPositions from "./stringifyCartPositions";

import {
	IconButton,
	Stack,
	Tag,
	Text,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";
import { IoMdCart } from "react-icons/io";
import { useRecoilState } from "recoil";

import { useSession } from "next-auth/react";
import { _cart } from "../lib/recoil-atoms";
import CartDrawerBody from "./CartDrawerBody";
import CartDrawerFooter from "./CartDrawerFooter";

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
interface CartPosition {
	quantity: string;
	name: string;
	type: string;
	price: string;
}

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
	const handleNew = stringifyCartPositions();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};
	const handleRemovePositionClick = (item: {
		quantity: number;
		name: string;
		type: string;
		price: number;
	}) => {
		return () => {
			if (item.quantity === 1) {
				setCart((previous) => ({
					items: previous.items.filter(
						(element) =>
							element.name !== item.name || element.type !== item.type
					),
					total: previous.total - item.price,
				}));
			} else {
				setCart((previous) => ({
					items: [
						...previous.items.filter(
							(element) =>
								element.name !== item.name || element.type !== item.type
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
		};
	};

	const handleAddPositionClick = (item: {
		quantity: number;
		name: string;
		type: string;
		price: number;
	}) => {
		return () => {
			setCart((previous) => ({
				items: [
					...previous.items.filter(
						(element) =>
							element.name !== item.name || element.type !== item.type
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
		};
	};
	// 🔨 There are other anonymous functions in the tree that need refactoring too, I'll deal with them later. Later...
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
						<CartDrawerBody />
						<CartDrawerFooter />
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
}
