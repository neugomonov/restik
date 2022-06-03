import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "next-auth/react";
import LoginHeader from "../LoginHeader";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<SessionProvider>
			<LoginHeader />
		</SessionProvider>
	);
});
it("renders button correctly", () => {
	const { getByTestId } = render(
		<SessionProvider>
			<LoginHeader />
		</SessionProvider>
	);
	expect(getByTestId("button")).toHaveTextContent("Войти");
});
it("allows me to log in", () => {
	const { getByTestId } = render(
		<SessionProvider>
			<LoginHeader />
		</SessionProvider>
	);
	userEvent.click(screen.getByTestId("button"));
	expect(getByTestId("button")).toHaveTextContent("Войти");
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<SessionProvider>
				<LoginHeader />
			</SessionProvider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
