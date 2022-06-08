import { render, screen, cleanup } from "@testing-library/react";
import MenuBox from "../MenuBox";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import { _cart, CartState } from "../../lib/recoil-atoms";
import StateSaver from "../../components/state-saver";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<MenuBox />
			</StateSaver>
		</RecoilRoot>
	);
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<RecoilRoot initializeState={({ set }) => {}}>
				<StateSaver>
					<MenuBox />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
