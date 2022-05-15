import { ReactElement } from "react";
import {
	Box,
	SimpleGrid,
	Icon,
	Text,
	Stack,
	Flex,
	Container,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit, FcLike } from "react-icons/fc";

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
	return (
		<Box as={Container} maxW="7xl" mt={14} p={4}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				<Feature
					icon={<Icon as={FcAssistant} w={10} h={10} />}
					title={"Наша Поддержка"}
					text={
						"Мы всегда советуемся с посетителями для составления меню тех блюд, которые вы любите больше всего."
					}
				/>
				<Feature
					icon={<Icon as={FcLike} w={10} h={10} />}
					title={"Ваши отзывы"}
					text={
						"Мы всегда советуемся с посетителями для составления меню тех блюд, которые вы любите больше всего."
					}
				/>
				<Feature
					icon={<Icon as={FcInTransit} w={10} h={10} />}
					title={"Быстрая доставка"}
					text={
						"Мы всегда советуемся с посетителями для составления меню тех блюд, которые вы любите больше всего."
					}
				/>
			</SimpleGrid>
		</Box>
	);
}
