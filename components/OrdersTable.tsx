import { EditIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { addDoc, collection } from "@firebase/firestore";
import {
	doc,
	DocumentData,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function OrdersTable() {
	const { data: session } = useSession();

	const [orders, setOrders] = useState([{ name: "Loading...", id: "initial" }]);
	const [ordersAdmin, setOrdersAdmin] = useState([
		{ name: "Loading...", id: "initial" },
	]);
	useEffect(() => {
		if (!session?.user || !session?.user?.email) return;
		const queryOrders = query(
			collection(db, "orders"),
			where("email", "==", session?.user?.email),
			orderBy("timestamp", "desc")
		);
		onSnapshot(queryOrders, (snapshot) => {
			setOrders(
				snapshot.docs.map((doc: DocumentData) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		});

		const queryAdmin = query(
			collection(db, "orders"),
			orderBy("timestamp", "desc")
		);
		onSnapshot(queryAdmin, (snapshot) => {
			setOrdersAdmin(
				snapshot.docs.map((doc: DocumentData) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		});
	}, [session]);

	const { t } = useTranslation("common");
	const handleNew = async () => {
		const products = prompt("Введите что хотите заказать 🍕");
		if (products != null && products != "") {
			const phone = prompt("Введите ваш телефон 🤙");
			const address = prompt("Введите адрес доставки 🏠");
			const payment = prompt("Наличные или Онлайн? 💸");
			const total = prompt("Введите сумму оплаты 💵");
			const email = prompt("Введите ваш email 📧");
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
		}
	};
	const handleEditStatus = async (id: string) => {
		const status = prompt(
			"Готовится/in cooking/Доставляется/in delivery/Выполнен/completed? 🤔"
		);
		if (
			status == "Готовится" ||
			status == "in cooking" ||
			status == "Доставляется" ||
			status == "in delivery" ||
			status == "Выполнен" ||
			status == "completed"
		) {
			const docRef = doc(db, "orders", id);
			const docSnap = await getDoc(docRef);
			const payload = { status };
			updateDoc(docRef, payload);
			await addDoc(collection(db, `notifications`), {
				recipient: docSnap.data()!.email,
				text: t("yourOrder") + status + "!",
				timestamp: serverTimestamp(),
				read: false,
			});
		}
	};

	return (
		<>
			{
				// @ts-expect-error - Property 'role' does not exist on type '{ name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; }'.ts(2339)
				session?.user?.role == "Админ" && (
					<Button m={5} p={4} onClick={handleNew}>
						Новый заказ 🍕
					</Button>
				)
			}
			<TableContainer>
				<Table variant="striped" colorScheme="gray">
					<TableCaption>{t("OrdersTable1")}</TableCaption>
					<Thead>
						<Tr>
							<Th>{t("OrdersTable2")}</Th>
							<Th>{t("OrdersTable3")}</Th>
							<Th>{t("OrdersTable4")}</Th>
							<Th>{t("OrdersTable5")}</Th>
							<Th>{t("OrdersTable6")}</Th>
							<Th>{t("OrdersTable7")}</Th>
							<Th>{t("OrdersTable8")}</Th>
						</Tr>
					</Thead>
					<Tbody>
						{
							// @ts-expect-error - Property 'role' does not exist on type '{ name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; }'.ts(2339)
							session?.user?.role == "Админ"
								? ordersAdmin.map((order: Record<string, string>) => (
										<Tr key={order.id}>
											<Td>
												{order.status}
												<IconButton
													my="-2"
													aria-label="Edit"
													size="sm"
													icon={<EditIcon />}
													onClick={() => handleEditStatus(order.id)}
												/>
											</Td>
											<Td>{order.products}</Td>
											<Td>{order.phone}</Td>
											<Td>{order.address}</Td>
											<Td>{order.payment}</Td>
											<Td>{order.total}</Td>
											<Td>{order.email}</Td>
										</Tr>
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ))
								: orders.map((order: Record<string, string>) => (
										<Tr key={order.id}>
											<Td>{order.status}</Td>
											<Td>{order.products}</Td>
											<Td>{order.phone}</Td>
											<Td>{order.address}</Td>
											<Td>{order.payment}</Td>
											<Td>{order.total}</Td>
											<Td>{order.email}</Td>
										</Tr>
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  ))
						}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>{t("OrdersTable2")}</Th>
							<Th>{t("OrdersTable3")}</Th>
							<Th>{t("OrdersTable4")}</Th>
							<Th>{t("OrdersTable5")}</Th>
							<Th>{t("OrdersTable6")}</Th>
							<Th>{t("OrdersTable7")}</Th>
							<Th>{t("OrdersTable8")}</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
}
