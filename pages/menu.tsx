import React from "react";
import MenuBox from "../components/MenuBox";
import { WithSideContentLayout } from "../layouts/menu";
import { _cart } from "../lib/recoil-atoms";

function Menu() {
	return (
		<>
			<MenuBox />
		</>
	);
}

Menu.PageLayout = WithSideContentLayout;

export default Menu;
