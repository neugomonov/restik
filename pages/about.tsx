import GridListWithCTA from "../components/GridListWithCTA";
import GridListWithHeading from "../components/GridListWithHeading";
import MainContentChakraWrapper from "../components/main/MainContentChakraWrapper";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import SplitWithImage from "../components/SplitWithImage";
import { IndexLayout } from "../layouts";

function About() {
	return (
		<>
			<MenuContentMotionWrapper>
				<MainContentChakraWrapper>
					<SplitWithImage />
					<GridListWithHeading />
					<GridListWithCTA />
					<SimpleThreeColumns />
				</MainContentChakraWrapper>
			</MenuContentMotionWrapper>
		</>
	);
}

About.PageLayout = IndexLayout;

export default About;
