import { cookies } from 'next/headers'
import { EvoEmbed } from '@/components/evo-embed'

export default async function FullEmbedPage() {
  const email = (await cookies()).get('user_email')!.value

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <EvoEmbed userEmail={email} hideLogo />
      </div>
      <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-3">
        <p className="text-center text-sm text-gray-500">
          Powered by LiveAnswer AI
        </p>
      </footer>
    </div>
  )
}
