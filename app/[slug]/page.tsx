import { redirect, notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

async function logAnalytics(slug: string) {
  await fetch('/api/log', {
    method: 'POST',
    body: JSON.stringify({ page: slug }),
    headers: { 'Content-Type': 'application/json' }
  }).catch(() => {})
}

export default async function DynamicRedirectPage({ params }: PageProps) {
  const { slug } = params
  const envKey = slug.toUpperCase()

  if (envKey.startsWith('NU_') || envKey.endsWith('_SITEMAP')) {
    await logAnalytics(slug)
    notFound()
  }

  const targetUrl =
    process.env[`${envKey}_SITEMAP`] ||
    process.env[envKey] ||
    process.env[`NU_${envKey}_SITEMAP`] ||
    process.env[`NU_${envKey}`]

  if (!targetUrl) {
    await logAnalytics(slug)
    notFound()
  }

  await logAnalytics(slug)
  redirect(targetUrl)
}
