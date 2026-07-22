import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import twilio from "twilio";
import schedule from "node-schedule";
import cors from "cors"; // ✅ Import cors

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend (127.0.0.1:5500 or localhost:5500)
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/schedule-task", (req, res) => {
  const { taskName, taskId, phoneNumber, reminderType, taskDate, taskTime } = req.body;

  const scheduleTime = new Date(`${taskDate}T${taskTime}:00`);

  schedule.scheduleJob(scheduleTime, async () => {
    try {
      if (reminderType === "sms") {
        await client.messages.create({
          body: `Reminder: ${taskName}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber
        });
        console.log(`✅ SMS sent to ${phoneNumber} for task ${taskName}`);
      } else if (reminderType === "call") {
        await client.calls.create({
          twiml: `<Response><Say voice="alice">Reminder: ${taskName}</Say></Response>`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber
        });
        console.log(`📞 Call made to ${phoneNumber} for task ${taskName}`);
      }
    } catch (err) {
      console.error("Error sending reminder:", err);
    }
  });

  res.json({ success: true, msg: "Task scheduled successfully on backend!" });
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
