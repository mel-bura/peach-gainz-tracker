'use client'
import Link from 'next/link'

export default function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'Home', icon: '🏠', href: '/' },
    { id: 'progress', label: 'Progress', icon: '📈', href: '/progress' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[#0F0F0F]/95 backdrop-blur-md border-t border-[#1A1A1A] px-6 pb-6 pt-3">
        <div className="flex justify-around max-w-md mx-auto">
          {items.map(item => (
            <Link key={item.id} href={item.href}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all ${
                active === item.id
                  ? 'text-[#FFB347] bg-[#FFB347]/10'
                  : 'text-[#555] hover:text-[#888]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
