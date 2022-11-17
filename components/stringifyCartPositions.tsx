import { useToast } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Session } from "next-auth/core/types";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { _cart } from "../lib/recoil-atoms";

const stripePromise = loadStripe(process.env.stripe_public_key!);

export default function stringifyCartPositions() {
	const [cart, setCart] = useRecoilState(_cart);
	const toast = useToast();
	const router = useRouter();
	const { t } = useTranslation("menu");

	let stringified = "";
	for (let index = 0; index < cart.items.length; ++index) {
		const csvString = cart.items[index].quantity
			.toString()
			.concat("x ", cart.items[index].name, " (", cart.items[index].type, ")");

		stringified = stringified.concat(", ", csvString);
	}
	const stringifiedProducts = stringified.substring(2);
	let phone = "";
	let payment = "";
	let address = "";
	interface CustomSession extends Session {
		user: { phone: string; address: string; payment: string; email: string };
	}
	const handleNew = async (session: any) => {
		const disco = cart.total - cart.total * 0.1;
		const currentTime = new Date().getTime() / 1000;
		const timeOfDiscoEnd = 1661776053;
		let total = 0;
		currentTime < timeOfDiscoEnd && payment.toLowerCase() !== "online"
			? (total = disco)
			: (total = cart.total);
		const products = stringifiedProducts;
		if (
			session?.user?.phone &&
			session?.user?.address &&
			session?.user?.payment
		) {
			phone = session?.user?.phone;
			address = session?.user?.address;
			payment = session?.user?.payment;
			const email = session?.user?.email;
			const timestamp = serverTimestamp();
			const status = t("accepted");
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
			await addDoc(collectionRef, payload);
			setCart({ items: [], total: 0 });
			toast({
				title: t("success"),
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			await addDoc(collection(db, `notifications`), {
				recipient: email,
				text: t("yourOrder") + status + "!",
				timestamp: timestamp,
				read: false,
			});
			if (payment.toLowerCase() == "online") {
				const stripe = await stripePromise;
				const checkoutSession = await axios.post(
					"api/create-checkout-session",
					{
						items: cart.items,
						email: email,
						phone: phone,
					}
				);
				const result = await stripe!.redirectToCheckout({
					sessionId: checkoutSession.data.id,
				});
				if (result.error) {
					alert(result.error.message);
				}
			}
		} else {
			await router.push("/menu", "/menu");
			toast({
				title: t("splendid"),
				status: "info",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	return handleNew;
}
