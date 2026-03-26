import { cookies } from 'next/headers'
import { EvoEmbed } from '@/components/evo-embed'

export default async function ContactsPage() {
  const email = (await cookies()).get('user_email')!.value

  return <EvoEmbed userEmail={email} page="contacts" hideNav />
}
