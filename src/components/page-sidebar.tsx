'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { name: 'Overview', href: '/pages/overview' },
  { name: 'Voice', href: '/pages/voice', evo: true },
  { name: 'Contacts', href: '/pages/contacts', evo: true },
  { name: 'Business', href: '/pages/business', evo: true },
  { name: 'Billing', href: '/pages/billing' },
]

export function PageSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
      <nav className="flex flex-col gap-1 p-3">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                isActive
                  ? 'bg-blue-50 font-medium text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.name}
              {item.evo && (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                  Evo
                </span>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-200 p-3">
        <p className="text-[10px] text-gray-400">
          Pages tagged &quot;Evo&quot; are embedded from the Evo AI platform.
          The rest are your own app pages.
        </p>
      </div>
    </aside>
  )
}
