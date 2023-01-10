import prisma from "@/lib/prisma";
import { NextApiResponse, NextApiRequest } from "next";

export default async function fichada(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
}



import ADODB from 'node-adodb';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\zkbase\\Access.mdb;')

export default async function handler(req, res) {
  if (req.method === "GET") {
    let reg = []
    try {
      let date = "10-20-2022" //req.body.date
      let users = await connection.query('SELECT userid,Badgenumber,name,lastname FROM USERINFO')
      let atd = await connection.query(`SELECT * FROM CHECKINOUT WHERE CHECKTIME BETWEEN #${date} 00:00:00# AND #${date} 23:59:59#`)
      res.send(atd)
      users.forEach(element => {
        let asis = atd.filter(x => x.USERID === element.userid)
        if (asis.length >= 2) {
          let start = dayjs(asis.find(x => x.CHECKTYPE === "I")?.CHECKTIME)
          let end = dayjs(asis.find(x => x.CHECKTYPE === "O")?.CHECKTIME)
          let hours = dayjs.duration(end.diff(start));
          let diff = hours.format("HH:mm")
          if (true) {
            let inf = {
              Id: element.Badgenumber,
              Nombre: element.name,
              Apellido: element.lastname,
              Entrada: start,//.format("HH:mm:ss"),
              Salida: end,//.format("HH:mm:ss"),
              Horas: diff
            }
            reg.push(inf)
          }
        }
      });
      res.send(reg)
      //[element.CHECKTYPE === "I" ? "Entrada" : "Salida"]: element.CHECKTIME.split(/[T ]+/).pop(),
    } catch (error) {
      console.log(error);
    }
  }
}
