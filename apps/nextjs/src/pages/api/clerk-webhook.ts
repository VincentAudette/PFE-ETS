import { NextApiRequest, NextApiResponse } from "next";
import { Role, prisma } from "../../../../../packages/db/index";
import { IncomingHttpHeaders } from "http";
import {
  Webhook,
  WebhookRequiredHeaders,
  WebhookUnbrandedRequiredHeaders,
} from "svix";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

let headers: IncomingHttpHeaders;

const secret = process.env.CLERK_SIGNING_SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const payload = (await buffer(req)).toString();
  headers = req.headers;
  const requiredHeaders:
    | WebhookRequiredHeaders
    | WebhookUnbrandedRequiredHeaders = {
    "svix-id": headers.hasOwnProperty("svix-id")
      ? (headers["svix-id"] as string)
      : "",
    "svix-timestamp": headers.hasOwnProperty("svix-timestamp")
      ? (headers["svix-timestamp"] as string)
      : "",
    "svix-signature": headers.hasOwnProperty("svix-signature")
      ? (headers["svix-signature"] as string)
      : "",
    "webhook-id": headers.hasOwnProperty("webhook-id")
      ? (headers["webhook-id"] as string)
      : "",
    "webhook-timestamp": headers.hasOwnProperty("webhook-timestamp")
      ? (headers["webhook-timestamp"] as string)
      : "",
    "webhook-signature": headers.hasOwnProperty("webhook-signature")
      ? (headers["webhook-signature"] as string)
      : "",
    ...headers,
  };

  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(payload, requiredHeaders);
    const data = req.body.data;

    await prisma.user
      .create({
        data: {
          clerkId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email_addresses[0].email_address,
          role: Role.UNREGISTERED,
        },
      })
      .then(() => {
        console.log("User added");
        res.status(200);
      })
      .catch((error: any) => {
        console.error(error);
        res.status(500);
      })
      .finally(() => {
        res.end();
      });
  } catch (err) {
    res.status(400).json({});
  }

  // Do something with the message...

  res.json({});
}
