import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const sectores = await prisma.sectors.findMany();
    res.status(200).json(sectores);
  } else if (req.method === "POST") {
    const { user, password, nombre, apellido, sectorId, role } = req.body as {
      user: string;
      password: string;
      nombre: string;
      apellido: string;
      sectorId: number;
      role: string;
    };
    const exists = await prisma.user.findUnique({
      where: {
        user,
      },
    });
    if (exists) {
      res.status(400).send("El usuario ya existe");
    } else {
      const usuario = await prisma.user.create({
        data: {
          user,
          password: await hash(password, 10),
          nombre,
          apellido,
          sectorId,
          role,
        },
      });
      res.status(200).json(usuario);
    }
  }
}
