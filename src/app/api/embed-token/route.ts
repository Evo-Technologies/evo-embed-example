import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const EVO_HOST = process.env.NEXT_PUBLIC_EVO_HOST || 'http://localhost:3000'
const API_KEY = process.env.RESELLER_API_KEY

/**
 * Token proxy endpoint.
 *
 * Called by embed.js with { email, agent_id? }.
 * Adds the API key (server-side only) and forwards to the Evo platform.
 * Returns the full response including token and available pages.
 */
export async function POST(request: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'RESELLER_API_KEY not configured. Copy .env.example to .env and add your key.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, agent_id } = body

    // embed.js sends { email }, but we also accept reading from the session
    // cookie as a fallback so the proxy knows which user is logged in.
    const cookieStore = await cookies()
    const userEmail = email || cookieStore.get('user_email')?.value

    if (!userEmail) {
      return NextResponse.json(
        { error: 'No user email provided' },
        { status: 400 }
      )
    }

    const response = await fetch(`${EVO_HOST}/api/auth/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
        user_email: userEmail,
        ...(agent_id && { agent_id }),
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: error.error || 'Failed to get embed token' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Embed token proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch embed token' },
      { status: 500 }
    )
  }
}
