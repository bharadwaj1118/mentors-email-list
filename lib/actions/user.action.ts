'use server';

import { db } from "../db";


export async function getUserByclerkId(userId: string) {
  try {

    const user = await db.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(user: any) {
  try {
    
    const {id} = user;

    if (!id) throw new Error('User id is required');

    const updatedUser = await db.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user
      }
    })
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

