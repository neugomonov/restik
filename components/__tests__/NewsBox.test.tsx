import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { RecoilRoot } from "recoil";
import StateSaver from "../StateSaver";
import NewsBox from "../NewsBox";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<RecoilRoot>
			<StateSaver>
				<NewsBox />
			</StateSaver>
		</RecoilRoot>
	);
});
it("renders component correctly", () => {
	const { getByTestId } = render(
		<RecoilRoot>
			<StateSaver>
				<NewsBox />
			</StateSaver>
		</RecoilRoot>
	);
	expect(getByTestId("button")).toHaveTextContent("");
});
it("allows me to go to news", () => {
	const { getByTestId } = render(
		<RecoilRoot>
			<StateSaver>
				<NewsBox />
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
					<NewsBox />
				</StateSaver>
			</RecoilRoot>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
