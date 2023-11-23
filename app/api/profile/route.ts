import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const {
      username,
      currentrole,
      email,
      bio,
      timezone,
      languages,
      tools,
      expertise,
      industries,
      twitterUrl,
      linkedinUrl,
    } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !username ||
      !currentrole ||
      !email ||
      !bio ||
      !timezone ||
      !languages ||
      !tools ||
      !expertise ||
      !industries
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const profile = await prismadb.profile.create({
      data: {
        userId: user.id,
        username,
        currentrole,
        email,
        bio,
        timezone,
        languages,
        tools,
        expertise,
        industries,
        twitterUrl,
        linkedinUrl,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log('[COMPANION_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
