"use server"

import { db } from "../db";

export async function getAllSessions(id: string){
    try {
        const sessions = await db.session.findMany({
            where: {
                mentorId: id
            }
        })
        return sessions;
    } catch (error) {
        throw error;
    }
}