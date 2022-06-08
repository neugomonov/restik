import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsBox from "../NewsBox";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import { _cart, CartState } from "../../lib/recoil-atoms";
import StateSaver from "../../components/state-saver";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<NewsBox />
			</StateSaver>
		</RecoilRoot>
	);
});
it("renders component correctly", () => {
	const { getByTestId } = render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<NewsBox />
			</StateSaver>
		</RecoilRoot>
	);
	expect(getByTestId("button")).toHaveTextContent("Новости");
});
it("allows me to go to news", () => {
	const { getByTestId } = render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<NewsBox />
			</StateSaver>
		</RecoilRoot>
	);
	userEvent.click(screen.getByTestId("button"));
	expect(getByTestId("button")).toHaveTextContent("Новости");
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<RecoilRoot initializeState={({ set }) => {}}>
				<StateSaver>
					<NewsBox />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
