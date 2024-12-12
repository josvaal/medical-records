// app/api/upload/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const buffer = await req.arrayBuffer();

  const filename = `file_${Date.now()}.png`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);

  fs.writeFileSync(filePath, Buffer.from(buffer));

  return NextResponse.json({ filePath: `/uploads/${filename}` });
}

