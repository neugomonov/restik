import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CallToActionWithAnnotation from "../CallToActionWithAnnotation";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import { _cart, CartState } from "../../lib/recoil-atoms";
import StateSaver from "../state-saver";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<CallToActionWithAnnotation />
			</StateSaver>
		</RecoilRoot>
	);
});
it("renders component correctly", () => {
	const { getByTestId } = render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<CallToActionWithAnnotation />
			</StateSaver>
		</RecoilRoot>
	);
	expect(getByTestId("button")).toHaveTextContent("");
});
it("allows me to go to the menu", () => {
	const { getByTestId } = render(
		<RecoilRoot initializeState={({ set }) => {}}>
			<StateSaver>
				<CallToActionWithAnnotation />
			</StateSaver>
		</RecoilRoot>
	);
	userEvent.click(screen.getByTestId("button"));
	expect(getByTestId("button")).toHaveTextContent("");
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<RecoilRoot initializeState={({ set }) => {}}>
				<StateSaver>
					<CallToActionWithAnnotation />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
