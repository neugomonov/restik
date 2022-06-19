import React, { ReactNode, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useColorMode, MenuItem } from "@chakra-ui/react";
import { db } from "../firebase";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

export default function NotificationList() {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "notifications"));

	const [notifications, setNotifications] = useState([
		{ name: "Loading...", id: "initial" },
	]);
	useEffect(() => {
		if (!session?.user || !session?.user?.email) return;

		const q = query(
			collection(db, `notifications`),
			where("recipient", "==", session?.user?.email),
			orderBy("timestamp", "desc")
		);

		onSnapshot(q, (snapshot) => {
			setNotifications(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, []);

	const setRead = async (id) => {
		const read = true;
		const docRef = doc(db, "notifications", id);
		const payload = { read };
		await updateDoc(docRef, payload);
	};
	const handleDelete = async (id) => {
		const docRef = doc(db, "notifications", id);
		await deleteDoc(docRef);
	};
	const router = useRouter();
	const notificationList = () => {
		return notifications.map((notification) => (
			<MenuItem
				key={notification.id}
				onClick={async () => {
					await router.push("/profile", "/profile", { locale: "ru" });
					setRead(notification.id);
				}}
			>
				{notification.text}{" "}
			</MenuItem>
		));
	};
	return <>{notificationList()}</>;
}
