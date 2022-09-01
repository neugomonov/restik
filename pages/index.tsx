import React from "react";
import CallToActionWithVideo from "../components/CallToActionWithVideo";
import WithBackgroundImage from "../components/WithBackgroundImage";
import SplitScreen from "../components/SplitScreen";
import CallToActionWithIllustration from "../components/CallToActionWithIllustration";
import CallToActionWithAnnotation from "../components/CallToActionWithAnnotation";

import { _cart } from "../lib/recoil-atoms";

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
