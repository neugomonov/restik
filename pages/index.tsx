import CallToActionWithAnnotation from "../components/CallToActionWithAnnotation";
import CallToActionWithIllustration from "../components/CallToActionWithIllustration";
import CallToActionWithVideo from "../components/CallToActionWithVideo";
import SplitScreen from "../components/SplitScreen";
import WithBackgroundImage from "../components/WithBackgroundImage";
import { IndexLayout } from "../layouts";

function Home() {
	return (
		<>
			<WithBackgroundImage />
			<CallToActionWithVideo />
			<SplitScreen />
			<CallToActionWithIllustration />
			<CallToActionWithAnnotation />
		</>
	);
}

Home.PageLayout = IndexLayout;

export default Home;
