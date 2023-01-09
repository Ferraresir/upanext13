import Image from "next/image";
import LoginForm from "@/components/Loginform";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Image src="/upalogo.png" alt="Logo upa16" width={180} height={80} />
          <h3 className="text-lg font-semibold pt-4">Iniciar Sesion</h3>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
