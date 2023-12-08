'use server';
import Profile from '@/database/profile.model';
import { connectToDatabase } from '@/lib/mongoose';

export async function getProfiles() {
  try {
    connectToDatabase();
    const profiles = await Profile.find();

    return { profiles };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
