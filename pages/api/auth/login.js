import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { setCookies } from "cookies-next";

const hendler = async (req, res) => {
  if (req.method !== "POST") return res.status(400).end();
  const { email, password } = req.body;

  config();
  const exp = 60 * 2;
  const user = await Users.findAll({
    where: {
      email,
    },
  });

  console.log(user);
  if (user[0] === undefined)
    return res.status(400).json({ msg: "email tidak ditemukan" });

  try {
    const passTrue = await bcrypt.compare(password, user[0].password);
    if (!passTrue) return res.status(400).json({ msg: "password salah" });
    const token = jwt.sign({ email, password }, process.env.SECRET_KEY, {
      expiresIn: exp,
    });
    setCookies("token", token, {
      req,
      res,
      maxAge: exp,
      httpOnly: true,
    });
    res.status(200).json({ msg: "berhasil login" });
  } catch (e) {
    console.log(e);
  }
};

export default hendler;
