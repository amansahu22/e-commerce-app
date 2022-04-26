import Stripe from "stripe";

//fake card data for stripe testing
//4242424242424242 expiry_date02/42  cvv424
//card holder name and email can be our own
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1KsjNgSBu7reY1QQzCIdLE0c",
          },
          {
            shipping_rate: "shr_1KsjOSSBu7reY1QQlagX2JD2",
          },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref; //this gives us referance to that url
          //for actual image we do this
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/pznb8o5t/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            //for initial quantity
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
