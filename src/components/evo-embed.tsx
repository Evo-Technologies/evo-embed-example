'use client'

import { useEffect, useRef, useState } from 'react'

interface EvoEmbedOptions {
  el: string | HTMLElement
  tokenEndpoint: string
  user: string
  page?: string
  hideNav?: boolean
  hideLogo?: boolean
  height?: string
  agentId?: string
  embedOrigin?: string
}

interface EvoEmbedInstance {
  destroy: () => void
  navigate: (page: string) => void
}

declare global {
  interface Window {
    Evo?: {
      embed: (opts: EvoEmbedOptions) => EvoEmbedInstance
    }
  }
}

const EVO_HOST = process.env.NEXT_PUBLIC_EVO_HOST || 'http://localhost:3000'

interface Props {
  userEmail: string
  page?: string
  hideNav?: boolean
  hideLogo?: boolean
  height?: string
}

export function EvoEmbed({
  userEmail,
  page = 'dashboard',
  hideNav = false,
  hideLogo = false,
  height = '100%',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<EvoEmbedInstance | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load embed.js from the Evo platform
  useEffect(() => {
    // Reuse if already loaded
    if (window.Evo) {
      setScriptLoaded(true)
      return
    }

    const existing = document.querySelector(
      `script[src="${EVO_HOST}/embed.js"]`
    )
    if (existing) {
      existing.addEventListener('load', () => setScriptLoaded(true))
      return
    }

    const script = document.createElement('script')
    script.src = `${EVO_HOST}/embed.js`
    script.onload = () => setScriptLoaded(true)
    script.onerror = () =>
      setError(`Failed to load embed.js from ${EVO_HOST}`)
    document.head.appendChild(script)
  }, [])

  // Initialize embed after script loads
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.Evo) return

    instanceRef.current = window.Evo.embed({
      el: containerRef.current,
      tokenEndpoint: '/api/embed-token',
      user: userEmail,
      page,
      hideNav,
      hideLogo,
      height,
    })

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [scriptLoaded, userEmail, page, hideNav, height])

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="max-w-sm rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="text-sm font-medium text-red-800">
            Failed to load embed
          </h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <p className="mt-2 text-xs text-red-600">
            Check that the Evo platform is running at {EVO_HOST}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {!scriptLoaded && (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            <p className="mt-2 text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
