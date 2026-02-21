const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = "YOUR_ACCOUNT_SID";
const authToken = "YOUR_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

app.post("/send-sms", async (req, res) => {

    const { phone, message } = req.body;

    try {
        await client.messages.create({
            body: message,
            from: "YOUR_TWILIO_NUMBER",
            to: phone
        });

        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ success: false });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
