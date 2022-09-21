import {
	Box,
	chakra,
	Heading,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import NextImage from "next/image";
import { IoRestaurantOutline } from "react-icons/io5";
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
									<Text colorScheme={"gray"}>03.04.2022</Text>

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
