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
    await json.sort((a: any, b: any) => a.apellido - b.apellido);
    setData(json);
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      {loading ? (
        <p className="text-lg font-semibold">
          Cargando <LoadingDots />
        </p>
      ) : (
        <div className="w-1/2 h-40 overflow-scroll">
          <table className="w-full text-center table-auto border border-collapse border-spacing-2">
            <thead className="sticky top-0">
              <tr>
                <th className="border">Apellido</th>
                <th className="border">Nobre</th>
                <th className="border">Entrada</th>
                <th className="border">Salida</th>
                <th className="border">Horas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e: any, i: number) => {
                return (
                  <tr key={i}>
                    <td className="border">{e.Apellido}</td>
                    <td className="border">{e.Nombre}</td>
                    <td className="border">{e.Entrada}</td>
                    <td className="border">{e.Salida}</td>
                    <td className="border">{e.Horas}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
