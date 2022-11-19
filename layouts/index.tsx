import { Flex } from "@chakra-ui/react";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";

export function IndexLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MenuContentMotionWrapper>
				<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
					{children}

					<LargeWithNewsletter />
				</Flex>
			</MenuContentMotionWrapper>
			<Cart />
		</>
	);
}
