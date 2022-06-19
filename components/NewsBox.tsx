import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";

import {
	Box,
	useColorMode,
	Stack,
	Heading,
	Button,
	useToast,
	Text,
	Image,
	IconButton,
	useDisclosure,
	Tag,
	chakra,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";

import { BiMoviePlay, BiNews } from "react-icons/bi";
import { ArrowForwardIcon } from "@chakra-ui/icons";

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

export default function NewsBox() {
	const router = useRouter();

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
	const { t, lang } = useTranslation("home");

	return (
		<Box
			transition=".3s ease"
			borderWidth="1px"
			borderRadius="lg"
			padding="1rem"
			width={{ base: "100%", xl: "100%" }}
			boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
			backgroundColor={
				colorMode === "dark"
					? "rgba(6, 8, 13, 0.75)"
					: "rgba(255, 255, 255, 0.75)"
			}
			position="sticky"
			top="100%"
			backdropFilter="auto"
			backdropBlur="20px"
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && (
					<Tag
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						Новости{" "}
					</Tag>
				)}
				<IconButton aria-label="News" icon={<BiNews />} />
			</div>
			<Box padding="1rem">
				<Stack spacing={3}>
					<Image
						src="/images/covers/news/openup.jpg"
						draggable={false}
						loading="lazy"
						decoding="async"
						width="auto"
						height={150}
						objectFit="cover"
						borderRadius="md"
					/>
					<Text colorScheme={"gray"}>03.04.2022</Text>

					<Heading mr="1%">Мы открылись! 🎉 </Heading>
					<Text colorScheme={"gray"}>
						Заказывайте домой, ешьте у нас, следите за нашими новостями, будет
						много интересного. И вкусного! 🍕
					</Text>
					<Button
						rightIcon={<ArrowForwardIcon />}
						colorScheme="orange"
						variant="outline"
						data-testid="button"
						onClick={async () => {
							await router.push("/news", "/news", {
								locale: "ru",
							});
						}}
					>
						Новости
					</Button>
				</Stack>
			</Box>
		</Box>
	);
}
