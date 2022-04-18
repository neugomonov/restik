import {
	Box,
	VStack,
	Button,
	Flex,
	Divider,
	chakra,
	Grid,
	GridItem,
	Container,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";

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
							Вы всегда можете связаться с нами
						</chakra.h2>
						<Button colorScheme="orange" size="md">
							Чат
						</Button>
					</VStack>
				</GridItem>
				<GridItem>
					<Flex>
						<chakra.p>
							Мы всегда советуемся с посетителями для составления меню тех блюд,
							которые вы любите больше всего.
						</chakra.p>
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
					heading={"Мы ценим ваше мнение"}
					text={"Вы всегда можете связаться с нами"}
				/>
				<Feature
					heading={"Мы ценим ваше мнение"}
					text={"Вы всегда можете связаться с нами"}
				/>
				<Feature
					heading={"Мы ценим ваше мнение"}
					text={"Вы всегда можете связаться с нами"}
				/>
				<Feature
					heading={"Мы ценим ваше мнение"}
					text={"Вы всегда можете связаться с нами"}
				/>
			</Grid>
		</Box>
	);
}
