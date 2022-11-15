import {
	Box,
	chakra,
	Heading,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextImage from "next/image";
import { IoRestaurantOutline } from "react-icons/io5";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import MotionTag from "../components/motion/MotionTag";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";
import promo from "../lib/promo";

function Promo() {
	const { t, lang } = useTranslation("home");
	const ProductImage = chakra(NextImage, {
		shouldForwardProp: (prop) =>
			["width", "height", "src", "alt"].includes(prop),
	});

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
					<MotionTag>{info.promo[lang as "en" | "ru"]}</MotionTag>
				)}{" "}
				<MotionTopIconBox>
					<IconButton aria-label="Promo" icon={<IoRestaurantOutline />} />
				</MotionTopIconBox>
			</div>
			<Stack spacing={5}>
				{" "}
				<SimpleGrid
					minChildWidth="15rem"
					spacing={3}
					justifyContent="center"
					alignItems="center"
					pt="1rem"
				>
					{promo(lang as "en" | "ru").map((item) => (
						<Link>
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
									<Text colorScheme={"gray"}>{item.date}</Text>

									<Heading size="md" mr="1%">
										{item.name}
									</Heading>
									<Text colorScheme={"gray"} fontSize=".8rem">
										{item.ingredients.join(", ")}
									</Text>
								</Stack>
							</Box>
						</Link>
					))}
				</SimpleGrid>
			</Stack>
		</>
	);
}

Promo.PageLayout = WithSideContentLayout;

export default Promo;
