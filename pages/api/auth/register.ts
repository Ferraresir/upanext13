import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, password } = req.body as {
    user: string;
    password: string;
  };
  const exists = await prisma.user.findUnique({
    where: {
      user,
    },
  });
  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const usuario = await prisma.user.create({
      data: {
        user,
        password: await hash(password, 10),
      },
    });
    res.status(200).json(usuario);
  }
}
