import {
	Box,
	Button,
	chakra,
	Container,
	Divider,
	Flex,
	Grid,
	GridItem,
	VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import index from "../lib";
import info from "../lib/info";

interface FeatureProps {
	heading: string;
	text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
	return (
		<GridItem>
			<chakra.h3 fontSize="xl" fontWeight="600">
				{heading}
			</chakra.h3>
			<chakra.p>{text}</chakra.p>
		</GridItem>
	);
};

export default function gridListWithCTA() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};
	const { t, lang } = useTranslation("info");

	return (
		<Box as={Container} maxW="7xl" mt={14} p={4}>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(2, 1fr)",
				}}
				gap={4}
			>
				<GridItem colSpan={1}>
					<VStack alignItems="flex-start" spacing="20px">
						<chakra.h2 fontSize="3xl" fontWeight="700">
							{index.GridListWithCTA1[lang as "en" | "ru"]}
						</chakra.h2>
						<Button
							colorScheme="orange"
							size="md"
							onClick={handleClick("/chat")}
						>
							{info.chat[lang as "en" | "ru"]}
						</Button>
					</VStack>
				</GridItem>
				<GridItem>
					<Flex>
						<chakra.p>{index.GridListWithCTA2[lang as "en" | "ru"]}</chakra.p>
					</Flex>
				</GridItem>
			</Grid>
			<Divider mt={12} mb={12} />
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(4, 1fr)",
				}}
				gap={{ base: "8", sm: "12", md: "16" }}
			>
				<Feature
					heading={index.GridListWithCTA3[lang as "en" | "ru"]}
					text={index.GridListWithCTA4[lang as "en" | "ru"]}
				/>
				<Feature
					heading={index.GridListWithCTA5[lang as "en" | "ru"]}
					text={index.GridListWithCTA6[lang as "en" | "ru"]}
				/>
				<Feature
					heading={index.GridListWithCTA7[lang as "en" | "ru"]}
					text={index.GridListWithCTA8[lang as "en" | "ru"]}
				/>
				<Feature
					heading={index.GridListWithCTA9[lang as "en" | "ru"]}
					text={index.GridListWithCTA10[lang as "en" | "ru"]}
				/>
			</Grid>
		</Box>
	);
}
