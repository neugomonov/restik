import { useDisclosure, useToast } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { _cart } from "../lib/recoil-atoms";

export default function stringifyCartPositions() {
	const [cart, setCart] = useRecoilState(_cart);
	const { data: session } = useSession();
	const toast = useToast();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const {
		isOpen: isMenuOpen,
		onOpen: onMenuOpen,
		onClose: onMenuClose,
	} = useDisclosure();

	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		let element = cart.items[index];
		// ...use `element`...
		// let csvString = Object.keys(cart.items[index])
		// 	.map((field) => cart.items[index][field])
		// 	.join(", ");
		let csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");

		stringified = stringified.concat(", ", csvString);
		// return stringified;
	}
	// console.log("stringifiedn't");
	// console.log(stringified.substring(2));
	let stringifiedProducts = stringified.substring(2);
	const handleNew = async () => {
		const products = stringifiedProducts;
		const total = cart.total;
		const phone = session?.user?.phone;
		const payment = session?.user?.payment;
		const address = session?.user?.address;
		const email = session?.user?.email;
		const status = "Принят";
		const collectionRef = collection(db, "orders");
		const payload = {
			products,
			phone,
			address,
			payment,
			total,
			email,
			status,
		};
		const docRef = await addDoc(collectionRef, payload);
		setCart({ items: [], total: 0 });
		toast({
			title: "Заказ принят",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
		await router.push("/menu", "/menu", {
			locale: "ru",
		});
		onClose();
	};
	return handleNew;

	// console.log("stringified");
	// console.log(
	// 	cart.items.map((item) => (item.quantity, item.name, item.type)).join(", ")
	// );
	// // cart.items[1]
	// console.log(
	// 	cart.items[2].quantity
	// 		.toString()
	// 		.concat("x ", cart.items[2].name, " (", cart.items[2].type, ") ")
	// );
	// console.log(cart.items.map(({ name }) => name));
}
