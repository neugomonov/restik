import { ArrowBackIcon } from "@chakra-ui/icons";
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
import { BiErrorAlt } from "react-icons/bi";
import { WithSideContentLayout } from "../layouts/menu";
import info from "../lib/info";

function FourOFour() {
	const router = useRouter();

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
						404{" "}
					</Tag>
				)}
				<IconButton aria-label="Error" icon={<BiErrorAlt />} />
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
						src="images/404.webp"
						alt="404"
					/>{" "}
					<Heading>Страница не найдена 🤔</Heading>
					<Text colorScheme={"gray"}>
						Такой страницы не существует. Что-то здесь не так. Лучше вернуться
						назад.
					</Text>
					<Button
						leftIcon={<ArrowBackIcon />}
						colorScheme="orange"
						onClick={async () => {
							await router.back();
						}}
					>
						Назад
					</Button>
				</Stack>
			</Stack>
		</>
	);
}

FourOFour.PageLayout = WithSideContentLayout;

export default FourOFour;
