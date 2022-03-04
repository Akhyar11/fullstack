import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import { getCookie, removeCookies } from "cookies-next";
import { config } from "dotenv";

export default async function hendler(req, res) {
  if (req.method !== "DELETE") return res.status(400).end();

  config();
  const { password } = req.body;
  const token = getCookie("token", { req, res }).split(",");

  let axist = "";

  jwt.verify(token[0], process.env.SECRET_KEY, (err, decoded) => {
    if (err) throw err;
    axist = decoded;
  });

  console.log(axist);

  if (axist.password !== password)
    return res.status(400).json({ msg: "password salah" });

  try {
    await Users.destroy({
      where: {
        email: axist.email,
      },
    });
    removeCookies("token", { req, res });
    res.status(200).json({ msg: "menghapus akun berhasil" });
  } catch (e) {
    console.log(e);

    res.status(400).json({ msg: "err" });
  }
}
