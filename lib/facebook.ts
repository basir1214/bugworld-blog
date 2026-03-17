/**
 * Facebook Page Auto-Posting
 * Posts new articles to your Facebook page via the Graph API
 *
 * Setup: See README section "Facebook Auto-Posting Setup"
 */

interface FacebookPostOptions {
  title: string
  excerpt: string
  slug: string
  category: string
  coverImage: string
  tags: string[]
}

export async function postToFacebook(options: FacebookPostOptions): Promise<{ success: boolean; postId?: string; error?: string }> {
  const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  const pageId = process.env.FACEBOOK_PAGE_ID

  if (!pageAccessToken || !pageId) {
    return { success: false, error: 'Facebook credentials not configured' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app'
  const articleUrl = `${siteUrl}/blog/${options.slug}`

  // Build an engaging Facebook post
  const message = buildFacebookMessage(options)

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}/feed`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          link: articleUrl,
          access_token: pageAccessToken,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok || data.error) {
      const errMsg = data.error?.message || 'Unknown Facebook API error'
      console.error('Facebook post failed:', errMsg)
      return { success: false, error: errMsg }
    }

    console.log(`✅ Posted to Facebook! Post ID: ${data.id}`)
    return { success: true, postId: data.id }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: msg }
  }
}

function buildFacebookMessage(options: FacebookPostOptions): string {
  const { title, excerpt, category, tags } = options

  // Category-specific openers to keep posts fresh
  const openers: Record<string, string[]> = {
    Beetles: ['🪲 Did you know?', '🪲 Beetle fact of the day!', '🪲 Fascinating beetle science:'],
    Butterflies: ['🦋 Just published!', '🦋 Nature is incredible —', '🦋 Butterfly science:'],
    Ants: ['🐜 Mind-blowing ant facts!', '🐜 The ant world is wild —', '🐜 New article:'],
    'Bees & Wasps': ['🐝 Bee update!', '🐝 Pollinators matter —', '🐝 New on the blog:'],
    Ecology: ['🌿 Ecosystem spotlight!', '🌿 Insects shape our world —', '🌿 New article:'],
    'Pest Control': ['🏠 Pest control tip!', '🏠 Smart pest management —', '🏠 New guide:'],
    'Insect Behavior': ['🧬 Insect behavior spotlight!', '🧬 The science of bugs —', '🧬 New research:'],
    Evolution: ['⏳ Evolution is wild —', '⏳ 400 million years of insects —', '⏳ Evolutionary biology:'],
    'Fascinating Facts': ['✨ This will blow your mind!', '✨ Insect record alert!', '✨ Did you know?'],
    Conservation: ['🌍 Let\'s protect insects!', '🌍 Conservation matters —', '🌍 Important read:'],
  }

  const categoryOpeners = openers[category] || ['🐛 New article!']
  const opener = categoryOpeners[Math.floor(Math.random() * categoryOpeners.length)]

  // Build hashtags from tags + category
  const hashtags = [
    '#Entomology',
    '#Insects',
    `#${category.replace(/[^a-zA-Z]/g, '')}`,
    ...tags.slice(0, 3).map(t => `#${t.replace(/[^a-zA-Z]/g, '')}`),
    '#BugWorld',
    '#NatureScience',
  ]
    .filter((v, i, a) => a.indexOf(v) === i) // dedupe
    .slice(0, 7)
    .join(' ')

  return `${opener}

📰 ${title}

${excerpt}

👇 Read the full article at the link below!

${hashtags}`
}
