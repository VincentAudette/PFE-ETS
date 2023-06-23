import { NextApiRequest, NextApiResponse } from "next";
import { Role, prisma } from "../../../../../packages/db/index";
import { Webhook } from "svix";

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
  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(JSON.stringify(req.body.data), {
      "svix-id": (req.headers["svix-id"] as string) || "",
      "svix-timestamp": (req.headers["svix-timestamp"] as string) || "",
      "svix-signature": (req.headers["svix-signature"] as string) || "",
    });
    const data = req?.body?.data;

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
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).json({ error: "Invalid webhook signature", msg });
  }
}
