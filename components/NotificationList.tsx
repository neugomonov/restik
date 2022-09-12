import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MenuItem } from "@chakra-ui/react";
import { db } from "../firebase";
import { useRouter } from "next/router";
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

export default function NotificationList() {
	const { data: session } = useSession();

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

		onSnapshot(q, (snapshot: any) => {
			setNotifications(
				snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
			);
		});
	}, [session]);
	const setRead = async (id: string) => {
		const read = true;
		const docRef = doc(db, "notifications", id);
		const payload = { read };
		await updateDoc(docRef, payload);
	};
	const router = useRouter();
	const notificationList = () => {
		return notifications.map((notification: any) => (
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
