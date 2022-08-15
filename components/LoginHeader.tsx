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
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import router from "next/router";
import { FiChevronDown } from "react-icons/fi";
export default function LoginHeader() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
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
										{session?.user?.email!}
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
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
				flex={{ base: 1, md: 0 }}
				justify={"center"}
				direction={"row"}
				spacing={6}
			>
				<Button
					variant="outline"
					display={"inline-flex"}
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
