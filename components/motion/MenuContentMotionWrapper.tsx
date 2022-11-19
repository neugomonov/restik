import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MenuContentMotionWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<motion.div
			exit="hidden"
			initial="appearing"
			animate="visible"
			variants={{
				hidden: {
					y: "-1vh",
					x: ["0vw", "-100vw"],
					scale: 0.9,
					position: "absolute",
					zIndex: -1,
					transition: { type: "spring", bounce: 0.3, duration: 0.8 },
				},
				appearing: { y: window.innerHeight },
				visible: {
					y: 0,
					scale: 1,
					transition: { type: "spring", bounce: 0.3 },
				},
			}}
		>
			{children}
		</motion.div>
	);
}
