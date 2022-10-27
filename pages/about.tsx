import GridListWithCTA from "../components/GridListWithCTA";
import GridListWithHeading from "../components/GridListWithHeading";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import SplitWithImage from "../components/SplitWithImage";
import { IndexLayout } from "../layouts";

function About() {
	return (
		<>
			<SplitWithImage />
			<GridListWithHeading />
			<GridListWithCTA />
			<SimpleThreeColumns />
		</>
	);
}

About.PageLayout = IndexLayout;

export default About;
