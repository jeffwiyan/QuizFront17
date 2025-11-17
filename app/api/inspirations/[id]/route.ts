import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inspiration = await prisma.inspiration.findUnique({
      where: { id: params.id }
    });

    if (!inspiration) {
      return NextResponse.json({ error: 'Inspiration not found' }, { status: 404 });
    }

    return NextResponse.json(inspiration);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inspiration' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, category, description } = await request.json();

    if (!title || !category || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inspiration = await prisma.inspiration.update({
      where: { id: params.id },
      data: { title, category, description }
    });

    return NextResponse.json(inspiration);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inspiration' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inspiration.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Inspiration deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inspiration' }, { status: 500 });
  }
}
