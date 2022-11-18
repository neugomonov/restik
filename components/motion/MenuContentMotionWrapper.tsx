import { motion } from "framer-motion";
import { ReactNode } from "react";
export default function MenuContentMotionWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<motion.div
			exit={{ y: -100, scale: 0.9 }}
			initial={{ y: 1000, scale: 1.1 }}
			animate={{
				y: 0,
				scale: 1,
				transition: { type: "spring", bounce: 0.3, duration: 4 },
			}}
			key={Math.random()}
		>
			<div key={Math.random()}>{children}</div>
		</motion.div>
	);
}
