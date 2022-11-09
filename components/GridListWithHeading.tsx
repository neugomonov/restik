import { CheckIcon } from "@chakra-ui/icons";
import {
	Box,
	Container,
	Heading,
	HStack,
	Icon,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import index from "../lib";

const features = Array.apply(null, Array(8)).map(function (x, i) {
	return {
		id: i,
		title: index.GridListWithHeading3,
		text: index.GridListWithHeading4,
	};
});

export default function GridListWithHeading() {
	const { t, lang } = useTranslation("common");

	return (
		<Box p={4}>
			<Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
				<Heading fontSize={"3xl"}>
					{" "}
					{index.GridListWithHeading1[lang as "en" | "ru"] ??
						t("sampleHeading")}
				</Heading>
				<Text colorScheme={"gray"} fontSize={"xl"}>
					{index.GridListWithHeading2[lang as "en" | "ru"] ?? t("sampleText")}
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
								<Text fontWeight={600}>
									{feature.title[lang as "en" | "ru"] ?? t("sampleHeading")}
								</Text>
								<Text colorScheme={"gray"}>
									{feature.text[lang as "en" | "ru"] ?? t("sampleText")}
								</Text>
							</VStack>
						</HStack>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}
