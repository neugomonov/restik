import {
	Container,
	Flex,
	Heading,
	Icon,
	Image,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { ReactElement } from "react";
import { BiDish } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import index from "../lib";

interface FeatureProps {
	text: string;
	iconBg: string;
	icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
	return (
		<Stack direction={"row"} align={"center"}>
			<Flex
				w={8}
				h={8}
				align={"center"}
				justify={"center"}
				rounded={"full"}
				bg={iconBg}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

export default function SplitWithImage() {
	const { lang } = useTranslation("index");
	return (
		<Container maxW={"5xl"} py={12}>
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
				<Stack spacing={4}>
					<Text
						textTransform={"uppercase"}
						color={"blue.400"}
						fontWeight={600}
						fontSize={"sm"}
						bg={useColorModeValue("blue.50", "blue.900")}
						p={2}
						alignSelf={"flex-start"}
						rounded={"md"}
					>
						{index.SplitWithImage1[lang as "en" | "ru"]}
					</Text>
					<Heading> {index.SplitWithImage2[lang as "en" | "ru"]}</Heading>
					<Text colorScheme={"gray"} fontSize={"lg"}>
						{index.SplitWithImage3[lang as "en" | "ru"]}
					</Text>
					<Stack
						spacing={4}
						divider={
							<StackDivider
								borderColor={useColorModeValue("gray.100", "gray.700")}
							/>
						}
					>
						<Feature
							icon={<Icon as={BsPeople} color={"yellow.500"} w={5} h={5} />}
							iconBg={useColorModeValue("yellow.100", "yellow.900")}
							text={index.SplitWithImage4[lang as "en" | "ru"]}
						/>
						<Feature
							icon={<Icon as={BiDish} color={"green.500"} w={5} h={5} />}
							iconBg={useColorModeValue("green.100", "green.900")}
							text={index.SplitWithImage5[lang as "en" | "ru"]}
						/>
						<Feature
							icon={<Icon as={GiFruitBowl} color={"purple.500"} w={5} h={5} />}
							iconBg={useColorModeValue("purple.100", "purple.900")}
							text={index.SplitWithImage6[lang as "en" | "ru"]}
						/>
					</Stack>
				</Stack>
				<Flex>
					<Image
						rounded={"md"}
						alt={"feature image"}
						src={
							"https://possector.com/wordpress/wp-content/uploads/2012/01/KakograditiiizgraditidobartimuugostiteljstvuUspjehDobartimProfit0.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
						}
						objectFit={"cover"}
					/>
				</Flex>
			</SimpleGrid>
		</Container>
	);
}
