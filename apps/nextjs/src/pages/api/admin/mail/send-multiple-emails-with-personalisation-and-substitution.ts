import { ResponseError } from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface MailWithPersonalisationAndSubstitution {
  from?: string; // the sender and reply to
  subject?: string; // subject of email
  text: string; // plain text version of email -- to add a variable, use {{variable}}
  html: string; // html version of email -- to add a variable, use {{variable}}
  personalizations: Personalization[]; // array of personalizations
}

interface Personalization {
  to: string; //recipient of email (primary send to)
  cc?: string; //recipient of email (carbon copy)
  bcc?: string; //recipient of email (blind carbon copy)
  from?: string; // the sender and reply to
  subject?: string; // subject of email
  headers?: string; // headers to include in email
  substitutions?: any; // Object of the template's dynamic variables and their substitution values. Eg: { "name": "John Doe" }
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

//THIS IS WHAT THE REQUEST BODY SHOULD LOOK LIKE
//
//   const msg: MailWithPersonalisationAndSubstitution = {
//   from: "sender1@example.org",
//   subject: "Ahoy!",
//   text: "Ahoy {{name}}!",
//   html: "<p>Ahoy {{name}}!</p>",
//   personalizations: [
//     {
//       to: "recipient1@example.org",
//       substitutions: {
//         name: "Jon",
//       },
//     },
//     {
//       to: "recipient2@example.org",
//       substitutions: {
//         name: "Jane",
//       },
//     },
//     {
//       to: "recipient3@example.org",
//       substitutions: {
//         name: "Jack",
//       },
//     },
//   ],
// };
