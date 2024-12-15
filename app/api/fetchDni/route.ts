import { NextResponse } from "next/server";
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const dniApiKey=process.env.NEXT_PUBLIC_DNI_API_KEY

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const dni = searchParams.get("dni");

  if (!dni) {
    return NextResponse.json(
      { error: "DNI no proporcionado o inválido" },
      { status: 400 }
    );
  }

  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          `Bearer ${dniApiKey}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
