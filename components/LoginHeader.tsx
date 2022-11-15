import {
	Avatar,
	Button,
	HStack,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import MotionBox from "./motion/MotionBox";
export default function LoginHeader() {
	const { data: session } = useSession();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t, lang } = useTranslation("common");

	if (session) {
		return (
			<>
				<MotionBox>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								<Avatar size={"sm"} src={session?.user?.image!} />
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("rgb(255, 255, 255)", "rgb(6, 8, 13)")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuItem onClick={handleClick("/profile")}>
								👤 {t("profile")}
							</MenuItem>
							<MenuDivider />
							<MenuItem onClick={() => signOut()}>🚪 {t("signOut")}</MenuItem>
						</MenuList>
					</Menu>
				</MotionBox>
			</>
		);
	}
	return (
		<>
			<MotionBox>
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
			</MotionBox>
		</>
	);
}
