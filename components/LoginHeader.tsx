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
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import { FiChevronDown } from "react-icons/fi";
export default function LoginHeader() {
	const { data: session } = useSession();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};
	const { t, lang } = useTranslation("common");

	if (session) {
		return (
			<>
				<Flex
					alignItems={"center"}
					as={motion.div}
					cursor="pointer"
					drag
					dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
					whileDrag={{ scale: 1.2, rotate: 10 }}
					dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
					whileTap={{
						scale: 0.9,
					}}
					whileHover={{
						scale: 1.2,
						transition: { type: "spring", bounce: 0.8, duration: 1 },
					}}
				>
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
							<MenuItem onClick={handleClick("/profile")}>👤 Профиль</MenuItem>
							<MenuDivider />
							<MenuItem onClick={() => signOut()}>🚪 Выйти</MenuItem>
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
				as={motion.div}
				cursor="pointer"
				drag
				dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
				whileDrag={{ scale: 1.2, rotate: 10 }}
				dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
				whileTap={{
					scale: 0.9,
				}}
				whileHover={{
					scale: 1.2,
					transition: { type: "spring", bounce: 0.8, duration: 1 },
				}}
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
					{t("signIn")}
				</Button>
			</Stack>
		</>
	);
}
