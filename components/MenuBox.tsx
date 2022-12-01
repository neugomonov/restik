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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { IoMdAdd } from "react-icons/io";
import { IoPizzaOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import info from "../lib/info";
import menu from "../lib/menu";
import { _cart } from "../lib/recoil-atoms";
import { getDeliveryHours } from "../utils/get-delivery-hours";
import MotionTag from "./motion/MotionTag";
import MotionTopIconBox from "./motion/MotionTopIconBox";
import OrderForm from "./OrderForm";

const Tooltip = dynamic(async () => (await import("@chakra-ui/react")).Tooltip);
const UnorderedList = dynamic(
	async () => (await import("@chakra-ui/react")).UnorderedList
);
const ListItem = dynamic(
	async () => (await import("@chakra-ui/react")).ListItem
);

export const ProductImage = chakra(NextImage, {
	shouldForwardProp: (prop) =>
		["width", "height", "src", "alt", "fill", "sizes"].includes(prop),
});

function MenuItem(props: {
	item: {
		name: string;
		image: string;
		ingredients: string[];
		variants: {
			type: string;
			price: number;
		}[];
	};
}) {
	const [, setCart] = useRecoilState(_cart);
	const { t } = useTranslation("menu");
	const deliveryHours = getDeliveryHours(new Date());
	return (
		<Box borderWidth="1px" borderRadius="lg" padding="1rem">
			<Stack spacing={3}>
				<Box height="10rem" position="relative">
					<ProductImage
						src={`/${props.item.image}`}
						alt={`${t("photoOf")} ${props.item.name}`}
						draggable={false}
						loading="lazy"
						decoding="async"
						// @ts-expect-error - Type 'true' is not assignable to type 'ResponsiveValue<Union<"current" | Color | ... 176 more ... | "chakra-placeholder-color">> | undefined'.ts(2322)
						fill
						sizes="(max-width: 768px) 100vw,
										(max-width: 1200px) 50vw,
										33vw"
						objectFit="cover"
						borderRadius="md"
					/>
				</Box>
				<Flex width="100%" justifyContent="space-between">
					<Heading size="md">{props.item.name}</Heading>
					<Text colorScheme={"gray"}>¼ / ½ kg</Text>
				</Flex>
				<Text as="i" colorScheme={"gray"} fontSize=".8rem">
					{props.item.ingredients.join(", ").length >= 30 ? (
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
										{props.item.ingredients.map((element) => (
											<ListItem key={element}>{element}</ListItem>
										))}
									</UnorderedList>
								</>
							}
						>
							<Text>
								{`${props.item.ingredients.join(", ").slice(0, 27)}...`}
							</Text>
						</Tooltip>
					) : (
						props.item.ingredients.join(", ")
					)}
				</Text>
				<ButtonGroup
					isAttached
					as={motion.div}
					cursor="pointer"
					drag
					dragConstraints={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
					whileDrag={{
						scale: 0.9,
						rotate: 10,
					}}
					dragTransition={{
						bounceStiffness: 1399,
						bounceDamping: 10,
					}}
					whileTap={{
						scale: 0.9,
					}}
					whileHover={{
						scale: 1.05,
						transition: {
							type: "spring",
							bounce: 0.8,
							duration: 1,
						},
					}}
				>
					{props.item.variants.map((element) => (
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
										name: props.item.name,
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
	);
}

export default function MenuBox() {
	const [cart] = useRecoilState(_cart);
	const { t, lang } = useTranslation("menu");
	const deliveryHours = getDeliveryHours(new Date());
	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		const csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");
		stringified = stringified.concat(", ", csvString);
	}
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
						<MenuItem key={item.name} item={item}></MenuItem>
					))}
				</SimpleGrid>
				<Divider />
				<OrderForm />
			</Stack>
		</>
	);
}
