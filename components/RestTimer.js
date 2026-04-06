'use client'
import { useState, useEffect, useRef } from 'react'

export default function RestTimer({ defaultSeconds = 90, onClose }) {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [running, setRunning] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000)
    } else {
      clearInterval(intervalRef.current)
      if (seconds === 0 && running) {
        // Done
        try { new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play() } catch {}
      }
    }
    return () => clearInterval(intervalRef.current)
  }, [running, seconds])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const pct = seconds / defaultSeconds
  const circumference = 2 * Math.PI * 54
  const dash = circumference * pct

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1A1A1A] rounded-3xl p-8 flex flex-col items-center gap-6 w-72 shadow-2xl" onClick={e => e.stopPropagation()}>
        <p className="text-[#FFB347] font-semibold text-sm uppercase tracking-widest">Rest Timer</p>
        <div className="relative w-36 h-36">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2A2A2A" strokeWidth="8"/>
            <circle cx="60" cy="60" r="54" fill="none" stroke="#FFB347" strokeWidth="8"
              strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold text-white">
              {mins}:{secs.toString().padStart(2,'0')}
            </span>
            {seconds === 0 && <span className="text-[#FFB347] text-xs font-semibold mt-1">GO! 🔥</span>}
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => { setSeconds(defaultSeconds); setRunning(true) }}
            className="flex-1 py-2 rounded-xl bg-[#2A2A2A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >Reset</button>
          <button
            onClick={() => setRunning(r => !r)}
            className="flex-1 py-2 rounded-xl bg-[#FFB347] text-black text-sm font-bold hover:bg-[#E8950A] transition-colors"
          >{running ? 'Pause' : 'Resume'}</button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-[#2A2A2A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >Close</button>
        </div>
        {[30,60,90,120,180].map(s => (
          <button key={s} onClick={() => { setSeconds(s); setRunning(true) }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${seconds===s&&running?'bg-[#FFB347] text-black':'bg-[#2A2A2A] text-[#AAA] hover:text-white'}`}
          >{s < 60 ? `${s}s` : `${s/60}m${s%60?s%60+'s':''}`}</button>
        ))}
      </div>
    </div>
  )
    }
