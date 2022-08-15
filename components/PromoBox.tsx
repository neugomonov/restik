import React from "react";
import { useRouter } from "next/router";
import {
	Box,
	useColorMode,
	Stack,
	Heading,
	Button,
	Text,
	Image,
	IconButton,
	Tag,
} from "@chakra-ui/react";

import info from "../lib/info";
import { _cart } from "../lib/recoil-atoms";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IoRestaurantOutline } from "react-icons/io5";

export default function PromoBox() {
	const router = useRouter();
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
						Акции{" "}
					</Tag>
				)}
				<IconButton aria-label="Promo" icon={<IoRestaurantOutline />} />
			</div>
			<Box padding="1rem">
				<Stack spacing={3}>
					<Image
						src="images/covers/promo/pizza399.jpg"
						draggable={false}
						loading="lazy"
						decoding="async"
						width="auto"
						height={150}
						objectFit="cover"
						borderRadius="md"
					/>
					<Text colorScheme={"gray"}>03.04.2022</Text>

					<Heading mr="1%">Приходите за выгодой в пиццерию! </Heading>
					<Text colorScheme={"gray"}>
						За заказ доставки от 999 рублей дарим вкусные подарки!
					</Text>
					<Button
						rightIcon={<ArrowForwardIcon />}
						colorScheme="orange"
						variant="outline"
						onClick={async () => {
							await router.push("/promo", "/promo", {
								locale: "ru",
							});
						}}
					>
						Акции
					</Button>
				</Stack>
			</Box>
		</Box>
	);
}
