import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { page } = await request.json()

    const analyticsEndpoint = process.env.ANA_ENDPOINT || 'https://your-app.vercel.sh/_vercel/insights'
    
    await fetch(`${analyticsEndpoint}/page`, {
      method: 'POST',
      body: JSON.stringify({ page }),
      headers: { 'Content-Type': 'application/json' }
    }).catch((error) => {
      console.error('Failed to send analytics:', error)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging analytics:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
