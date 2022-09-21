import MenuBox from "../components/MenuBox";
import { WithSideContentLayout } from "../layouts/menu";

function Menu() {
	return (
		<>
			<MenuBox />
		</>
	);
}

Menu.PageLayout = WithSideContentLayout;

export default Menu;
