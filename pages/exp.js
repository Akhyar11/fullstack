import { useEffect } from "react";
import { useRouter } from "next/router";

export default function exp() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full text-xl text-slate-400 font-semibold">
      <span>404</span>
      <span className="text-3xl"> | </span>
      <span>expired</span>
    </div>
  );
}
