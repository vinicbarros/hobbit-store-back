import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { unauthorizedError } from "@/errors";
import { database } from "@/config";

export async function authenticateFingerprint(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const fingerprint = authHeader.split(" ")[1];
  if (!fingerprint) return generateUnauthorizedResponse(res);

  try {
    const hasFingerprint = await database
      .collection("fingerprint")
      .findOne({ fingerprint });

    if (!hasFingerprint) return generateUnauthorizedResponse(res);

    req.fingerprint = fingerprint;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & FingerprintAuth;

type FingerprintAuth = {
  fingerprint: string;
};
