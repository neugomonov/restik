import {
	Box,
	Heading,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { IoRestaurantOutline } from "react-icons/io5";
import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import { ProductImage } from "../components/MenuBox";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";
import MotionTag from "../components/motion/MotionTag";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";
import promo from "../lib/promo";

function Promo() {
	const { t, lang } = useTranslation("home");

	return (
		<>
			<MenuContentMotionWrapper>
				<MenuContentChakraWrapper>
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
						<SimpleGrid
							minChildWidth="15rem"
							spacing={3}
							justifyContent="center"
							alignItems="center"
							pt="1rem"
						>
							{promo(lang as "en" | "ru").map((item) => (
								<Link key={item.name}>
									<Box borderWidth="1px" borderRadius="lg" padding="1rem">
										<Stack spacing={3}>
											<Box height="10rem" position="relative">
												<ProductImage
													src={`/${item.image}`}
													alt={`${t("photoOf")} ${item.name}`}
													draggable={false}
													loading="lazy"
													decoding="async"
													// @ts-expect-error - Type 'true' is not assignable to type 'ResponsiveValue<Union<Color | "current" | ... 176 more ... | "chakra-placeholder-color">> | undefined'.ts(2322)
													fill
													sizes="(max-width: 768px) 100vw,
											(max-width: 1200px) 50vw,
											33vw"
													objectFit="cover"
													borderRadius="md"
												/>
											</Box>
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
				</MenuContentChakraWrapper>
			</MenuContentMotionWrapper>
		</>
	);
}

Promo.PageLayout = WithSideContentLayout;

export default Promo;
