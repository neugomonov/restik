import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import info from "../lib/info";
import promo from "../lib/promo";
import { BlurContext } from "./BlurContext";

export default function PromoBox() {
	const { t, lang } = useTranslation("home");

	const router = useRouter();
	const { colorMode } = useColorMode();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};
	// @ts-expect-error
	const { blurMode } = useContext(BlurContext);

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
			backdropFilter={blurMode ? "auto" : "none"}
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
						as={motion.div}
						cursor="pointer"
						drag
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						{info.promo[lang as "en" | "ru"]}
					</Tag>
				)}
				<IconButton aria-label="Promo" icon={<IoRestaurantOutline />} />
			</div>
			{promo(lang as "en" | "ru")
				.map((item) => (
					<Box padding="1rem">
						<Stack spacing={3}>
							<Image
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
							<Text colorScheme={"gray"}>{item.date}</Text>

							<Heading mr="1%">{item.name}</Heading>
							<Text colorScheme={"gray"}>{item.ingredients.join(", ")}</Text>
							<Button
								rightIcon={<ArrowForwardIcon />}
								colorScheme="orange"
								variant="outline"
								onClick={handleClick("/promo")}
							>
								{info.promo[lang as "en" | "ru"]}
							</Button>
						</Stack>
					</Box>
				))
				.at(Math.random() * (-1 - 9 + 1) + 9)}
		</Box>
	);
}
