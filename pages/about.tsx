import React from "react";
import { _cart } from "../lib/recoil-atoms";
import SplitWithImage from "../components/SplitWithImage";
import SimpleThreeColumns from "../components/SimpleThreeColumns";
import GridListWithHeading from "../components/GridListWithHeading";
import GridListWithCTA from "../components/GridListWithCTA";
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
