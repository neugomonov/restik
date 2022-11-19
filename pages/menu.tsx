import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import MenuBox from "../components/MenuBox";
import MenuContentMotionWrapper from "../components/motion/MenuContentMotionWrapper";
import { WithSideContentLayout } from "../layouts/menu";
function Menu() {
	return (
		<>
			<MenuContentMotionWrapper>
				<MenuContentChakraWrapper>
					<MenuBox />
				</MenuContentChakraWrapper>
			</MenuContentMotionWrapper>
		</>
	);
}

Menu.PageLayout = WithSideContentLayout;

export default Menu;
