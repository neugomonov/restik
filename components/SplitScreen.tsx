import {
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";

export default function SplitScreen() {
	return (
		<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} align={"center"} justify={"center"}>
				<Stack spacing={6} w={"full"} maxW={"lg"}>
					<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
						<Text
							as={"span"}
							position={"relative"}
							_after={{
								content: "''",
								width: "full",
								height: useBreakpointValue({ base: "20%", md: "30%" }),
								position: "absolute",
								bottom: 1,
								left: 0,
								bg: "orange.400",
								zIndex: -1,
							}}
						>
							Мы во всех
						</Text>
						<br />{" "}
						<Text color={"orange.400"} as={"span"}>
							соцсетях
						</Text>{" "}
					</Heading>
					<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
						Там мы размещаем наши новые акции. Подписывайтесь и будьте в курсе
						всех выгодных предложений нашей пиццерии!{" "}
					</Text>
					<Stack direction={{ base: "column", md: "row" }} spacing={4}>
						<Button
							rounded={"full"}
							bg={"orange.400"}
							color={"white"}
							_hover={{
								bg: "orange.500",
							}}
						>
							Посмотреть наши акции{" "}
						</Button>
						<Button rounded={"full"}>Далее</Button>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={"Login Image"}
					objectFit={"cover"}
					src={
						"https://images.notquitenigella.com/images/spaghetti-pizza/__spaghetti-pizza-recipe-2.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
					}
				/>
			</Flex>
		</Stack>
	);
}
