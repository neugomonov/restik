import { useDisclosure, useToast } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { _cart } from "../lib/recoil-atoms";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

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
	let phone = "";
	let payment = "";
	let address = "";
	const handleNew = async () => {
		if (session) {
			let disco = cart.total - cart.total * 0.3;
			let currentTime = new Date().getTime() / 1000;
			let timeOfDiscoEnd = 1661776053;
			let total = 0;
			currentTime < timeOfDiscoEnd ? (total = disco) : (total = cart.total);
			const products = stringifiedProducts;
			session?.user?.phone
				? (phone = session?.user?.phone)
				: (phone = prompt("Введите ваш телефон 🤙"));
			session?.user?.address
				? (address = session?.user?.address)
				: (address = prompt("Введите адрес доставки 🏠"));
			session?.user?.payment
				? (payment = session?.user?.payment)
				: (payment = prompt("Наличные или Онлайн? 💸"));
			const email = session?.user?.email;
			const timestamp = serverTimestamp();
			const status = "Принят";
			const collectionRef = collection(db, "orders");
			const payload = {
				products,
				phone,
				address,
				payment,
				total,
				email,
				timestamp,
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
			if (payment.toLowerCase() == "онлайн") {
				const stripe = await stripePromise;
				const checkoutSession = await axios.post(
					"api/create-checkout-session",
					{
						items: cart.items,
						email: email,
						phone: phone,
					}
				);
				const result = await stripe.redirectToCheckout({
					sessionId: checkoutSession.data.id,
				});
				if (result.error) {
					alert(result.error.message);
				}
			}
		} else {
			await router.push("/menu", "/menu", {
				locale: "ru",
			});
		}
		// await onClose();
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
