import { useState, useEffect, useRef } from 'react'

// ─── Countdown Hook ───────────────────────────────────────────────────────────
const useCountdown = (targetDate) => {
  const calc = () => {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
    return {
      hours: Math.floor(diff / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return time
}

// ─── Single Countdown Display ─────────────────────────────────────────────────
const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg tabular-nums"
      style={{ background: 'rgba(218,41,28,0.12)', color: '#DA291C' }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <span className="text-gray-400 text-[10px] mt-0.5 font-medium">{label}</span>
  </div>
)

const Countdown = ({ deadline }) => {
  const { hours, minutes, seconds } = useCountdown(deadline)
  const expired = hours === 0 && minutes === 0 && seconds === 0
  if (expired)
    return (
      <span className="text-xs font-bold text-red-500 animate-pulse">⚠️ انتهى العرض</span>
    )
  return (
    <div className="flex items-end gap-1">
      <CountdownUnit value={hours} label="ساعة" />
      <span className="text-[#DA291C] font-black text-lg mb-3">:</span>
      <CountdownUnit value={minutes} label="دقيقة" />
      <span className="text-[#DA291C] font-black text-lg mb-3">:</span>
      <CountdownUnit value={seconds} label="ثانية" />
    </div>
  )
}

export default Countdown
