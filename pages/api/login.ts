import axios from "axios";
import cookie from "cookie";
import { AuthResponse, NotAllowed } from "models/response";
import { NextApiRequest, NextApiResponse } from "next";

import { API_URL } from "@/config/index";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{} | NotAllowed>
) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    try {
      const { data } = await axios.post<AuthResponse>(`${API_URL}/auth/local`, {
        identifier,
        password
      });

      // Set HTTPOnly Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/"
        })
      );

      res.status(200).json(data.user);
    } catch (error) {
      res
        .status(error.response.data.statusCode)
        .json({ message: error.response.data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
