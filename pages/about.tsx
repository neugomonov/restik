import React, { useRef } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";
import SidebarWithHeader from "../components/SidebarWithHeader";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";

import {
	Box,
	useColorMode,
	useToast,
	useDisclosure,
	chakra,
	Flex,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";
import SplitWithImage from "../components/SplitWithImage";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import GridListWithHeading from "../components/GridListWithHeading";
import GridListWithCTA from "../components/GridListWithCTA";

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

const ProductImage = chakra(NextImage, {
	shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

const Index: NextPage<unknown> = () => {
	const router = useRouter();

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
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();
	const cancelRef = useRef();

	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	const deliveryHours = getDeliveryHours(new Date());

	return (
		<>
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				<Flex
					flexDirection={{ base: "column", xl: "row" }}
					mr={{ base: "1rem", xl: "0" }}
				>
					<Box
						transition=".3s ease"
						borderWidth="1px"
						borderRadius="lg"
						padding="1rem"
						margin=".5rem"
						width="100%"
						mt={{ base: "6rem", md: ".5rem" }}
						boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
						backgroundColor={
							colorMode === "dark"
								? "rgba(6, 8, 13, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
						position="relative"
						backdropFilter="auto"
						backdropBlur="20px"
					>
						<SplitWithImage />
						<GridListWithHeading />
						<GridListWithCTA />
						<SimpleThreeColumns />
					</Box>
				</Flex>
				<LargeWithNewsletter />
			</Flex>
			<SidebarWithHeader children />
			<Cart />
		</>
	);
};

export default Index;
