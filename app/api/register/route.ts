import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);

    await sql`
      INSERT INTO Users (email, password)
      VALUES (${email}, ${hashedPassword})
    `;
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }

  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}
