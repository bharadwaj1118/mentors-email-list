import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; // adjust the path according to your project structure
import { formUserSchema } from '@/lib/schemas'; // adjust the path according to your project structure

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = formUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newUser = await prisma.user.create({
    data: { email: body.email, role: body.role },
  });

  return NextResponse.json(newUser, { status: 201 });
}
