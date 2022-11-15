import {
	Avatar,
	Box,
	Flex,
	Heading,
	IconButton,
	Image,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { CgProfile } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import LoginHeader from "../components/LoginHeader";
import MotionTopIconBox from "../components/motion/MotionTopIconBox";
import MotionTag from "../components/motion/MotionTag";
import OrdersTable from "../components/OrdersTable";
import ProfileButtons from "../components/ProfileButtons";
import { WithSideContentLayout } from "../layouts/menu";
import index from "../lib";
import info from "../lib/info";

function Profile() {
	const { colorMode } = useColorMode();
	const { data: session } = useSession();
	const { t, lang } = useTranslation("common");
	// TODO: there is a problem with the gif on narrow devices. Gotta fix.
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && <MotionTag>{t("profile")}</MotionTag>}{" "}
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
					<Stack direction={{ base: "column-reverse", lg: "row" }} spacing={3}>
						<Box padding="1rem" width="100%" minW={{ base: "auto", xl: "50%" }}>
							<Flex alignItems={"center"} justifyContent={"center"} mx="2">
								{session ? (
									<Box
										p={4}
										alignItems={"center"}
										justifyContent={"center"}
										transition=".3s ease"
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
										<VStack>
											<Avatar size={"3xl"} src={session.user?.image!} />
											<VStack alignItems="center" spacing="0" ml="2">
												<Text fontSize="3xl">{session.user?.name}</Text>
												<Text
													fontSize="sm"
													color={useColorModeValue("gray.600", "gray.300")}
												>
													{session.user?.email!}
												</Text>
												<ProfileButtons />{" "}
											</VStack>
											<Box
												display={{ base: "none", md: "flex" }}
												as={motion.div}
												cursor="pointer"
												drag
												dragConstraints={{
													top: 0,
													left: 0,
													right: 0,
													bottom: 0,
												}}
												whileDrag={{ scale: 1.2 }}
												dragTransition={{
													bounceStiffness: 1399,
													bounceDamping: 10,
												}}
												whileTap={{
													scale: 0.9,
												}}
												whileHover={{
													scale: 1.2,
													transition: {
														type: "spring",
														bounce: 0.8,
														duration: 1,
													},
												}}
											>
												<FiChevronDown />
											</Box>
										</VStack>
									</Box>
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
				)}{" "}
			</Stack>
		</>
	);
}

Profile.PageLayout = WithSideContentLayout;

export default Profile;
