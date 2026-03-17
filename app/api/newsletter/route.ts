import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    const listId = process.env.MAILCHIMP_LIST_ID
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX

    // If Mailchimp is configured, subscribe via API
    if (mailchimpApiKey && listId && serverPrefix) {
      const response = await fetch(
        `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${mailchimpApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            tags: ['website-signup', 'entomology-blog'],
          }),
        }
      )

      if (!response.ok && response.status !== 400) {
        const error = await response.json()
        // 400 with "Member Exists" is OK
        if (error.title !== 'Member Exists') {
          throw new Error(error.detail || 'Mailchimp error')
        }
      }
    } else {
      // Without Mailchimp: log the email (in production you'd save to a DB)
      console.log(`Newsletter signup: ${email}`)
    }

    return NextResponse.json({
      success: true,
      message: "You're subscribed! Check your inbox for a confirmation email.",
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
