import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const inspirations = await prisma.inspiration.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(inspirations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inspirations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, category, description } = await request.json();

    if (!title || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inspiration = await prisma.inspiration.create({
      data: { title, category, description }
    });

    return NextResponse.json(inspiration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create inspiration' }, { status: 500 });
  }
}
