import { getCookie, checkCookies } from "cookies-next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const middelware = async (req) => {
  const res = NextResponse.next();
  if (
    req.page.name !== "/api/auth/register" &&
    req.page.name !== "/api/auth/login"
  ) {
    const cek = checkCookies("token", { req, res });

    console.log(cek);
    if (!cek) return NextResponse.rewrite("/api/galat");
    const cookie = getCookie("token", {
      req,
      res,
    });

    const token = cookie.split(",");
    if (token[0] === "") return NextResponse.rewrite("/api/galat");

    jwt.verify(token[0], process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log({ msg: err });
      }
      console.log(decoded);
    });
  }
};

export default middelware;
