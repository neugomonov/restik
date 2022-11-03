import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "next-auth/react";
import LoginSidebar from "../LoginSidebar";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
	render(
		<SessionProvider>
			<LoginSidebar />
		</SessionProvider>
	);
});
it("renders button correctly", () => {
	const { getByTestId } = render(
		<SessionProvider>
			<LoginSidebar />
		</SessionProvider>
	);
	expect(getByTestId("button")).toHaveTextContent("common:signIn");
});
it("allows me to log in", () => {
	const { getByTestId } = render(
		<SessionProvider>
			<LoginSidebar />
		</SessionProvider>
	);
	userEvent.click(screen.getByTestId("button"));
	expect(getByTestId("button")).toHaveTextContent("common:signIn");
});
it("matches snapshot", () => {
	const tree = renderer
		.create(
			<SessionProvider>
				<LoginSidebar />
			</SessionProvider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
