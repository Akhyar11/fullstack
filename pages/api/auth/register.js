import Users from "../../../models/userModel";
import bcrypt from "bcryptjs";

const hendler = async (req, res) => {
  if (req.method !== "POST") return res.status(400).end();
  const { email, name, password, confrmPass } = req.body;

  const slat = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, slat);
  console.log(hash);
  try {
    const exist = await Users.findAll({
      where: {
        email,
      },
    });
    if (exist[0] !== undefined)
      return res.status(400).json({ msg: "email sudah digunakan" });
    if (confrmPass !== password)
      return res.status(400).json({ msg: "confrim password tidak cocok" });
    await Users.create({
      name,
      email,
      password: hash,
    });
    res.status(200).json({ msg: "register berhasil" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "register gagal" });
  }
};

export default hendler;
