import GridListWithCTA from "../components/GridListWithCTA";
import GridListWithHeading from "../components/GridListWithHeading";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import SplitWithImage from "../components/SplitWithImage";
import { IndexLayout } from "../layouts";

function About() {
	return (
		<>
			<MenuContentMotionWrapper>
					<SplitWithImage />
					<GridListWithHeading />
					<GridListWithCTA />
					<SimpleThreeColumns />
			</MenuContentMotionWrapper>
		</>
	);
}

About.PageLayout = IndexLayout;

export default About;
