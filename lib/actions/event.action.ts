"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "../db";
import { getSelf } from "./user.action";


export async function addEvent(event: any){
    try {
        console.log(event);

        const user = await getSelf();
        const newEvent = await db.event.create({
        data: {
            ...event,
            userId: user && user.id
        }
        })
        return newEvent;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteEvent(event: any){
    const {id} = event;
    console.log("The event id is", id)
    console.log(id);
    try {
        const deletedEvent = await db.event.delete({
        where: {
            id
        }
        })
        return deletedEvent;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

