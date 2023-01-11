"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import LoadingDots from "@/components/loading-dots";

export default function Fichadas() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const consulta = async () => {
    setLoading(true);
    let data = await fetch("/api/fichada");
    let json = await data.json();
    await json.sort((a:any,b:any) => a - b)
    setData(json);
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-300">
      {loading ? (
        <p className="text-lg font-semibold">
          Cargando <LoadingDots />
        </p>
      ) : (
        <table className="w-1/2 h-40 overflow-scroll">
            <tr>
                <th>Apellido</th>
                <th>Nobre</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Horas</th>
            </tr>
          {data.map((e: any, i:number) => {
            return (
              <tr key={i}>
                <td>{e.Apellido}</td>
                <td>{e.Nombre}</td>
                <td>{e.Entrada}</td>
                <td>{e.Salida}</td>
                <td>{e.Horas}</td>
              </tr>
            );
          })}
        </table>
      )}
      <button
        onClick={() => {
          consulta();
        }}
      >
        Cargar
      </button>
    </div>
  );
}
