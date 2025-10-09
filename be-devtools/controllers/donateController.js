const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Donation = require("../models/donation");

exports.createDonation = async (req, res) => {
    const { donation_type, amount, donor_name, email } = req.body;
    try {
        // สร้างรหัสออเดอร์เฉพาะ (ใช้ระบุใน webhook ภายหลัง)
        const orderId = uuidv4();

        // 🧾 สร้าง session สำหรับ Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                price_data: {
                    currency: "thb",
                    product_data: {
                    name:
                        donation_type === "per-month"
                        ? "Monthly Donation"
                        : "One-Time Donation",
                    },
                    unit_amount: amount * 100, // แปลงบาท → สตางค์
                },
                quantity: 1,
                },
            ],
            mode: donation_type === "per-month" ? "subscription" : "payment",
            success_url: `${process.env.API_CLIENT_BASE_URL}/donate/success?order_id=${orderId}`,
            cancel_url: `${process.env.API_CLIENT_BASE_URL}/donate/cancel?order_id=${orderId}`,
            customer_email: email, // Stripe จะใช้แสดงในหน้า checkout ด้วย
            metadata: {
                order_id: orderId, // เก็บไว้ให้ webhook ใช้อ้างอิงได้
            },
        });
        // console.log("session", session);
        // 🧠 บันทึกข้อมูล donation ไว้ในฐานข้อมูล
        const donation = await Donation.create({
            donation_type,
            amount,
            donor_name,
            email,
            session_id: session.id,
            status: session.status,
            order_id: orderId,
        });

        // ส่ง URL หน้า checkout กลับไปให้ frontend
        res.status(200).json({
            message: "Checkout session created successfully.",
            checkout_url: session.url,
            // id: session.id,
            // donation,
        });
    } catch (error) {
        console.error("Error creating donation session:", error.message);
        res.status(400).json({ error: "Failed to create donation session" });
    }
};

exports.getDonation = async (req, res) => {
    const orderId = req.params.id;
    // console.log("orderId: ", orderId)
    try {
        const result = await Donation.findOne({
            where: {
                order_id: orderId
            }
        });
        if (!result) {
            throw {
                errorMessage: "Order not found",
            };
        }
        console.log("result: ", result.dataValues)
        res.json(result.dataValues);
    } catch (error) {
            console.log("error", error);
            res.status(404).json({ error: error.errorMessage || "System error" });
    }
}