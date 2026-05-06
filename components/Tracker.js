'use client'

import { useState, useEffect, useCallback } from 'react'
import { WEEKS, DAYS, PHASES } from '@/lib/data'
import styles from './Tracker.module.css'

const LEGEND = [
  { type: 'easy',     label: 'Easy run' },
  { type: 'long',     label: 'Long run' },
  { type: 'tempo',    label: 'Tempo' },
  { type: 'gym',      label: 'Gym' },
  { type: 'recovery', label: 'Recovery long' },
  { type: 'shakeout', label: 'Shakeout' },
  { type: 'race',     label: 'Race day' },
  { type: 'rest',     label: 'Rest' },
]

function phaseForWeek(w) {
  return PHASES.find(p => p.weeks.includes(w + 1))
}

export default function Tracker() {
  const [done, setDone] = useState({})
  const [tooltip, setTooltip] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hm-done-v2')
      if (saved) setDone(JSON.parse(saved))
    } catch {}
    setMounted(true)
  }, [])

  const toggle = useCallback((key) => {
    setDone(prev => {
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem('hm-done-v2', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const totalKm = WEEKS.reduce((s, w) => s + w.reduce((a, d) => a + (d.km || 0), 0), 0)
  const kmDone = WEEKS.reduce((s, w, wi) => s + w.reduce((a, d, di) => a + (done[`${wi}_${di}`] ? (d.km || 0) : 0), 0), 0)
  const sessionsDone = Object.values(done).filter(Boolean).length
  const totalSessions = WEEKS.reduce((s, w) => s + w.filter(d => d.type !== 'rest').length, 0)
  const pct = totalKm > 0 ? Math.round((kmDone / totalKm) * 100) : 0

  let lastPhase = null

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>22 weeks · Sydney</p>
          <h1 className={styles.title}>Sub 2:00:00</h1>
          <p className={styles.subtitle}>Half Marathon · 10 October 2025</p>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{mounted ? sessionsDone : '—'}</span>
            <span className={styles.statLabel}>sessions done</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{mounted ? Math.round(kmDone) : '—'}</span>
            <span className={styles.statLabel}>km logged</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{Math.round(totalKm)}</span>
            <span className={styles.statLabel}>total km</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{mounted ? pct : '—'}%</span>
            <span className={styles.statLabel}>complete</span>
          </div>
        </div>
      </header>

      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: mounted ? `${pct}%` : '0%' }} />
        </div>
        <span className={styles.progressLabel}>Race day in {Math.max(0, totalSessions - sessionsDone)} sessions</span>
      </div>

      <div className={styles.legend}>
        {LEGEND.map(l => (
          <div key={l.type} className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles[`cell_${l.type}`]}`} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.calWrap}>
        <div className={styles.calHeader}>
          <div className={styles.weekNum} />
          {DAYS.map(d => <div key={d} className={styles.dayHead}>{d}</div>)}
        </div>

        {WEEKS.map((week, wi) => {
          const phase = phaseForWeek(wi)
          const showPhase = phase && phase !== lastPhase
          if (phase) lastPhase = phase

          return (
            <div key={wi}>
              {showPhase && (
                <div className={styles.phaseLabel}>{phase.name}</div>
              )}
              <div className={styles.weekRow}>
                <div className={styles.weekNum}>W{wi + 1}</div>
                {week.map((day, di) => {
                  const key = `${wi}_${di}`
                  const isDone = mounted && done[key]
                  return (
                    <button
                      key={di}
                      className={[
                        styles.cell,
                        styles[`cell_${day.type}`],
                        isDone ? styles.cellDone : '',
                      ].join(' ')}
                      onClick={() => toggle(key)}
                      onMouseEnter={(e) => {
                        setTooltip({ week: wi + 1, day: DAYS[di], ...day })
                        setTooltipPos({ x: e.clientX, y: e.clientY })
                      }}
                      onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setTooltip(null)}
                      aria-label={`Week ${wi + 1} ${DAYS[di]}: ${day.label}${day.km ? ` ${day.km} km` : ''} — ${isDone ? 'done' : 'not done'}`}
                    >
                      <span className={styles.cellLabel}>{day.label}</span>
                      {day.km > 0 && <span className={styles.cellKm}>{day.km} km</span>}
                      {isDone && <span className={styles.checkmark} aria-hidden>✓</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {tooltip && (
        <div
          className={styles.tooltip}
          style={{ left: tooltipPos.x + 16, top: tooltipPos.y - 8 }}
        >
          <p className={styles.tipHead}>Week {tooltip.week} · {tooltip.day}</p>
          <p className={styles.tipType}>{tooltip.label}{tooltip.km ? ` · ${tooltip.km} km` : ''}</p>
          <p className={styles.tipNote}>{tooltip.note}</p>
        </div>
      )}

      <footer className={styles.footer}>
        <p>Click any session to mark it complete · Progress saves to your browser</p>
      </footer>
    </div>
  )
}

