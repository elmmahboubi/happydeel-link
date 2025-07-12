import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import NotFoundPage from './NotFoundPage'

export default function RedirectPage() {
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    const handleRedirect = async () => {
      if (!slug) return

      try {
        // Look up the short link in the database
        const { data: shortLink, error } = await supabase
          .from('short_links')
          .select('original_url, click_count')
          .eq('slug', slug)
          .single()

        if (error || !shortLink) {
          console.log(`Slug not found: ${slug}`)
          return
        }

        // Increment click count asynchronously (don't wait for it)
        supabase
          .from('short_links')
          .update({ click_count: shortLink.click_count + 1 })
          .eq('slug', slug)
          .then(() => {
            console.log(`Click count updated for slug: ${slug}`)
          })
          .catch((error) => {
            console.error('Failed to update click count:', error)
          })

        // Redirect to the original URL
        window.location.href = shortLink.original_url
      } catch (error) {
        console.error('Redirect error:', error)
      }
    }

    handleRedirect()
  }, [slug])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Redirecting...</p>
      </div>
    </div>
  )
}