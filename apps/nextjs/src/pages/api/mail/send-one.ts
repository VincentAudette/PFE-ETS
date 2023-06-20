import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import ProjectEmail from "../../../components/ProjectEmail";
import { prisma } from "../../../../../../packages/db/index";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body.projectId);

  try {
    const project = await prisma.project.findUnique({
      where: { id: req.body.projectId },
      include: {
        promoter: {
          include: { user: true },
        },
        organization: true,
        files: true,
        thematics: {
          include: {
            thematic: true,
          },
        },
        teachers: {
          include: {
            teacher: true,
          },
        },
        representatives: {
          include: {
            representative: true,
          },
        },
        departments: true,
        states: true,
        group: {
          include: {
            students: {
              include: {
                department: true,
              },
            },
          },
        },
      },
    });

    const data = await resend.emails.send({
      from: "pfe@resend.dev",
      to: "vincentaudette@audla.ca",
      subject: "Votre PFE est en cours de validation",
      html: "<strong>It works!</strong>",
      react: ProjectEmail({ project }),
    });

    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);

    res.status(400).json(error);
  }
};

export default handler;
