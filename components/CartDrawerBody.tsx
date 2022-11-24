import {
	ButtonGroup,
	Divider,
	Heading,
	IconButton,
	Link,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useRecoilState } from "recoil";
import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";

const DrawerBody = dynamic(
	async () => (await import("@chakra-ui/react")).DrawerBody
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

// TODO: make the drawer close on the text link click

export default function CartDrawerBody() {
	const router = useRouter();
	const [cart, setCart] = useRecoilState(_cart);
	const { colorMode } = useColorMode();
	const { t } = useTranslation("common");
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
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
		<DrawerBody>
			{cart.items.length > 0 ? (
				<Stack spacing={3}>
					{cart.items.map((item) => (
						<Stack
							key={`${item.name}-${item.type}`}
							direction="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Text as="b">
								{item.quantity}x {item.name}
							</Text>
							<Text as="i">{item.type}</Text>
							<Divider width="1rem" />
							<ButtonGroup isAttached>
								<IconButton
									size="md"
									aria-label={t("remove")}
									icon={<IoMdRemove />}
									onClick={handleRemovePositionClick(item)}
								/>
								<IconButton
									size="md"
									aria-label={t("add")}
									icon={<IoMdAdd />}
									onClick={handleAddPositionClick(item)}
								/>
							</ButtonGroup>
						</Stack>
					))}
					<Divider />
					<Stat textAlign="right">
						<StatLabel>{t("grandTotal")}</StatLabel>
						<StatNumber>
							{cart.total} {info.currency}
						</StatNumber>
						<StatHelpText>{t("includesFreeDelivery")}</StatHelpText>
					</Stat>
				</Stack>
			) : (
				<Stack textAlign="center" marginTop="5rem">
					<Heading size="md">{t("emptyCart")}</Heading>
					<Text>
						{t("emptyCartMessage1")}
						<Link
							color={colorMode === "dark" ? "yellow.500" : "orange.600"}
							onClick={handleClick("/menu")}
						>
							{t("emptyCartMessage2")}
						</Link>
						{t("emptyCartMessage3")}
					</Text>
				</Stack>
			)}
		</DrawerBody>
	);
}
