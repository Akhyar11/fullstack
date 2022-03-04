import Users from "../../../models/userModel";

const hendler = async (req, res) => {
  if (req.method !== "GET") return res.status(400).end();
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(400).json("gagal");
  }
};

export default hendler;
