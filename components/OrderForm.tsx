import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	Link,
	Select,
	SimpleGrid,
	Stack,
	Textarea,
	useColorMode,
	useToast,
} from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";

const stripePromise = loadStripe(process.env.stripe_public_key!);

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
	payment: "Cash" | "Online";
	tip?: string;
};

export default function OrderForm() {
	const [cart, setCart] = useRecoilState(_cart);
	const toast = useToast();
	const { register, handleSubmit } = useForm<FormState>();
	const { colorMode } = useColorMode();
	const { t } = useTranslation("menu");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [company, setCompany] = useState("");
	const [email, setEmail] = useState("");
	const [floor, setFloor] = useState("");
	const [name, setName] = useState("");
	const [notes, setNotes] = useState("");
	const [payment, setPayment] = useState("");
	// eslint-disable-next-line prefer-const
	let [phone, setPhone] = useState("");
	const [postal, setPostal] = useState("");
	const [time, setTime] = useState("");
	const [tip, setTip] = useState("");

	const deliveryHours = getDeliveryHours(new Date());
	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		const csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");
		stringified = stringified.concat(", ", csvString);
	}

	const stringifiedProducts = stringified.substring(2);

	const onSubmit = async () => {
		const disco = cart.total - cart.total * 0.1;
		const currentTime = new Date().getTime() / 1000;
		const timeOfDiscoEnd = 1661776053;
		let total = 0;
		currentTime < timeOfDiscoEnd && payment !== "Online"
			? (total = disco)
			: (total = cart.total);
		phone = "+7 " + phone;
		const products = stringifiedProducts;
		const timestamp = serverTimestamp();
		const status = t("accepted");
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
		const phonePattern = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/i;
		if (phonePattern.test(phone)) {
			await addDoc(collectionRef, payload);
			setCart({ items: [], total: 0 });
			toast({
				title: t("success"),
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			await addDoc(collection(db, `notifications`), {
				recipient: email,
				text: t("yourOrder") + status + "!",
				timestamp: timestamp,
				read: false,
			});

			if (payment === "Online") {
				const stripe = await stripePromise;
				const checkoutSession = await axios.post(
					"api/create-checkout-session",
					{
						items: cart.items,
						email: email,
						phone: phone,
					}
				);
				const result = await stripe?.redirectToCheckout({
					sessionId: checkoutSession.data.id,
				});
				if (result?.error) {
					alert(result?.error.message);
				}
			}
		} else {
			toast({
				title: t("phoneWarning"),
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	type DescribableFunction = {
		(value: string): void;
	};

	const handleForm = (
		setter: DescribableFunction
	): ((
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void) => {
		return (
			event: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			setter(event.currentTarget.value);
		};
	};

	const tipCalculate = (multiplier: number): number => {
		return (
			Math.round(((cart.total / 100) * multiplier + Number.EPSILON) * 100) / 100
		);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={5}>
				<Heading size="md">{t("contact", { ns: "menu" })}</Heading>
				<SimpleGrid minChildWidth="18rem" spacing={5}>
					<FormControl isRequired id="name">
						<FormLabel>{t("name")}</FormLabel>
						<Input
							{...register}
							isRequired
							name="name"
							type="text"
							placeholder={t("namePlaceholder")}
							onChange={handleForm(setName)}
						/>
					</FormControl>
					<FormControl isRequired id="email">
						<FormLabel>{t("email")}</FormLabel>
						<Input
							{...register}
							isRequired
							name="email"
							type="email"
							placeholder="ivanov_i@gmail.com"
							onChange={handleForm(setEmail)}
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
								{...register}
								isRequired
								name="phone"
								type="phone"
								placeholder="908 123 45 67"
								onChange={handleForm(setPhone)}
							/>
						</InputGroup>
					</FormControl>
					<FormControl id="company">
						<FormLabel>{t("company")}</FormLabel>
						<Input
							{...register}
							name="company"
							type="text"
							placeholder={t("companyPlaceholder")}
							onChange={handleForm(setCompany)}
						/>
					</FormControl>
				</SimpleGrid>
				<Heading size="md">{t("delivery")}</Heading>
				<SimpleGrid minChildWidth="18rem" spacing={5}>
					<FormControl isRequired id="address">
						<FormLabel>{t("address")}</FormLabel>
						<Input
							{...register}
							isRequired
							name="address"
							type="text"
							placeholder={t("addressPlaceholder")}
							onChange={handleForm(setAddress)}
						/>
					</FormControl>
					<FormControl isRequired id="postal">
						<FormLabel>{t("postal")}</FormLabel>
						<Input
							{...register}
							isRequired
							name="postal"
							type="text"
							placeholder="603001"
							onChange={handleForm(setPostal)}
						/>
					</FormControl>
					<FormControl isRequired id="city">
						<FormLabel>{t("city")}</FormLabel>
						<Input
							{...register}
							isRequired
							name="city"
							type="text"
							placeholder={t("cityPlaceholder")}
							onChange={handleForm(setCity)}
						/>
					</FormControl>
					<FormControl id="floor">
						<FormLabel>{t("floor")}</FormLabel>
						<Input
							{...register}
							name="floor"
							type="text"
							placeholder="5"
							onChange={handleForm(setFloor)}
						/>
					</FormControl>
				</SimpleGrid>
				<Heading size="md">{t("time")}</Heading>
				<SimpleGrid minChildWidth="18rem" spacing={5}>
					<FormControl isRequired id="time">
						<FormLabel>{t("deliveryTime")}</FormLabel>
						<Select
							{...register}
							isRequired
							name="time"
							placeholder={t("select")}
							onChange={handleForm(setTime)}
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
							{...register}
							name="notes"
							resize="vertical"
							placeholder={t("deliveryPlaceholder")}
							onChange={handleForm(setNotes)}
						/>
					</FormControl>
				</SimpleGrid>
				<Heading size="md">{t("payment")}</Heading>
				<SimpleGrid minChildWidth="18rem" spacing={5}>
					<FormControl isRequired id="payment">
						<FormLabel>{t("paymentMethod")}</FormLabel>
						<Select
							{...register}
							isRequired
							name="payment"
							placeholder={t("select")}
							onChange={handleForm(setPayment)}
						>
							<option value="Cash">{t("cash")}</option>
							<option value="Online">{t("online")}</option>
						</Select>
					</FormControl>
					<FormControl id="tip">
						<FormLabel>{t("tip")}</FormLabel>
						<Select
							{...register}
							name="tip"
							defaultValue="none"
							onChange={handleForm(setTip)}
						>
							<option value="none">{t("tipNone")}</option>
							<option value={`${tipCalculate(5)} ${info.currency}`}>
								5% ({tipCalculate(5)} {info.currency})
							</option>
							<option value={`${tipCalculate(10)} ${info.currency}`}>
								10% ({tipCalculate(10)} {info.currency})
							</option>
							<option value={`${tipCalculate(15)} ${info.currency}`}>
								15% ({tipCalculate(15)} {info.currency})
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
					<Box
						as={motion.button}
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 0.99 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.99,
						}}
						whileHover={{
							scale: 1.01,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
					>
						<Button
							width="100%"
							type="submit"
							colorScheme="orange"
							isDisabled={
								!deliveryHours || deliveryHours.length === 0 || cart.total == 0
							}
						>
							{payment === "Online" ? t("placeAndPay") : t("pay")}
						</Button>
					</Box>
				</Stack>
			</Stack>
		</form>
	);
}
