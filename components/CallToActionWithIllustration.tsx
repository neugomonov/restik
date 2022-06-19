import {
	Flex,
	Container,
	Heading,
	Stack,
	Text,
	Button,
	Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CallToActionWithIllustration() {
	const router = useRouter();

	return (
		<Container maxW={"5xl"}>
			<Stack
				textAlign={"center"}
				align={"center"}
				spacing={{ base: 8, md: 10 }}
				pt={{ base: 20, md: 28 }}
			>
				<Heading
					fontWeight={600}
					fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}
				>
					Готовим быстро
					<Text as={"span"} color={"orange.400"}>
						{" "}
						и вкусно
					</Text>
				</Heading>
				<Text colorScheme={"gray"} maxW={"3xl"}>
					Использование современных компьютерных технологий - это, можно
					сказать, наша фишка! Автоматизированная форма заказа есть у операторов
					- она дает возможность максимально быстро и без ошибок оформить заказ.
					Система упрощает также и работу поваров - у них есть планшеты, на
					которые новые заказы приходят в течение нескольких секунд! Логисты
					также работают в автоматизированной форме, для курьеров разработано
					мобильное приложение, а для оформления заказов в зале - касса POS и
					мобильный официант. Также в нашей пиццерии установлена электронная
					система вызова официанта - Вам не нужно махать руками, чтобы на Вас
					обратили внимание.
				</Text>
				<Stack spacing={6} direction={{ base: "column", md: "row" }}>
					<Button
						rounded={"full"}
						px={6}
						colorScheme={"orange"}
						bg={"orange.400"}
						_hover={{ bg: "orange.500" }}
						onClick={async () => {
							await router.push("/news", "/news", {
								locale: "ru",
							});
						}}
					>
						Посмотреть наши новости
					</Button>
					<Button
						rounded={"full"}
						px={6}
						onClick={async () => {
							await router.push("/about", "/about", {
								locale: "ru",
							});
						}}
					>
						Наша кухня
					</Button>
				</Stack>
				<Flex w={"full"} justifyContent={"center"}>
					<Image
						borderRadius="full"
						src="https://cdn.dribbble.com/users/5950507/screenshots/14543756/media/3cf8ea17f7e1a1b04c56e8b82f8b1a28.gif"
					/>
				</Flex>
			</Stack>
		</Container>
	);
}
