"use server";

import { db } from "../db";

interface ISupport {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export async function createSupport(data: ISupport) {
  console.log(data);
  try {
    await db.support.create({
      data: {
        ...data,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    throw Error("CREATE_SUPPORT_ERROR, " + error);
  }
}
