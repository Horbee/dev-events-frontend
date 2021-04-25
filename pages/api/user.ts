import axios from "axios";
import cookie from "cookie";
import { AuthResponse, NotAllowed } from "models/response";
import { UserModel } from "models/user";
import { NextApiRequest, NextApiResponse } from "next";

import { API_URL } from "@/config/index";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{} | NotAllowed>
) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    try {
      const { token } = cookie.parse(req.headers.cookie);
      const { data: user } = await axios.get<UserModel>(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
