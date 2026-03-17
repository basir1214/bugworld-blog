#!/usr/bin/env tsx
/**
 * Article Generation Script
 * Run with: npm run generate-article
 *
 * Generates a new AI-powered entomology article and saves it to content/articles/
 */

import fs from 'fs'
import path from 'path'

// Load env from .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim()
    }
  })
}

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

const TOPICS = [
  { category: 'Beetles', topic: 'The incredible diversity of beetle species and their ecological roles' },
  { category: 'Butterflies', topic: 'The science of butterfly metamorphosis and migration patterns' },
  { category: 'Ants', topic: 'How ant colonies function as superorganisms with complex social structures' },
  { category: 'Bees & Wasps', topic: 'The critical role of bees in pollination and global food security' },
  { category: 'Ecology', topic: 'Insects as ecosystem engineers: decomposition, nutrient cycling, and soil health' },
  { category: 'Pest Control', topic: 'Integrated pest management: biological control methods that work' },
  { category: 'Insect Behavior', topic: 'Chemical communication in insects: pheromones and their remarkable precision' },
  { category: 'Evolution', topic: "Insects' 400-million-year evolutionary success story" },
  { category: 'Fascinating Facts', topic: 'Record-breaking insects: the biggest, fastest, strongest species on Earth' },
  { category: 'Conservation', topic: 'The global insect decline crisis and what we can do about it' },
]

const COVER_IMAGES: Record<string, string> = {
  Beetles: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop',
  Butterflies: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=1200&h=630&fit=crop',
  Ants: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=630&fit=crop',
  'Bees & Wasps': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=630&fit=crop',
  Ecology: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop',
  'Pest Control': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=630&fit=crop',
  'Insect Behavior': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop',
  Evolution: 'https://images.unsplash.com/photo-1532634896-26909d0d4b9c?w=1200&h=630&fit=crop',
  'Fascinating Facts': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop',
  Conservation: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&h=630&fit=crop',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

async function callOpenRouter(prompt: string, maxTokens = 2000): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set in .env.local')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app',
      'X-Title': 'BugWorld Blog',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3-haiku',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter error ${response.status}: ${error}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function main() {
  const args = process.argv.slice(2)
  const topicIndex = args[0] ? parseInt(args[0]) : undefined
  const customTopic = args[1]
  const customCategory = args[2]

  let topic: string
  let category: string

  if (customTopic && customCategory) {
    topic = customTopic
    category = customCategory
  } else if (topicIndex !== undefined && TOPICS[topicIndex]) {
    topic = TOPICS[topicIndex].topic
    category = TOPICS[topicIndex].category
  } else {
    // Random topic
    const rand = TOPICS[Math.floor(Math.random() * TOPICS.length)]
    topic = rand.topic
    category = rand.category
  }

  console.log(`\n🐛 BugWorld Article Generator`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📝 Topic: ${topic}`)
  console.log(`🏷️  Category: ${category}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)

  // Step 1: Generate article content
  console.log('⏳ Generating article content...')
  const contentPrompt = `You are an expert entomologist and science writer. Write a high-quality, SEO-optimized blog article for an entomology website.

Topic: ${topic}
Category: ${category}

Requirements:
- Length: 900-1100 words
- Use proper markdown formatting with ## and ### headings (at least 4 H2 sections)
- Include fascinating scientific facts with specific data/statistics
- Write in an engaging, authoritative but accessible tone
- Include 2-3 interesting examples or case studies
- Add a practical takeaway or conclusion section
- Naturally incorporate relevant keywords for SEO

IMPORTANT: Return ONLY the markdown content of the article body. Do NOT include title or frontmatter. Start directly with the introduction paragraph.`

  const content = await callOpenRouter(contentPrompt, 2000)
  console.log(`✅ Content generated (${content.split(' ').length} words approx)`)

  // Step 2: Generate metadata
  console.log('⏳ Generating SEO metadata...')
  const metaPrompt = `Based on this entomology article about "${topic}", generate SEO metadata.

Article preview:
${content.slice(0, 500)}

Return as valid JSON (no markdown, just JSON):
{
  "title": "SEO-optimized title (60-70 chars)",
  "metaDescription": "Compelling meta description (150-160 chars)",
  "excerpt": "2-3 sentence article summary",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`

  const metaRaw = await callOpenRouter(metaPrompt, 400)
  let meta = {
    title: topic,
    metaDescription: `Discover ${topic} in this expert entomology guide.`,
    excerpt: `Explore ${topic} with scientific insights.`,
    tags: [category.toLowerCase(), 'entomology', 'insects'],
  }

  try {
    const jsonMatch = metaRaw.match(/\{[\s\S]*\}/)
    if (jsonMatch) meta = JSON.parse(jsonMatch[0])
  } catch {
    console.log('⚠️  Using fallback metadata')
  }
  console.log(`✅ Metadata: "${meta.title}"`)

  // Step 3: Build the markdown file
  const slug = `${slugify(meta.title)}-${Date.now()}`
  const frontmatter = `---
title: "${meta.title.replace(/"/g, '\\"')}"
excerpt: "${meta.excerpt.replace(/"/g, '\\"')}"
metaTitle: "${meta.title.replace(/"/g, '\\"')}"
metaDescription: "${meta.metaDescription.replace(/"/g, '\\"')}"
category: "${category}"
tags: ${JSON.stringify(meta.tags)}
publishedAt: "${new Date().toISOString()}"
coverImage: "${COVER_IMAGES[category] || COVER_IMAGES['Fascinating Facts']}"
author:
  name: "Dr. Elena Marsh"
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  bio: "Entomologist and science writer with 15 years of field research experience."
  role: "Lead Entomologist & Editor"
featured: false
affiliateLinks:
  - title: "Field Guide to Insects of North America"
    url: "https://amazon.com/s?k=insect+field+guide"
    description: "Essential reference for identifying insects in the wild"
  - title: "Entomology Equipment Kit"
    url: "https://amazon.com/s?k=entomology+equipment"
    description: "Professional tools for insect collection and study"
---

`

  const fullContent = frontmatter + content

  // Step 4: Save file
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true })
  }

  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, fullContent, 'utf-8')

  console.log(`\n✅ Article saved successfully!`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📄 File: content/articles/${slug}.md`)
  console.log(`🔗 URL:  /blog/${slug}`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
