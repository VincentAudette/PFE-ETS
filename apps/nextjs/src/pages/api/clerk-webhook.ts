import { NextApiRequest, NextApiResponse } from "next";
import { Role, prisma } from "../../../../../packages/db/index";
import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.CLERK_SIGNING_SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(secret);

  let msg: any;
  try {
    msg = wh.verify(payload, headers as any);
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json({ error: "Invalid webhook signature", msg });
  }

  console.log("Message: ", msg);

  const data = msg?.data;

  if (!data) {
    res.status(400).json({ error: "No data in body", body: req.body, msg });
    return;
  }

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
      res.status(200).json({ status: "User added" }); // Added json response
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).json({ error: "There was an error" }); // Added json response
    });
}
