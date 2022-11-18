import { motion } from "framer-motion";
import MenuContentChakraWrapper from "../components/main/MenuContentChakraWrapper";
import MenuBox from "../components/MenuBox";
import { WithSideContentLayout } from "../layouts/menu";
function Menu() {
	return (
		<>
			<motion.div
				exit={{ y: -100, scale: 0.9 }}
				initial={{ y: 1000, scale: 1.1 }}
				animate={{
					y: 0,
					scale: 1,
					transition: { type: "spring", bounce: 0.3, duration: 0.4 },
				}}
				key={"2"}
			>
				<MenuContentChakraWrapper>
					<MenuBox />
				</MenuContentChakraWrapper>
			</motion.div>
		</>
	);
}

Menu.PageLayout = WithSideContentLayout;

export default Menu;
