import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * Simple cookie-based login for the example app.
 * In a real app, this would be your actual authentication system.
 */
export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const cookieStore = await cookies()
  cookieStore.set('user_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })

  return NextResponse.json({ ok: true })
}
