import { NextApiRequest, NextApiResponse } from "next";
import { Role, prisma } from "../../../../../packages/db/index"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = req.body.data;

  await prisma.user.create({ data: { clerkId: data.id, firstName: data.first_name, lastName: data.last_name, email: data.email_addresses[0].email_address, role: Role.UNREGISTERED}})
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
}
