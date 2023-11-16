import { User } from '@prisma/client';

export default async function saveUser(values: User) {
  'use server';
  try {
    console.log('saveUser');
  } catch (err) {
    console.log(err);
  }
}
