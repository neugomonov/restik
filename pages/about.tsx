import GridListWithCTA from "../components/GridListWithCTA";
import GridListWithHeading from "../components/GridListWithHeading";
import MainContentChakraWrapper from "../components/main/MainContentChakraWrapper";
import MainContentMotionWrapper from "../components/motion/MainContentMotionWrapper";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import SplitWithImage from "../components/SplitWithImage";
import { IndexLayout } from "../layouts";

function About() {
	return (
		<>
			<MainContentMotionWrapper>
				<MainContentChakraWrapper>
					<SplitWithImage />
					<GridListWithHeading />
					<GridListWithCTA />
					<SimpleThreeColumns />
				</MainContentChakraWrapper>
			</MainContentMotionWrapper>
		</>
	);
}

About.PageLayout = IndexLayout;

export default About;
