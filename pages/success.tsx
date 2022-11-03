import {
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";

function Success() {
	const router = useRouter();
	const handleClick = (route: string) => {
		return async () => {
			await router.push(route, route, {
				locale: "ru",
			});
		};
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				{info.isDevelopment && (
					<Tag
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
						textTransform="uppercase"
						colorScheme="orange"
						variant="solid"
						mb="1rem"
					>
						Заказ{" "}
					</Tag>
				)}
				<IconButton aria-label="Check" icon={<AiOutlineCheckCircle />} />
			</div>
			<Stack spacing={5}>
				<Stack
					minW={{ base: "auto", xl: "20rem" }}
					spacing={3}
					px={{ base: "1rem", xl: "10%" }}
					alignItems="center"
				>
					<Image
						borderRadius="full"
						boxSize="50%"
						src="images/success.gif"
						alt="success gif"
					/>{" "}
					<Heading>Спасибо за заказ!</Heading>
					<Text colorScheme={"gray"}>
						Заказ принят. В ожидании пиццы рекомендуем посетить свой профиль!
						Там вы можете найти историю ваших заказов.
					</Text>
					<Button
						leftIcon={<CgProfile />}
						colorScheme="orange"
						onClick={handleClick("/profile")}
					>
						Профиль
					</Button>
				</Stack>
			</Stack>
		</>
	);
}

Success.PageLayout = WithSideContentLayout;

export default Success;
