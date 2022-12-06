import { Avatar, Box, ColorMode, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { FiChevronDown } from "react-icons/fi";
import ProfileButtons from "./ProfileButtons";

export function ProfileUserBlock({
	session,
	colorMode,
	color,
}: {
	session: Session;
	colorMode: ColorMode;
	color: "gray.600" | "gray.300";
}) {
	return (
		<Box
			p={4}
			alignItems={"center"}
			justifyContent={"center"}
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
				{/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
				<Avatar size={"3xl"} src={session.user?.image!} />
				<VStack alignItems="center" spacing="0" ml="2">
					<Text fontSize="3xl">{session.user?.name}</Text>
					<Text fontSize="sm" color={color}>
						{/* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */}
						{session.user?.email!}
					</Text>
					<ProfileButtons />
				</VStack>
				<Box
					display={{
						base: "none",
						md: "flex",
					}}
					as={motion.div}
					cursor="pointer"
					drag
					dragConstraints={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
					whileDrag={{
						scale: 1.2,
					}}
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
	);
}
