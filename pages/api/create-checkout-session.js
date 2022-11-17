// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { items, email, phone } = req.body;

	const transformedItems = items.map((item) => ({
		quantity: item.quantity,
		price_data: {
			currency: "rub",
			unit_amount: item.price * 100,
			product_data: {
				name: item.name,
				images: [item.image],
			},
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: ["shr_1LC4U2FxzVucXSOXI4V070yv"],
		shipping_address_collection: {
			allowed_countries: ["RU"],
		},
		line_items: transformedItems,
		mode: "payment",
		allow_promotion_codes: true,
		success_url: `${process.env.NEXTAUTH_URL}/success`,
		cancel_url: `${process.env.NEXTAUTH_URL}/menu`,
		metadata: {
			email,
			phone,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});
	res.status(200).json({ id: session.id });
};
