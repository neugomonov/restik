import { Box, Spinner } from "@chakra-ui/react";
import { forwardRef } from "react";

export const PizzaSpinner = () => (
	<Spinner
		size="xl"
		position="absolute"
		left="50%"
		top="50%"
		ml="calc(0px - var(--spinner-size) / 2)"
		mt="calc(0px - var(--spinner-size))"
	/>
);

export const PizzaContainer = forwardRef<HTMLDivElement>(
	// @ts-expect-error - Property 'children' does not exist on type '{}'.ts(2339)
	// eslint-disable-next-line react/prop-types
	({ children }, ref) => (
		<Box
			ref={ref}
			className="pizza"
			m="auto"
			mt={["-20px", "-60px", "-120px"]}
			mb={["-40px", "-140px", "-200px"]}
			w={[280, 480, 640]}
			h={[280, 320, 240]}
			position="relative"
		>
			{children}
		</Box>
	)
);
PizzaContainer.displayName = "PizzaContainer";

const Loader = () => {
	return (
		// @ts-expect-error - Property 'children' does not exist on type '{}'.ts(2339)
		<PizzaContainer>
			<PizzaSpinner />
		</PizzaContainer>
	);
};

export default Loader;
