import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	IconButton,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import info from "../lib/info";
import promo from "../lib/promo";
import { _blur } from "../lib/recoil-atoms";
import { ProductImage } from "./MenuBox";
import MotionTag from "./motion/MotionTag";
import MotionTopIconBox from "./motion/MotionTopIconBox";

export default function PromoBox() {
	const { t, lang } = useTranslation("common");

	const router = useRouter();
	const { colorMode } = useColorMode();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const [blurMode] = useRecoilState(_blur);
	const [random] = useState(Math.random() * (-1 - 9 + 1) + 9);
	const chooseSidePromo = useCallback(() => {
		return random;
	}, [router]);

	return (
		<Box
			transition="box-shadow .5s ease, background-color .5s ease, border .5s ease, background .6s ease, backdrop-filter .3s ease"
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
			backdropFilter={blurMode.blur ? "auto" : "none"}
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
					<MotionTag>{info.promo[lang as "en" | "ru"]}</MotionTag>
				)}
				<MotionTopIconBox>
					<IconButton aria-label="Promo" icon={<IoRestaurantOutline />} />
				</MotionTopIconBox>
			</div>
			{promo(lang as "en" | "ru")
				.map((item) => (
					<Box key={item.name} padding="1rem">
						<Stack spacing={3}>
							<Box height="16rem" position="relative">
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
				.at(chooseSidePromo())}
		</Box>
	);
}
