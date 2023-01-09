import prisma from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function sectores(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sectores = await prisma.sectors.findMany();

  res.status(200).json(sectores);
}
