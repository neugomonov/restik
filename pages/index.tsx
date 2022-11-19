import CallToActionWithAnnotation from "../components/CallToActionWithAnnotation";
import CallToActionWithIllustration from "../components/CallToActionWithIllustration";
import CallToActionWithVideo from "../components/CallToActionWithVideo";
import MainContentChakraWrapper from "../components/main/MainContentChakraWrapper";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";
import SplitScreen from "../components/SplitScreen";
import WithBackgroundImage from "../components/WithBackgroundImage";
import { IndexLayout } from "../layouts";

function Home() {
	return (
		<>
			<MenuContentMotionWrapper>
				<MainContentChakraWrapper>
					<WithBackgroundImage />
					<CallToActionWithVideo />
					<SplitScreen />
					<CallToActionWithIllustration />
					<CallToActionWithAnnotation />
				</MainContentChakraWrapper>
			</MenuContentMotionWrapper>
		</>
	);
}

Home.PageLayout = IndexLayout;

export default Home;
