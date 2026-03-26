import { cookies } from 'next/headers'
import { EvoEmbed } from '@/components/evo-embed'

export default async function BusinessPage() {
  const email = (await cookies()).get('user_email')!.value

  return <EvoEmbed userEmail={email} page="business" hideNav />
}
