import { useColorModeValue } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import router from "next/router";
import MotionBox from "./motion/MotionBox";

const Avatar = dynamic(async () => (await import("@chakra-ui/react")).Avatar);
const Button = dynamic(async () => (await import("@chakra-ui/react")).Button);
const HStack = dynamic(async () => (await import("@chakra-ui/react")).HStack);
const Menu = dynamic(async () => (await import("@chakra-ui/react")).Menu);
const MenuButton = dynamic(
	async () => (await import("@chakra-ui/react")).MenuButton
);
const MenuDivider = dynamic(
	async () => (await import("@chakra-ui/react")).MenuDivider
);
const MenuItem = dynamic(
	async () => (await import("@chakra-ui/react")).MenuItem
);
const MenuList = dynamic(
	async () => (await import("@chakra-ui/react")).MenuList
);

export default function LoginHeader() {
	const { data: session } = useSession();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route);
		};
	};
	const { t } = useTranslation("common");
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
								{/*eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain*/}
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
