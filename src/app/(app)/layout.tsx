import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { TabNav } from '@/components/tab-nav'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get('user_email')?.value

  if (!userEmail) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Acme Services</h1>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
          <LogoutButton />
        </div>
        <TabNav />
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
