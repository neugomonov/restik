import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import SidebarWithHeader from "../../components/SidebarWithHeader";

import VideoBox from "../../components/VideoBox";
import NewsBox from "../../components/NewsBox";
import Cart from "../../components/Cart";
import LargeWithNewsletter from "../../components/Footer";

import Head from "next/head";
import { useRouter } from "next/router";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import BottomBar from "../../components/BottomBar";
import { Image } from "@chakra-ui/react";

export default function Chat() {
	const router = useRouter();
	const { id } = router.query;
	const { data: session } = useSession();
	const [chat] = useDocumentData(doc(db, "chats", id));
	const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
	const [messages] = useCollectionData(q);
	const bottomOfChat = useRef();

	const getMessages = () =>
		messages?.map((msg) => {
			const sender = msg.sender === session?.user?.email;
			return (
				<Flex
					key={Math.random()}
					alignSelf={sender ? "flex-end" : "flex-start"}
					bg={sender ? "orange.100" : "green.100"}
					color="black"
					w="fit-content"
					minWidth="100px"
					borderRadius="lg"
					p={3}
					m={1}
				>
					<Text>{msg.text}</Text>
				</Flex>
			);
		});

	return (
		<>
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				<Flex
					flexDirection={{ base: "column", xl: "row" }}
					mr={{ base: "1rem", xl: "0" }}
				>
					<Box
						transition=".3s ease"
						borderWidth="1px"
						borderRadius="lg"
						padding="1rem"
						margin=".5rem"
						width={{ base: "100%", xl: "5xl" }}
						mt={{ base: "6rem", md: ".5rem" }}
						boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
						position="relative"
						backdropFilter="auto"
						backdropBlur="20px"
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						></div>
						<Stack spacing={5}>
							<Stack
								minW={{ base: "auto", xl: "20rem" }}
								spacing={3}
								px={{ base: "1rem", xl: "10%" }}
								direction={"row"}
							>
								<Stack
									direction={{ base: "column-reverse", xl: "row" }}
									spacing={3}
								>
									<Box
										borderWidth="1px"
										borderRadius="lg"
										padding="1rem"
										width="100%"
										height="90vh"
										minW={{ base: "auto", xl: "50%" }}
									>
										<Flex
											direction="column"
											sx={{ scrollbarWidth: "none" }}
											flex={1}
										>
											<Flex h="85vh">
												<Head>
													<title>???????????????? ??? ?????? ????</title>
												</Head>

												<Flex flex={1} direction="column">
													<Flex
														flex={1}
														direction="column"
														pt={4}
														mx={5}
														maxH="85vh"
														overflowY="auto"
														css={{
															"&::-webkit-scrollbar": {
																width: "4px",
															},
															"&::-webkit-scrollbar-track": {
																width: "6px",
															},
															"&::-webkit-scrollbar-thumb": {
																background: "rgba(6, 8, 13, 0.25)",
																borderRadius: "24px",
															},
														}}
													>
														{getMessages()}
													</Flex>
													<BottomBar id={id} user={session?.user} />
												</Flex>
											</Flex>
										</Flex>
										<Stack spacing={3}>
											<Flex height="65vh"></Flex>
											<Stack direction={"row"}></Stack>
										</Stack>
									</Box>
									<Stack
										direction="column"
										pl={{ base: "none", xl: "10%" }}
										spacing={5}
									>
										<Heading size="lg">
											?????????????????? ?????????????? ?? ?????? ?? ??????????????????, ?? ???? ??????????????????????
											??????????????!
										</Heading>
										<Image
											src="/images/chat.gif"
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
						</Stack>
					</Box>
					<Flex
						flexShrink={10}
						flexDirection="column"
						alignItems={"center"}
						width={{ base: "100%", xl: "xl" }}
						margin=".5rem"
					>
						<VideoBox />
						<NewsBox />
					</Flex>
				</Flex>
				<LargeWithNewsletter />
			</Flex>
			<SidebarWithHeader children />

			<Cart />
		</>
	);
}
