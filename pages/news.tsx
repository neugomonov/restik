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
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import NextImage from "next/image";
import { BiNews } from "react-icons/bi";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";
import news from "../lib/news";

function News() {
	const { t, lang } = useTranslation("home");
	const ProductImage = chakra(NextImage, {
		shouldForwardProp: (prop) =>
			["width", "height", "src", "alt"].includes(prop),
	});
	// TODO: figure out the way to not to re-render the secondary component when not needed
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
						as={motion.div}
						cursor="pointer"
						drag
						dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
						whileDrag={{ scale: 1.2, rotate: 10 }}
						dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
						whileTap={{
							scale: 0.9,
						}}
						whileHover={{
							scale: 1.2,
							transition: { type: "spring", bounce: 0.8, duration: 1 },
						}}
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						{info.news[lang as "en" | "ru"]}
					</Tag>
				)}
				<IconButton aria-label="News" icon={<BiNews />} />
			</div>
			<Stack spacing={5}>
				<SimpleGrid
					minChildWidth="15rem"
					spacing={3}
					justifyContent="center"
					alignItems="center"
					pt="1rem"
				>
					{news(lang as "en" | "ru").map((item) => (
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

News.PageLayout = WithSideContentLayout;

export default News;
