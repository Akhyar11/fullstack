import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [msg, setMsg] = useState(false);

  const router = useRouter();
  const hendlerSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/auth/login", {
        email,
        password,
      })
      .then(() => {
        router.push("/dashboard");
      })
      .catch((e) => {
        setMsg(e.response.data.msg);
      });
  };

  return (
    <div className="container p-4 max-w-sm lg:max-w-lg mx-auto">
      <div className="w-[72px] h-[72px] rounded-full bg-slate-300 mx-auto"></div>
      <form onSubmit={hendlerSubmit} className="w-full">
        {msg ? (
          <span className="text-sm text-pink-700 mt-5 bg-pink-200 ring ring-pink-700 font-semibold border border-pink-700 px-6 py-3 rounded-md block">
            {msg}
          </span>
        ) : (
          <div></div>
        )}
        <div className="mt-4">
          <input
            type="email"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 active:invalid:border-pink-700 active:invalid:ring-pink-700 hover:invalid:border-pink-700 hover:invalid:ring-pink-700 shadow"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 shadow"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <button className="text-xl shadow font-semibold rounded-full px-6 py-3 border border-sky-300 bg-sky-500 text-white hover:ring hover:border-sky-400 hover:ring-sky-400 hover:bg-sky-600 trantition duration-300">
            Login
          </button>
        </div>
      </form>
      <div className="w-full mt-16 flex text-xl justify-between justify-end">
        <Link href="#">
          <span>Forget password</span>
        </Link>
        <Link href="/auth/register">
          <span>Remember now</span>
        </Link>
      </div>
    </div>
  );
}
