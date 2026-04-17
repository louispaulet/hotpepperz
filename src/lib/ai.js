const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'openai/gpt-oss-120b'
const POLLINATIONS_ENDPOINT = 'https://gen.pollinations.ai/image'
const POLLINATIONS_MODEL = import.meta.env.VITE_POLLINATIONS_MODEL || 'flux'

const heatTitles = [
  'Table Glow',
  'Copper Ember',
  'Market Spark',
  'Lantern Heat',
  'Reserve Burn',
  'Cellar Flame',
  'Forge Mark',
  'Red Ledger',
  'Last Warning',
  'Apex Reserve',
]

function getBasePrompt({ peppers, accents, heatLabel, labelStyle }) {
  const pepperSummary = peppers
    .map((pepper) => `${pepper.name} (${pepper.notes.join(', ')})`)
    .join(', ')

  const accentSummary = accents.length
    ? accents.map((accent) => `${accent.name} (${accent.notes.join(', ')})`).join(', ')
    : 'no supporting accents'

  return `Create a serious, premium hot sauce concept for a craft sauce maker.
Selected peppers: ${pepperSummary}.
Supporting accents: ${accentSummary}.
Heat impression: ${heatLabel}.
Label art direction: ${labelStyle.promptTone}.

Return strict JSON with keys "name", "blurb", and "labelPrompt".
- "name": 2 to 4 words, memorable, premium, grounded, no quotation marks.
- "blurb": 14 to 22 words describing the flavor and burn.
- "labelPrompt": one concise image prompt for a bottle label illustration.
Avoid generic names like Inferno Sauce or Hot Stuff.`.trim()
}

export async function generateSauceConcept(recipe) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey) {
    throw new Error('Missing VITE_GROQ_API_KEY. Add it to .env.local for live Groq generation.')
  }

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 1.05,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'hot_sauce_concept',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              name: { type: 'string' },
              blurb: { type: 'string' },
              labelPrompt: { type: 'string' },
            },
            required: ['name', 'blurb', 'labelPrompt'],
          },
        },
      },
      messages: [
        {
          role: 'system',
          content:
            'You write premium product names for serious craft hot sauces and respond only with valid JSON.',
        },
        {
          role: 'user',
          content: getBasePrompt(recipe),
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status}`)
  }

  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Groq response did not include any content.')
  }

  const parsed = JSON.parse(content)

  return {
    name: parsed.name?.trim(),
    blurb: parsed.blurb?.trim(),
    labelPrompt: parsed.labelPrompt?.trim(),
  }
}

export function buildFallbackConcept({ peppers, accents, heatIndex }) {
  const topPepper = peppers[peppers.length - 1]?.name ?? 'Pepper'
  const firstAccent = accents[0]?.name ?? 'Ember'
  const title = heatTitles[Math.max(0, Math.min(heatTitles.length - 1, heatIndex - 1))]

  return {
    name: `${firstAccent.split(' ')[0]} ${title}`,
    blurb: `${topPepper} leads with ${firstAccent.toLowerCase()} and a small-batch burn that lands warm, vivid, and just unruly enough.`,
    labelPrompt: `serious craft hot sauce bottle label, ${topPepper}, ${firstAccent}, tactile printmaking, premium culinary packaging`,
  }
}

export function buildLabelImageUrl({
  sauceName,
  peppers,
  accents,
  heatLabel,
  labelStyle,
  labelPrompt,
  seed,
}) {
  const pollinationsKey = import.meta.env.VITE_POLLINATIONS_KEY

  if (!pollinationsKey) {
    return ''
  }

  const pepperWords = peppers.map((pepper) => pepper.name).join(', ')
  const accentWords = accents.map((accent) => accent.name).join(', ')

  const prompt = [
    labelPrompt,
    `for a hot sauce called ${sauceName}`,
    `featuring ${pepperWords || 'mixed peppers'}`,
    accentWords ? `with ${accentWords}` : '',
    `${heatLabel} intensity`,
    labelStyle.promptTone,
    'centered composition, bottle label only, no mockup, rich paper texture, no watermark, no text blocks',
  ]
    .filter(Boolean)
    .join(', ')

  return `${POLLINATIONS_ENDPOINT}/${encodeURIComponent(
    prompt,
  )}?width=768&height=1024&seed=${seed}&model=${encodeURIComponent(
    POLLINATIONS_MODEL,
  )}&key=${encodeURIComponent(pollinationsKey)}`
}
