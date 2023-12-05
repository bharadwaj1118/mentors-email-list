import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    console.log(params.profileId);
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

    if (!params.profileId) {
      return new NextResponse('Companion ID required', { status: 400 });
    }

    const companion = await prismadb.profile.update({
      where: {
        id: params.profileId,
      },
      data: {
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
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
