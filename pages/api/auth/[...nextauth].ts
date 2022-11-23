import { getApp, getApps, initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	query,
	runTransaction,
	updateDoc,
	where,
} from "firebase/firestore";
import "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "../../../vendor_mods/@next-auth/firebase-adapter/dist/index.js";

declare module "next-auth" {
	interface User {
		role: string;
		address: string;
		phone: string;
		payment: string;
	}

	interface Session {
		user: User;
	}
}

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default NextAuth({
	adapter: FirebaseAdapter({
		db,
		collection,
		query,
		getDocs,
		where,
		limit,
		doc,
		getDoc,
		addDoc,
		updateDoc,
		deleteDoc,
		runTransaction,
	}),

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token, user }) {
			console.log(
				"--Session CALLED--",
				session,
				"--user--",
				user,
				"--token--",
				token
			);
			session.user.role = user.role;
			session.user.address = user.address;
			session.user.phone = user.phone;
			session.user.payment = user.payment;
			return session;
		},
	},
});
