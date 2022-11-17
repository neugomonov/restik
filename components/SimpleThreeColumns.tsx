import {
	Box,
	Container,
	Flex,
	Icon,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { ReactElement } from "react";
import { FcAssistant, FcInTransit, FcLike } from "react-icons/fc";
import index from "../lib";

interface FeatureProps {
	title: string;
	text: string;
	icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
	return (
		<Stack>
			<Flex
				w={16}
				h={16}
				align={"center"}
				justify={"center"}
				color={"white"}
				rounded={"full"}
				bg={"gray.100"}
				mb={1}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
			<Text colorScheme={"gray"}>{text}</Text>
		</Stack>
	);
};

export default function SimpleThreeColumns() {
	const { lang } = useTranslation("index");
	return (
		<Box as={Container} maxW="7xl" mt={14} p={4}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				<Feature
					icon={<Icon as={FcAssistant} w={10} h={10} />}
					title={index.SimpleThreeColumns1[lang as "en" | "ru"]}
					text={index.SimpleThreeColumns2[lang as "en" | "ru"]}
				/>
				<Feature
					icon={<Icon as={FcLike} w={10} h={10} />}
					title={index.SimpleThreeColumns3[lang as "en" | "ru"]}
					text={index.SimpleThreeColumns4[lang as "en" | "ru"]}
				/>
				<Feature
					icon={<Icon as={FcInTransit} w={10} h={10} />}
					title={index.SimpleThreeColumns5[lang as "en" | "ru"]}
					text={index.SimpleThreeColumns6[lang as "en" | "ru"]}
				/>
			</SimpleGrid>
		</Box>
	);
}
