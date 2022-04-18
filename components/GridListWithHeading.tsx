import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Icon,
	Text,
	Stack,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
	return {
		id: i,
		title: "Мы ценим ваше мнение",
		text: "Мы всегда советуемся с посетителями для составления меню тех блюд, которые вы любите больше всего.",
	};
});

export default function GridListWithHeading() {
	return (
		<Box p={4}>
			<Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
				<Heading fontSize={"3xl"}>Мы ценим ваше мнение</Heading>
				<Text color={"gray.600"} fontSize={"xl"}>
					Мы всегда советуемся с посетителями для составления меню тех блюд,
					которые вы любите больше всего.
				</Text>
			</Stack>

			<Container maxW={"6xl"} mt={10}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
					{features.map((feature) => (
						<HStack key={feature.id} align={"top"}>
							<Box color={"green.400"} px={2}>
								<Icon as={CheckIcon} />
							</Box>
							<VStack align={"start"}>
								<Text fontWeight={600}>{feature.title}</Text>
								<Text color={"gray.600"}>{feature.text}</Text>
							</VStack>
						</HStack>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}
