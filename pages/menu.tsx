import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import MenuBox from "../components/MenuBox";
import { WithSideContentLayout } from "../layouts/menu";

function Menu() {
	return (
		<>
			<MenuContentChakraWrapper>
				<MenuBox />
			</MenuContentChakraWrapper>
		</>
	);
}

Menu.PageLayout = WithSideContentLayout;

export default Menu;
