import { Request, Response } from "express";
import crypto from "crypto";
import jsonwebtoken from 'jsonwebtoken';
export default class LoginController {
  async validate(req: Request, res: Response) {
    const { username, password } = req.body;
    const digestedPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");
    const token = jsonwebtoken.sign({username},"A$N0tH1nG")
    return res.json({ auth: true, token: token });
  }
}
