import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { useSession } from "next-auth/react";

import {
	Box,
	useColorMode,
	Stack,
	Avatar,
	AvatarBadge,
	Heading,
	SimpleGrid,
	ButtonGroup,
	Button,
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
	IconButton,
	useDisclosure,
	Tag,
	Divider,
	chakra,
	Flex,
	useToast,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineTranslate } from "react-icons/hi";
import axios from "axios";
import info from "../lib/info";
import menu from "../lib/menu";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const Tooltip = dynamic(async () => (await import("@chakra-ui/react")).Tooltip);
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
	const { data: session } = useSession();
	const toast = useToast();
	const { register, handleSubmit, watch } = useForm<FormState>();
	const { colorMode } = useColorMode();
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();
	const { t, lang } = useTranslation("menu");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [company, setCompany] = useState("");
	const [email, setEmail] = useState("");
	const [floor, setFloor] = useState("");
	const [name, setName] = useState("");
	const [notes, setNotes] = useState("");
	const [payment, setPayment] = useState("");
	const [phone, setPhone] = useState("");
	const [postal, setPostal] = useState("");
	const [time, setTime] = useState("");
	const [tip, setTip] = useState("");

	const items = cart.items.map((x) => x.quantity).reduce((a, b) => a + b, 0);
	const deliveryHours = getDeliveryHours(new Date());
	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		let element = cart.items[index];
		let csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");
		stringified = stringified.concat(", ", csvString);
	}

	let stringifiedProducts = stringified.substring(2);
	// const handleNew = async () => {
	// };

	const onSubmit = async (data: FormData) => {
		console.log(data);
		// console.log(name.value);
		// console.log(address);
		// console.log(city);
		// console.log(company);
		// console.log(email);
		// console.log(floor);
		// console.log(name);
		// console.log(notes);
		// console.log(payment);
		// console.log(phone);
		// console.log(postal);
		// console.log(time);
		// console.log(tip);

		// console.log(data.get("email"));

		// console.log(stringifiedProducts);
		let disco = cart.total - cart.total * 0.3;
		let currentTime = new Date().getTime() / 1000;
		let timeOfDiscoEnd = 1661776053;
		let total = 0;
		currentTime < timeOfDiscoEnd ? (total = disco) : (total = cart.total);
		const products = stringifiedProducts;
		const timestamp = serverTimestamp();
		const status = "Принят";
		const collectionRef = collection(db, "orders");
		const payload = {
			products,
			phone,
			address,
			payment,
			total,
			email,
			timestamp,
			status,
			tip,
			time,
			postal,
			notes,
			name,
			floor,
			company,
			city,
		};
		const docRef = await addDoc(collectionRef, payload);
		setCart({ items: [], total: 0 });
		toast({
			title: "Заказ принят",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
		if (payment == "stripe") {
			const stripe = await stripePromise;
			const checkoutSession = await axios.post("api/create-checkout-session", {
				items: cart.items,
				email: email,
				phone: phone,
			});
			const result = await stripe?.redirectToCheckout({
				sessionId: checkoutSession.data.id,
			})!;
			if (result.error) {
				alert(result.error.message);
			}
		}
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
								await router.push("/menu", "/en/menu", { locale: "en" });
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
						src="/images/chief.jpg"
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
					<Text colorScheme={"gray"}>
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
									width="3840"
									height={1920}
									objectFit="cover"
									borderRadius="md"
								/>
								<Flex width="100%" justifyContent="space-between">
									<Heading size="md">{item.name}</Heading>
									<Text colorScheme={"gray"}>¼ / ½ kg</Text>
								</Flex>
								{/* создание позиции меню из сетки блюд*/}
								<Text as="i" colorScheme={"gray"} fontSize=".8rem">
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
								{/* создание позиции меню из сетки блюд - конец*/}

								<ButtonGroup isAttached>
									{item.variants.map((element) => (
										<Button
											key={element.type}
											leftIcon={<IoMdAdd />}
											colorScheme="orange"
											width="100%"
											data-testid="testbutton"
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
									onChange={(event) => setName(event.currentTarget.value)}
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
									onChange={(event) => setEmail(event.currentTarget.value)}
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
										onChange={(event) => setPhone(event.currentTarget.value)}
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
									onChange={(event) => setCompany(event.currentTarget.value)}
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
									onChange={(event) => setAddress(event.currentTarget.value)}
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
									onChange={(event) => setPostal(event.currentTarget.value)}
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
									onChange={(event) => setCity(event.currentTarget.value)}
								/>
							</FormControl>
							<FormControl id="floor">
								<FormLabel>{t("floor")}</FormLabel>
								<Input
									ref={register}
									name="floor"
									type="text"
									placeholder="5"
									onChange={(event) => setFloor(event.currentTarget.value)}
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
									onChange={(event) => setTime(event.currentTarget.value)}
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
									onChange={(event) => setNotes(event.currentTarget.value)}
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
									onChange={(event) => setPayment(event.currentTarget.value)}
								>
									<option value="cash">{t("cash")}</option>
									<option value="stripe">Онлайн</option>
								</Select>
							</FormControl>
							<FormControl id="tip">
								<FormLabel>{t("tip")}</FormLabel>
								<Select
									ref={register}
									name="tip"
									defaultValue="none"
									onChange={(event) => setTip(event.currentTarget.value)}
								>
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
									href="https://en.wikipedia.org/wiki/Terms_of_service"
								>
									{t("terms")}
								</Link>{" "}
								{t("and")}{" "}
								<Link
									color={colorMode === "dark" ? "yellow.500" : "orange.500"}
									href="https://foundation.wikimedia.org/wiki/Privacy_policy"
								>
									{t("privacy")}
								</Link>
								.
							</Checkbox>
							<Button
								type="submit"
								colorScheme="orange"
								isDisabled={
									!deliveryHours ||
									deliveryHours.length === 0 ||
									cart.total == 0
								}
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
