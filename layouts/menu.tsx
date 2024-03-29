import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import MainContentMotionWrapper from "../components/motion/MainContentMotionWrapper";
import NewsBox from "../components/NewsBox";
import PromoBox from "../components/PromoBox";
import VideoBox from "../components/VideoBox";

export function WithSideContentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const renderSideContent = useCallback(() => {
		return Math.random() < 0.5 ? <PromoBox /> : <NewsBox />;
	}, [router]);
	return (
		<>
			<MainContentMotionWrapper>
				<Flex flexDirection="column" ml={{ base: "0", md: "60" }}>
					<Flex
						flexDirection={{ base: "column", xl: "row" }}
						mr={{ base: "1rem", xl: "0" }}
					>
						{children}
						<Flex
							flexShrink={10}
							flexDirection="column"
							alignItems={"center"}
							width={{ base: "100%", xl: "xl" }}
							margin=".5rem"
						>
							<VideoBox />
							{renderSideContent()}
						</Flex>
					</Flex>
				</Flex>
			</MainContentMotionWrapper>
		</>
	);
}
