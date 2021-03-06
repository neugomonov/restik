import {
	Box,
	chakra,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	Input,
	IconButton,
	useColorModeValue,
	useColorMode,
	Avatar,
	Heading,
	HStack,
	Image,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";

import info from "../lib/info";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const Logo = (props: any) => {
	const { t, lang } = useTranslation("menu");

	return (
		<Stack direction="row" alignItems="center" spacing={3}>
			<Avatar
				name={info.name}
				src="/images/chief.jpg"
				size="lg"
				draggable={false}
			/>
			<Heading as="h3" size="lg">
				{info.name ?? t("restaurantName")}
			</Heading>
		</Stack>
	);
};

const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={"500"} fontSize={"lg"} mb={2}>
			{children}
		</Text>
	);
};

export default function LargeWithNewsletter() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { t, lang } = useTranslation("common");
	const router = useRouter();

	return (
		<Box
			transition=".3s ease"
			borderWidth="1px"
			borderRadius="lg"
			padding="1rem"
			margin=".5rem"
			boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
			backgroundColor={
				colorMode === "dark"
					? "rgba(6, 8, 13, 0.75)"
					: "rgba(255, 255, 255, 0.75)"
			}
			position="relative"
			backdropFilter="auto"
			backdropBlur="20px"
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid
					templateColumns={{ sm: "1fr 1fr", lg: "2fr 1fr 1fr 2fr" }}
					spacing={8}
				>
					<Stack spacing={6}>
						<Box>
							<Logo color={useColorModeValue("gray.700", "white")} />
						</Box>
						<Text fontSize={"sm"}>
							???????????? ????????????????, 603001, ????????????????????????????, 1
						</Text>
						<Text fontSize={"sm"}>
							?? 2022 {info.name ?? t("restaurantName")}. ?????? ?????????? ????????????????
						</Text>

						<Stack direction={"row"} spacing={6}>
							<SocialButton label={"Twitter"} href={"https://twitter.com"}>
								<FaTwitter />
							</SocialButton>
							<SocialButton label={"YouTube"} href={"https://youtube.com"}>
								<FaYoutube />
							</SocialButton>
							<SocialButton label={"Instagram"} href={"https://instagram.com"}>
								<FaInstagram />
							</SocialButton>
						</Stack>
						<Stack spacing={3}>
							<Text>{t("powered")}</Text>
							<HStack direction="row" isInline={true} spacing={5}>
								<Link isExternal href="https://nextjs.org/">
									<Image
										src="/images/reactjs.svg"
										alt="Nextjs"
										draggable={false}
										loading="lazy"
										decoding="async"
										width="7rem"
									/>
								</Link>
								<Link isExternal href="https://nextjs.org/">
									<Image
										src="/images/Nextjs.svg"
										alt="Nextjs"
										draggable={false}
										loading="lazy"
										decoding="async"
										width="5rem"
										filter="auto"
										dropShadow="0px 0px 6px white"
									/>
								</Link>
							</HStack>
						</Stack>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>????????????????</ListHeader>
						<Link
							onClick={async () => {
								await router.push("/about", "/about", {
									locale: "ru",
								});
							}}
						>
							???????? ??????????
						</Link>
						<Link
							onClick={async () => {
								await router.push("/news", "/news", {
									locale: "ru",
								});
							}}
						>
							??????????????
						</Link>
						<Link
							onClick={async () => {
								await router.push("/chat", "/chat", {
									locale: "ru",
								});
							}}
						>
							??????
						</Link>
						<Link
							onClick={async () => {
								await router.push("/promo", "/promo", {
									locale: "ru",
								});
							}}
						>
							??????????
						</Link>
						<Link
							onClick={async () => {
								await router.push("/menu", "/menu", {
									locale: "ru",
								});
							}}
						>
							????????
						</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>??????????????????</ListHeader>
						<Link href={"https://en.wikipedia.org/wiki/Terms_of_service"}>
							?????????????? ????????????????????????
						</Link>
						<Link
							href={"https://en.wikipedia.org/wiki/Wikipedia:Legal_disclaimer"}
						>
							?????????????????????? ????????????????????
						</Link>
						<Link href={"https://foundation.wikimedia.org/wiki/Privacy_policy"}>
							???????????????? ????????????????????????????????????
						</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>?????????????????? ?? ???????????????? ???????????????????????? ??????????????</ListHeader>
						<Stack direction={"row"}>
							<Input
								placeholder={"???????? ??????????"}
								bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
								border={0}
								_focus={{
									bg: "whiteAlpha.300",
								}}
							/>
							<IconButton
								bg={useColorModeValue("orange.400", "yellow.500")}
								color={useColorModeValue("white", "gray.800")}
								_hover={{
									bg: "orange.600",
								}}
								aria-label="Subscribe"
								icon={<BiMailSend />}
							/>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Container>
		</Box>
	);
}
