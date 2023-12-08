import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      role,
      bio,
      timezone,
      languages,
      expertise,
      toolkit,
      twitterUrl,
      linkedinUrl,
    } = await req.json();

    const profile = await prismadb.profile.create({
      data: {
        username,

        firstname,
        lastname,
        email,
        role,
        bio,
        linkedinUrl,
        twitterUrl,
        timezone,
        languages,
        expertise,
        toolkit,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log('[PROFILE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
