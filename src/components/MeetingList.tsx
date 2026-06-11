import { useState } from 'react'
import { Meeting } from '../types'
import styles from './MeetingList.module.css'

interface Props {
  meetings: Meeting[]
  isVirtual: boolean
  onAdd: (meeting: Meeting) => void
  onDelete: (id: string) => void
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function MeetingList({ meetings, isVirtual, onAdd, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState('')
  const [place, setPlace] = useState('')
  const [notes, setNotes] = useState('')

  const now = new Date()
  const upcoming = meetings.filter(m => new Date(m.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const past = meetings.filter(m => new Date(m.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date) return
    const meeting: Meeting = {
      id: crypto.randomUUID(),
      date: new Date(date).toISOString(),
      notes: notes.trim() || undefined,
      ...(isVirtual ? { videoLink: place.trim() || undefined } : { location: place.trim() || undefined }),
    }
    onAdd(meeting)
    setDate('')
    setPlace('')
    setNotes('')
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      {upcoming.length > 0 && (
        <ul className={styles.list}>
          {upcoming.map(m => (
            <li key={m.id} className={styles.item}>
              <div className={styles.dateCol}>
                <span className={styles.dot} />
                <span className={styles.date}>{formatDate(m.date)}</span>
              </div>
              <div className={styles.details}>
                {(m.videoLink || m.location) && (
                  <span className={styles.place}>
                    {m.videoLink
                      ? <a href={m.videoLink} target="_blank" rel="noreferrer">{m.videoLink}</a>
                      : m.location}
                  </span>
                )}
                {m.notes && <span className={styles.notes}>{m.notes}</span>}
              </div>
              <button className={styles.delete} onClick={() => onDelete(m.id)} aria-label="Delete meeting">×</button>
            </li>
          ))}
        </ul>
      )}

      {open ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Date & time
            <input className={styles.input} type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
          </label>
          <label className={styles.label}>
            {isVirtual ? 'Video link (optional)' : 'Location (optional)'}
            <input className={styles.input} type="text" placeholder={isVirtual ? 'https://meet.google.com/...' : 'e.g. The Corner Café'} value={place} onChange={e => setPlace(e.target.value)} />
          </label>
          <label className={styles.label}>
            Notes (optional)
            <textarea className={styles.textarea} placeholder="What are we discussing?" value={notes} onChange={e => setNotes(e.target.value)} rows={2} />
          </label>
          <div className={styles.formActions}>
            <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className={styles.submit} disabled={!date}>Schedule</button>
          </div>
        </form>
      ) : (
        <button className={styles.trigger} onClick={() => setOpen(true)}>+ Schedule meeting</button>
      )}

      {past.length > 0 && (
        <details className={styles.past}>
          <summary className={styles.pastSummary}>Past meetings ({past.length})</summary>
          <ul className={styles.list}>
            {past.map(m => (
              <li key={m.id} className={`${styles.item} ${styles.pastItem}`}>
                <div className={styles.dateCol}>
                  <span className={`${styles.dot} ${styles.pastDot}`} />
                  <span className={styles.date}>{formatDate(m.date)}</span>
                </div>
                {m.notes && <span className={styles.notes}>{m.notes}</span>}
                <button className={styles.delete} onClick={() => onDelete(m.id)} aria-label="Delete meeting">×</button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}
