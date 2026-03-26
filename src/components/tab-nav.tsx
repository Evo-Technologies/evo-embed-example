'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { name: 'Full Embed', href: '/full' },
  { name: 'Individual Pages', href: '/pages' },
]

export function TabNav() {
  const pathname = usePathname()

  return (
    <nav className="px-4 sm:px-6 lg:px-8">
      <div className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`border-b-2 px-1 py-3 text-sm font-medium ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
