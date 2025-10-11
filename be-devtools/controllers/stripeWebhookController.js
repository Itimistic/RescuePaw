const endpointSecret = "whsec_bdca05f378746cd9a68fd385c3463baa197ab5c787a4adfe82eeb7d0812652ca"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Donation = require("../models/donation");

exports.handleStripeWebhook = async (req, res) => {
    let event = req.body;
    console.log(event)
    //Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`Webhook signature verification failed.`, err.message);
            return res.sendStatus(400);
        }
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const paymentData = event.data.object;
            console.log("Checkout paymentData completed:", paymentData);

            const sessionId = paymentData.id;

            try {
                const result = await Donation.update(
                    { status: paymentData.status },
                    { where: { session_id: sessionId } }
                );

                if(result === 0){
                    console.log(`No donation found with sessionId: ${sessionId}`);
                } else {
                    console.log(`Donation updated for sessionId: ${sessionId}`);
                }
            } catch (err) {
                console.log("Error updating donation:", err);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
}