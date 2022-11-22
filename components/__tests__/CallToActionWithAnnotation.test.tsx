import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import CallToActionWithAnnotation from "../CallToActionWithAnnotation";
import StateSaver from "../StateSaver";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot>
			<StateSaver>
				<CallToActionWithAnnotation />
			</StateSaver>
		</RecoilRoot>
	);
});
it("renders component correctly", () => {
	const { getByTestId } = render(
		<RecoilRoot>
			<StateSaver>
				<CallToActionWithAnnotation />
			</StateSaver>
		</RecoilRoot>
	);
	expect(getByTestId("button")).toHaveTextContent("");
});
it("allows me to go to the menu", () => {
	const { getByTestId } = render(
		<RecoilRoot>
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
			<RecoilRoot>
				<StateSaver>
					<CallToActionWithAnnotation />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
