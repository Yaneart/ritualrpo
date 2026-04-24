import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const store = await cookies();
  if (!store.get("admin_token")?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Только изображения (jpg, png, webp)" },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, filename), buffer);

  return NextResponse.json({ path: `/uploads/${filename}` });
}
