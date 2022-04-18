import React, { useRef } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";
import SidebarWithHeader from "./SidebarWithHeader";
import AppHeader from "./AppHeader";

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
	const { t, lang } = useTranslation("menu");

	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	const deliveryHours = getDeliveryHours(new Date());

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{/* {info.isDevelopment && (
        <Tag
            textTransform="uppercase"
            colorScheme="yellow"
            variant="solid"
            mb="1rem"
        >
            {t("development")}
        </Tag> */}
				{info.isDevelopment && (
					<Tag
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						Меню{" "}
					</Tag>
				)}
				<Menu
					isLazy
					isOpen={isMenuOpen}
					placement="left-end"
					onOpen={onMenuOpen}
					onClose={onMenuClose}
				>
					<MenuButton
						as={IconButton}
						aria-label="Change language"
						icon={<HiOutlineTranslate />}
						onClick={onMenuOpen}
					/>
					<MenuList
						backgroundColor={
							colorMode === "dark"
								? "rgba(50, 50, 50, 0.75)"
								: "rgba(255, 255, 255, 0.75)"
						}
					>
						<MenuItem
							onClick={async () => {
								await router.push("/menu", "/", { locale: "en" });
							}}
						>
							English
						</MenuItem>
						<MenuItem
							onClick={async () => {
								await router.push("/menu", "/ru/menu", { locale: "ru" });
							}}
						>
							Русский
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
			<Stack spacing={5}>
				<Stack alignItems="center" spacing={3}>
					<Avatar
						name={info.name}
						src="images/chief.jpg"
						size="2xl"
						draggable={false}
					>
						<Tooltip
							hasArrow
							label={
								deliveryHours && deliveryHours.length > 0
									? t("open")
									: t("closed")
							}
							aria-label={t("tooltip")}
							placement="right"
						>
							<AvatarBadge
								boxSize="2.8rem"
								bg={
									deliveryHours && deliveryHours.length > 0
										? "green.500"
										: "red.500"
								}
							/>
						</Tooltip>
					</Avatar>
					<Heading>{info.name ?? t("restaurantName")}</Heading>
					<Text color="gray.500">
						{info.description[lang as "en" | "ru"] ??
							t("restaurantDescription")}
					</Text>
				</Stack>
				<SimpleGrid
					minChildWidth="15rem"
					spacing={3}
					justifyContent="center"
					alignItems="center"
					pt="1rem"
				>
					{menu(lang as "en" | "ru").map((item) => (
						<Box
							key={item.name}
							borderWidth="1px"
							borderRadius="lg"
							padding="1rem"
						>
							<Stack spacing={3}>
								<ProductImage
									src={`/${item.image}`}
									alt={`${t("photoOf")} ${item.name}`}
									draggable={false}
									loading="lazy"
									decoding="async"
									width="auto"
									height={150}
									objectFit="cover"
									borderRadius="md"
								/>
								<Flex width="100%" justifyContent="space-between">
									<Heading size="md">{item.name}</Heading>
									<Text color="gray.500">¼ / ½ kg</Text>
								</Flex>
								<Text as="i" color="gray.500" fontSize=".8rem">
									{item.ingredients.join(", ").length >= 30 ? (
										<Tooltip
											hasArrow
											closeOnMouseDown
											padding={3}
											aria-label={t("ingredients")}
											label={
												<>
													<Heading size="sm" mb={1}>
														{t("ingredients")}
													</Heading>
													<UnorderedList>
														{item.ingredients.map((element) => (
															<ListItem key={element}>{element}</ListItem>
														))}
													</UnorderedList>
												</>
											}
										>
											<Text>
												{`${item.ingredients.join(", ").slice(0, 27)}...`}
											</Text>
										</Tooltip>
									) : (
										item.ingredients.join(", ")
									)}
								</Text>
								<ButtonGroup isAttached>
									{item.variants.map((element) => (
										<Button
											key={element.type}
											leftIcon={<IoMdAdd />}
											colorScheme="orange"
											width="100%"
											isDisabled={!deliveryHours || deliveryHours.length === 0}
											onClick={async () => {
												const { merge } = await import("../utils/merge");

												setCart((previous) => ({
													items: merge(previous.items, {
														name: item.name,
														type: element.type,
														price: element.price,
														quantity: 1,
													}),
													total: previous.total + element.price,
												}));
											}}
										>
											<Stack spacing={0}>
												<Text>{element.type}</Text>
												<Text opacity=".8" fontSize=".75rem">
													{element.price} {info.currency ?? "USD"}
												</Text>
											</Stack>
										</Button>
									))}
								</ButtonGroup>
							</Stack>
						</Box>
					))}
				</SimpleGrid>
				<Divider />
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={5}>
						<Heading size="md">{t("contact", { ns: "menu" })}</Heading>
						<SimpleGrid minChildWidth="18rem" spacing={5}>
							<FormControl isRequired id="name">
								<FormLabel>{t("name")}</FormLabel>
								<Input
									ref={register({ required: true })}
									isRequired
									name="name"
									type="text"
									placeholder={t("namePlaceholder")}
								/>
							</FormControl>
							<FormControl isRequired id="email">
								<FormLabel>{t("email")}</FormLabel>
								<Input
									ref={register({ required: true })}
									isRequired
									name="email"
									type="email"
									placeholder="ivanov_i@gmail.com"
								/>
							</FormControl>
							<FormControl isRequired id="phone">
								<FormLabel>{t("phone")}</FormLabel>
								<InputGroup>
									<InputLeftAddon
										// eslint-disable-next-line react/no-children-prop
										children={info.callingCode}
									/>
									<Input
										ref={register({ required: true })}
										isRequired
										name="phone"
										type="phone"
										placeholder="777 123 45 67"
									/>
								</InputGroup>
							</FormControl>
							<FormControl id="company">
								<FormLabel>{t("company")}</FormLabel>
								<Input
									ref={register}
									name="company"
									type="text"
									placeholder={t("companyPlaceholder")}
								/>
							</FormControl>
						</SimpleGrid>
						<Heading size="md">{t("delivery")}</Heading>
						<SimpleGrid minChildWidth="18rem" spacing={5}>
							<FormControl isRequired id="address">
								<FormLabel>{t("address")}</FormLabel>
								<Input
									ref={register({ required: true })}
									isRequired
									name="address"
									type="text"
									placeholder={t("addressPlaceholder")}
								/>
							</FormControl>
							<FormControl isRequired id="postal">
								<FormLabel>{t("postal")}</FormLabel>
								<Input
									ref={register({ required: true })}
									isRequired
									name="postal"
									type="text"
									placeholder="603001"
								/>
							</FormControl>
							<FormControl isRequired id="city">
								<FormLabel>{t("city")}</FormLabel>
								<Input
									ref={register({ required: true })}
									isRequired
									name="city"
									type="text"
									placeholder={t("cityPlaceholder")}
								/>
							</FormControl>
							<FormControl id="floor">
								<FormLabel>{t("floor")}</FormLabel>
								<Input
									ref={register}
									name="floor"
									type="text"
									placeholder="5"
								/>
							</FormControl>
						</SimpleGrid>
						<Heading size="md">{t("time")}</Heading>
						<SimpleGrid minChildWidth="18rem" spacing={5}>
							<FormControl isRequired id="time">
								<FormLabel>{t("deliveryTime")}</FormLabel>
								<Select
									ref={register({ required: true })}
									isRequired
									name="time"
									placeholder={t("select")}
								>
									{deliveryHours && deliveryHours.length > 0 && (
										<option value="asap">{t("asap")}</option>
									)}
									{deliveryHours?.map((date) => (
										<option key={date} value={date}>
											{date}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl id="notes">
								<FormLabel>{t("notes")}</FormLabel>
								<Textarea
									ref={register}
									name="notes"
									resize="vertical"
									placeholder={t("deliveryPlaceholder")}
								/>
							</FormControl>
						</SimpleGrid>
						<Heading size="md">{t("payment")}</Heading>
						<SimpleGrid minChildWidth="18rem" spacing={5}>
							<FormControl isRequired id="payment">
								<FormLabel>{t("paymentMethod")}</FormLabel>
								<Select
									ref={register({ required: true })}
									isRequired
									name="payment"
									placeholder={t("select")}
								>
									<option value="cash">{t("cash")}</option>
									<option value="stripe">Онлайн</option>
								</Select>
							</FormControl>
							<FormControl id="tip">
								<FormLabel>{t("tip")}</FormLabel>
								<Select ref={register} name="tip" defaultValue="none">
									<option value="none">{t("tipNone")}</option>
									<option
										value={`${
											Math.round(
												((cart.total / 100) * 5 + Number.EPSILON) * 100
											) / 100
										} ${info.currency}`}
									>
										5% (
										{Math.round(
											((cart.total / 100) * 5 + Number.EPSILON) * 100
										) / 100}{" "}
										{info.currency})
									</option>
									<option
										value={`${
											Math.round(
												((cart.total / 100) * 10 + Number.EPSILON) * 100
											) / 100
										} ${info.currency}`}
									>
										10% (
										{Math.round(
											((cart.total / 100) * 10 + Number.EPSILON) * 100
										) / 100}{" "}
										{info.currency})
									</option>
									<option
										value={`${
											Math.round(
												((cart.total / 100) * 15 + Number.EPSILON) * 100
											) / 100
										} ${info.currency}`}
									>
										15% (
										{Math.round(
											((cart.total / 100) * 15 + Number.EPSILON) * 100
										) / 100}{" "}
										{info.currency})
									</option>
								</Select>
							</FormControl>
						</SimpleGrid>
						<Divider />
						<Stack spacing={10} minWidth="18rem" pt="1rem">
							<Checkbox isRequired>
								{t("iAgree")}{" "}
								<Link
									color={colorMode === "dark" ? "yellow.500" : "orange.500"}
									href="#"
								>
									{t("terms")}
								</Link>{" "}
								{t("and")}{" "}
								<Link
									color={colorMode === "dark" ? "yellow.500" : "orange.500"}
									href="#"
								>
									{t("privacy")}
								</Link>
								.
							</Checkbox>
							<Button
								type="submit"
								colorScheme="orange"
								isDisabled={!deliveryHours || deliveryHours.length === 0}
							>
								{watch("payment") === "stripe" ? t("placeAndPay") : t("pay")}
							</Button>
						</Stack>
					</Stack>
				</form>
			</Stack>
		</>
	);
}

// export default MenuPage;
