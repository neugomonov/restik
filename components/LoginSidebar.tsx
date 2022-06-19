import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import router from "next/router";
import { FiChevronDown } from "react-icons/fi";
export default function LoginSidebar() {
	const { colorMode } = useColorMode();

	const { data: session, status } = useSession();

	if (session) {
		return (
			<>
				<Flex
					alignItems={"center"}
					justifyContent={"center"}
					display={{ base: "none", md: "flex" }}
					mx="2"
				>
					<Menu>
						<MenuButton _focus={{ boxShadow: "none" }}>
							<Box
								p={4}
								alignItems={"center"}
								justifyContent={"center"}
								display={{ base: "none", md: "flex" }}
								borderWidth="1px"
								borderRadius="lg"
								boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
								backgroundColor={
									colorMode === "dark"
										? "rgba(6, 8, 13, 0.25)"
										: "rgba(255, 255, 255, 0.25)"
								}
								position="relative"
							>
								<HStack>
									<Avatar size={"sm"} src={session?.user?.image!} />
									<VStack
										display={{ base: "none", md: "flex" }}
										alignItems="flex-start"
										spacing="1px"
										ml="2"
									>
										<Text fontSize="sm">{session?.user?.name}</Text>
										<Text
											fontSize="xs"
											color={useColorModeValue("gray.600", "gray.300")}
										>
											{session?.user?.email!.length! >= 13
												? `${session?.user?.email!.slice(0, 10)}...`
												: session?.user?.email!}
										</Text>
									</VStack>
									<Box display={{ base: "none", md: "flex" }}>
										<FiChevronDown />
									</Box>
								</HStack>
							</Box>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem
								onClick={async () => {
									await router.push("/profile", "/profile", { locale: "ru" });
								}}
							>
								Профиль
							</MenuItem>
							<MenuDivider />
							<MenuItem onClick={() => signOut()}>Выйти</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</>
		);
	}
	return (
		<>
			<Stack
				pt="1rem"
				flex={{ base: 1, md: 0 }}
				justify={"center"}
				direction={"row"}
				spacing={6}
			>
				<Button
					size="lg"
					variant="outline"
					display={{ base: "none", md: "inline-flex" }}
					fontSize={"sm"}
					fontWeight={600}
					colorScheme={"orange"}
					onClick={() => signIn()}
					data-testid="button"
				>
					Войти
				</Button>
			</Stack>
		</>
	);
}
