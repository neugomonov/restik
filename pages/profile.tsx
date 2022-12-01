import {
	Box,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { CgProfile } from "react-icons/cg";
import LoginHeader from "../components/LoginHeader";
import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import MainContentMotionWrapper from "../components/motion/MainContentMotionWrapper";
import MotionTag from "../components/motion/MotionTag";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import OrdersTable from "../components/OrdersTable";
import { WithSideContentLayout } from "../layouts/menu";
import index from "../lib";
import info from "../lib/info";
import { ProfileUserBlock } from "./../components/ProfileUserBlock";

function Profile() {
	const { colorMode } = useColorMode();
	const { data: session } = useSession();
	const { t, lang } = useTranslation("common");
	const color = useColorModeValue("gray.600", "gray.300");

	// TODO: there is a problem with the gif on narrow devices. Gotta fix.
	return (
		<>
			<MainContentMotionWrapper>
				<MenuContentChakraWrapper>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						{info.isDevelopment && <MotionTag>{t("profile")}</MotionTag>}
						<MotionTopIconBox>
							<IconButton aria-label="Profile" icon={<CgProfile />} />
						</MotionTopIconBox>
					</div>
					<Stack spacing={5}>
						<Stack
							minW={{ base: "auto", xl: "20rem" }}
							spacing={3}
							px={{ base: "1rem", xl: "10%" }}
							direction={"row"}
						>
							<Stack
								direction={{ base: "column-reverse", lg: "row" }}
								spacing={3}
							>
								<Box
									padding="1rem"
									width="100%"
									minW={{ base: "auto", xl: "50%" }}
								>
									<Flex alignItems={"center"} justifyContent={"center"} mx="2">
										{session ? (
											<ProfileUserBlock
												session={session}
												colorMode={colorMode}
												color={color}
											/>
										) : (
											<LoginHeader />
										)}
									</Flex>
								</Box>
								<Stack
									direction="column"
									pl={{ base: "none", xl: "10%" }}
									spacing={5}
								>
									<Heading size="lg">
										{index.profileMessage[lang as "en" | "ru"]}
									</Heading>
									<Image
										src="https://images.squarespace-cdn.com/content/v1/529fb134e4b0dbf53fa8fa91/1519937177934-Y9HTRD1O0HTVDJECU42X/02_.gif"
										alt="profile card gif"
										draggable={false}
										loading="lazy"
										decoding="async"
										width="auto"
										height={300}
										objectFit="cover"
										borderRadius="md"
									/>
								</Stack>
							</Stack>
						</Stack>
						{session ? (
							<Stack
								alignItems={"center"}
								justifyContent={"center"}
								direction="column"
							>
								<Box
									borderWidth="1px"
									borderRadius="lg"
									padding="1rem"
									width="100%"
									minW={{ base: "auto", xl: "50%" }}
								>
									<OrdersTable />
								</Box>
							</Stack>
						) : (
							<></>
						)}
					</Stack>
				</MenuContentChakraWrapper>
			</MainContentMotionWrapper>
		</>
	);
}

Profile.PageLayout = WithSideContentLayout;

export default Profile;
