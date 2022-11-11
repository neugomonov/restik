import { atom } from "recoil";

export interface CartState {
	items: Array<{ name: string; type: string; price: number; quantity: number }>;
	total: number;
}
export interface BlurState {
	blur: boolean;
}

// Cart
export const _cart = atom<CartState>({
	key: "cart",
	default: {
		items: [],
		total: 0,
	},
});
export const _blur = atom<BlurState>({
	key: "blur",
	default: {
		blur: true,
	},
});
