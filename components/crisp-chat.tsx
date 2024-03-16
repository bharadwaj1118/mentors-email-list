"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ef5f7d52-f511-4e9f-9f90-99d223f4654d");
  }, []);

  return null;
};
