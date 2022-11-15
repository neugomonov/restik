import {
	Avatar,
	AvatarBadge,
	Box,
	Button,
	ButtonGroup,
	chakra,
	Divider,
	Flex,
	Heading,
	IconButton,
	SimpleGrid,
	Stack,
	Text,
	useColorMode,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { IoMdAdd } from "react-icons/io";
import { IoPizzaOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import info from "../lib/info";
import menu from "../lib/menu";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";
import MotionTopIconBox from "./motion/MotionTopIconBox";
import MotionTag from "./motion/MotionTag";
import OrderForm from "./OrderForm";

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

const ProductImage = chakra(NextImage, {
	shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

export default function MenuBox() {
	const router = useRouter();
	const [cart, setCart] = useRecoilState(_cart);
	const toast = useToast();
	const { colorMode } = useColorMode();
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();
	const { t, lang } = useTranslation("menu");

	const deliveryHours = getDeliveryHours(new Date());
	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		const csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");
		stringified = stringified.concat(", ", csvString);
	}

	const stringifiedProducts = stringified.substring(2);

	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	type DescribableFunction = {
		(value: string): void;
	};
	// TODO: Make a reusable extended Chakra's Button component with my regularly used motion.div features. Or a Box wrapper with the Button as {children}.
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
					<MotionTag>{info.menu[lang as "en" | "ru"]}</MotionTag>
				)}
				<MotionTopIconBox>
					<IconButton aria-label="Pizza" icon={<IoPizzaOutline />} />
				</MotionTopIconBox>
			</div>
			<Stack spacing={5}>
				<Stack alignItems="center" spacing={3}>
					<Stack
						alignItems="center"
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 1.2, rotate: -10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
					>
						<Avatar
							as={motion.div}
							whileTap={{
								scale: 0.9,
							}}
							whileHover={{
								scale: 1.2,
								transition: { type: "spring", bounce: 0.8, duration: 1 },
							}}
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
						<Heading>
							{info.title[lang as "en" | "ru"] ?? t("restaurantName")}
						</Heading>
					</Stack>
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

								<ButtonGroup
									isAttached
									as={motion.div}
									cursor="pointer"
									drag
									dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
									whileDrag={{ scale: 0.9, rotate: 10 }}
									dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
									whileTap={{
										scale: 0.9,
									}}
									whileHover={{
										scale: 1.05,
										transition: { type: "spring", bounce: 0.8, duration: 1 },
									}}
								>
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
				<OrderForm />
			</Stack>
		</>
	);
}
