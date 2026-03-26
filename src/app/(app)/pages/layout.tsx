import { PageSidebar } from '@/components/page-sidebar'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <PageSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
