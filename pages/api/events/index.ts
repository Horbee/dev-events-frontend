// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { EventData } from "models/event";
import { NotAllowed } from "models/response";

import { events } from "./data.json";

import type { NextApiRequest, NextApiResponse } from "next";

export default (
  req: NextApiRequest,
  res: NextApiResponse<EventData[] | NotAllowed>
) => {
  if (req.method === "GET") {
    res.status(200).json(events);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
