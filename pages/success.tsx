import {
	Button,
	Heading,
	IconButton,
	Image,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
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
