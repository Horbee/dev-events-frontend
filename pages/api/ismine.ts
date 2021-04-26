import axios from "axios";
import cookie from "cookie";
import { NotAllowed } from "models/response";
import { NextApiRequest, NextApiResponse } from "next";

import { API_URL } from "@/config/index";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{} | NotAllowed>
) => {
  if (req.method === "POST") {
    const { ids } = req.body;

    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    try {
      const { token } = cookie.parse(req.headers.cookie);
      const { data } = await axios.post<boolean>(
        `${API_URL}/events/ismine`,
        {
          ids
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      res.status(200).json(data);
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
