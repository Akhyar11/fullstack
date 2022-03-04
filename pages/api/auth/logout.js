import { removeCookies } from "cookies-next";

export default async function hendler(req, res) {
  if (req.method !== "DELETE") return res.status(400).end();

  try {
    removeCookies("token", { req, res, maxAge: 1 });
    res.status(200).json({ msg: "berhasil logout" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "gagal logout" });
  }
}
