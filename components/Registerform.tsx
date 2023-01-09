"use client";

import { useState, useEffect } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Form() {
  const [loading, setLoading] = useState(true);
  const [sectores, setSectores] = useState([]);
  const router = useRouter();

  const sectors = async () => {
    const data = await fetch("/api/sectores");
    const json = await data.json();
    return json;
  };

  useEffect(() => {
    setLoading(true);
    const res: any = sectors();
    setSectores(res);
    setLoading(false);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: e.currentTarget.nombre.value,
            apellido: e.currentTarget.apellido.value,
            sectorId: e.currentTarget.password.value,
            rol: e.currentTarget.rol.value,
            user: nombre + apellido,
            password: e.currentTarget.password.value,
          }),
        }).then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            toast.success("Cuenta Creada");
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } else {
            toast.error(await res.text());
          }
        });
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="nombre"
          className="block text-xs text-gray-600 uppercase"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="apellido"
          className="block text-xs text-gray-600 uppercase"
        >
          Apellido
        </label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="sector"
            className="block text-xs text-gray-600 uppercase"
          >
            Sector
          </label>
          <select
            id="sector"
            name="sector"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            {loading
              ? console.log("chori")
              : console.log("ready")
                }
          </select>
        </div>
        <div className="w-1/2 ml-2">
          <label
            htmlFor="rol"
            className="block text-xs text-gray-600 uppercase"
          >
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            <option>Usuario</option>
            <option>Admin</option>
          </select>
        </div>
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? <LoadingDots color="#808080" /> : <p>Registrar</p>}
      </button>
    </form>
  );
}
