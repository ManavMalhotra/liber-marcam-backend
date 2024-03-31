import { Request, Response } from "express";
import mailchimp from "@mailchimp/mailchimp_transactional";
import jwt from "jsonwebtoken";

// audien id 758468bf6e

if (!process.env.MAILCHIMP_API_KEY) {
  throw new Error(
    "Please define the MAILCHIMP_API_KEY environment variable inside .env"
  );
}
const mailchimpClient = new mailchimp.Mailchimp(
  "40dd5c4b30b29bd58cd272eb3c15da18-us18"
);

// https://<dc>.api.mailchimp.com/3.0

const link = "https://us18.api.mailchimp.com/3.0/lists/758468bf6e";

export function sendMail(req: Request, res: Response) {}

const generateMagicToken = (email: string) => {
};

export const sendMagicLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Generate a unique token (e.g., JWT)
    const token = generateMagicToken(email);

    // Compose the email
    const campaignId = "your-campaign-id"; // Replace with your actual campaign ID
    const content = {
      html: `Click the link to log in: <a href="https://yourapp.com/magic-login?token=${token}">Magic Login Link</a>`,
    };

    // Send the email
    await mailchimpClient.campaigns.sendContent(campaignId, content);

    res.status(200).json({ message: "Magic link sent successfully" });
  } catch (error) {
    console.error("Error sending magic link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
