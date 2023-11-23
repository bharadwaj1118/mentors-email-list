import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.profileId) {
      return new NextResponse('Profile ID required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    const profile = await prismadb.profile.update({
      where: {
        id: params.profileId,
        userId: user.id,
      },
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
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
