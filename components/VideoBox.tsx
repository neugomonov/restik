import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";

import {
	Box,
	useColorMode,
	Heading,
	useToast,
	IconButton,
	useDisclosure,
	Tag,
	chakra,
	Flex,
	AspectRatio,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";
import { BiMoviePlay, BiNews } from "react-icons/bi";

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

export default function VideoBox() {
	const router = useRouter();

	const [cart, setCart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();

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
			mb=".5rem"
			top=".5rem"
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
						Видео{" "}
					</Tag>
				)}
				<IconButton aria-label="Videos" icon={<BiMoviePlay />} />
			</div>
			<AspectRatio maxW="560px" ratio={16 / 9} my="6" mx="auto">
				<iframe
					title="pizza"
					src="https://www.youtube.com/embed/3ZEGG1mb3Rc?&autoplay=1&mute=1&loop=1&list=PLWDQtIyZRZu17Oha9o2zC0aD7adlmAZl6"
					allowFullScreen
				/>
			</AspectRatio>
			<Flex my="5" justifyContent="center">
				<Heading as="h3" size="md" maxW="61%" textAlign="center">
					Как мы делаем нашу пиццу такой вкусной
				</Heading>
			</Flex>
		</Box>
	);
}
