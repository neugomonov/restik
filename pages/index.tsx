import CallToActionWithAnnotation from "../components/CallToActionWithAnnotation";
import CallToActionWithIllustration from "../components/CallToActionWithIllustration";
import CallToActionWithVideo from "../components/CallToActionWithVideo";
import MainContentChakraWrapper from "../components/main/MainContentChakraWrapper";
import MainContentMotionWrapper from "../components/motion/MainContentMotionWrapper";
import SplitScreen from "../components/SplitScreen";
import WithBackgroundImage from "../components/WithBackgroundImage";
import { IndexLayout } from "../layouts";

function Home() {
	return (
		<>
			<MainContentMotionWrapper>
				<MainContentChakraWrapper>
					<WithBackgroundImage />
					<CallToActionWithVideo />
					<SplitScreen />
					<CallToActionWithIllustration />
					<CallToActionWithAnnotation />
				</MainContentChakraWrapper>
			</MainContentMotionWrapper>
		</>
	);
}

Home.PageLayout = IndexLayout;

export default Home;
