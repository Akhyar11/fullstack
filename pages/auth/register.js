import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confrmPass, setConfrmPass] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(false);

  const router = useRouter();

  const hendlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
        name,
        confrmPass,
      });
      router.push("/auth/login");
    } catch (e) {
      setMsg(e.response.data.msg);
    }
  };

  return (
    <div className="container p-4 max-w-md mx-auto">
      <form className="w-full" onSubmit={hendlerSubmit}>
        {msg ? (
          <span className="text-sm text-pink-700 mt-5 bg-pink-200 ring ring-pink-700 font-semibold border border-pink-700 px-6 py-3 rounded-md block">
            {msg}
          </span>
        ) : (
          <div></div>
        )}
        <div className="mt-4">
          <input
            type="text"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 shadow"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            required
          />
        </div>
        <div className="mt-4">
          <input
            type="email"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 active:invalid:border-pink-700 active:invalid:ring-pink-700 hover:invalid:border-pink-700 hover:invalid:ring-pink-700 shadow"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="email"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 shadow"
            placeholder="password"
            required
            onChange={(e) => setPass(e.target.value)}
            value={password}
            name="password"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            className="px-6 py-3 outline-none border rounded-full w-full border-slate-400 hover:ring hover:border-sky-500 hover:ring-sky-500 placeholder:text-slate-300 placeholder:text-xl text-xl text-slate-500 placeholder:italic trantition duration-300 shadow"
            placeholder="confirm password"
            required
            onChange={(e) => setConfrmPass(e.target.value)}
            value={confrmPass}
            name="confrmPass"
          />
        </div>

        <div className="mt-4">
          <button className="text-xl shadow font-semibold rounded-full px-6 py-3 border border-sky-300 bg-sky-500 text-white hover:ring hover:border-sky-400 hover:ring-sky-400 hover:bg-sky-600 trantition duration-300">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
