import {
	Box,
	Flex,
	Text,
	useBreakpointValue,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";

// Configure FirebaseUI.
const uiConfig = {
	// Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: "/",
	// We will display GitHub as auth providers.
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	const { colorMode } = useColorMode();

	return (
		<>
			<Flex display="flex" justifyContent={"center"} alignItems={"center"}>
				<Box
					transition=".3s ease"
					borderWidth="1px"
					borderRadius="lg"
					padding="1rem"
					margin=".5rem"
					// marginBottom="4rem"
					width={{ base: "100%", xl: "5xl" }}
					mt={{ base: "6rem", md: ".5rem" }}
					boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
					backgroundColor={
						colorMode === "dark"
							? "rgba(6, 8, 13, 0.75)"
							: "rgba(255, 255, 255, 0.75)"
					}
					position="relative"
					backdropFilter="auto"
					backdropBlur="20px"
				>
					<div
						style={{
							maxWidth: "auto",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text
							fontWeight={700}
							lineHeight={1.2}
							fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
						>
							Вход в Пиццерию
						</Text>
						<p>Пожалуйста, войдите или зарегистрируйтесь:</p>
						<StyledFirebaseAuth
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
				</Box>
			</Flex>
		</>
	);
}

export default SignInScreen;
