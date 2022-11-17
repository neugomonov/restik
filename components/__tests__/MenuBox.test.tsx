import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import StateSaver from "../../components/state-saver";
import MenuBox from "../MenuBox";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot>
			<StateSaver>
				<MenuBox />
			</StateSaver>
		</RecoilRoot>
	);
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<RecoilRoot>
				<StateSaver>
					<MenuBox />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
