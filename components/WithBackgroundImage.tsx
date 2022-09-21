import {
	Button,
	Flex,
	Stack,
	Text,
	useBreakpointValue,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function WithBackgroundImage() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};

	return (
		<Flex
			w={"full"}
			h={"100vh"}
			backgroundImage={
				"url(https://c.tenor.com/BzlZ-dn6xKoAAAAC/oven-cooking.gif?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
			}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}
		>
			<VStack
				w={"full"}
				justify={"center"}
				px={useBreakpointValue({ base: 4, md: 8 })}
				bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
			>
				<Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
					<Text
						color={"white"}
						fontWeight={700}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
					>
						Готовим вкуснейшую пиццу по лучшим традициям поваров рейтинга
						Мишлена. Попробуйте!{" "}
					</Text>
					<Stack direction={"row"}>
						<Button
							colorScheme={"orange"}
							rounded={"full"}
							bg={"orange.400"}
							_hover={{ bg: "orange.500" }}
							data-testid="button"
							onClick={handleClick("/menu")}
						>
							К пиццам! 🍕
						</Button>
					</Stack>
				</Stack>
			</VStack>
		</Flex>
	);
}
