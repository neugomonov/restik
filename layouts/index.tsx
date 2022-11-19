import { Flex } from "@chakra-ui/react";

export function IndexLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
				{children}
			</Flex>
		</>
	);
}
