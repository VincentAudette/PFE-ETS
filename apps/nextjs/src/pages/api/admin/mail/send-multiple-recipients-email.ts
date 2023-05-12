import { ResponseError } from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface MultipleRecipientsEmail {
  to: string[];
  from: string;
  subject: string;
  text: string;
  html: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  sgMail
    .sendMultiple(req.body)
    .then(() => {
      console.log("Email sent");
      return res.status(200).json("EMAIL SENT");
    })
    .catch((error: ResponseError) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Cannot send mail at this time. Try again later." });
    });
}
