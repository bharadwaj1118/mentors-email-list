"use server";

import { db } from "../db";

export async function getAllSessions(id: string) {
  try {
    const sessions = await db.session.findMany({
      where: {
        mentorId: id,
      },
    });
    return sessions;
  } catch (error) {
    throw Error("GET_ALL_SESSIONS_ERROR, " + error);
  }
}

export async function getSessionById(id: string) {
  try {
    const session = await db.session.findUnique({
      where: {
        id,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_ID_ERROR, " + error);
  }
}

export async function getSessionByMentorId(mentorId: string) {
  try {
    const session = await db.session.findMany({
      where: {
        mentorId,
      },
      include: {
        mentor: true,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_MENTOR_ID_ERROR, " + error);
  }
}

export async function getSessionByMenteeId(menteeId: string) {
  try {
    const session = await db.session.findMany({
      where: {
        menteeId,
      },
      include: {
        mentee: true,
      },
    });
    return session;
  } catch (error) {
    throw Error("GET_SEESION_BY_MENTEE_ID_ERROR, " + error);
  }
}

export async function updateSession(session: any) {
  try {
    const { id } = session;
    if (!id) throw new Error("Session id is required");
    const updatedSession = await db.session.update({
      where: {
        id: session.id,
      },
      data: {
        ...session,
      },
    });
    return updatedSession;
  } catch (error) {
    throw Error("UPDATE_SESSION_ERROR, " + error);
  }
}
