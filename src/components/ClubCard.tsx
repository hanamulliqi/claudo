import { Club } from '../types'
import styles from './ClubCard.module.css'

interface Props {
  club: Club
}

function nextMeeting(club: Club) {
  const now = new Date()
  return (club.meetings ?? [])
    .filter(m => new Date(m.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function ClubCard({ club }: Props) {
  const meeting = nextMeeting(club)

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.badge}>{club.isVirtual ? 'Virtual' : 'In-person'}</span>
        <h3 className={styles.name}>{club.name}</h3>
        {club.description && <p className={styles.description}>{club.description}</p>}
      </div>

      <div className={styles.meta}>
        {club.currentBook ? (
          <p className={styles.metaRow}>
            <span className={styles.metaIcon}>📖</span>
            <span>{club.currentBook.title}</span>
          </p>
        ) : (
          <p className={`${styles.metaRow} ${styles.muted}`}>
            <span className={styles.metaIcon}>📖</span>
            <span>No book set</span>
          </p>
        )}

        {meeting ? (
          <p className={styles.metaRow}>
            <span className={styles.metaIcon}>📅</span>
            <span>Next: {formatShortDate(meeting.date)}</span>
          </p>
        ) : (
          <p className={`${styles.metaRow} ${styles.muted}`}>
            <span className={styles.metaIcon}>📅</span>
            <span>No meetings scheduled</span>
          </p>
        )}

        <p className={styles.metaRow}>
          <span className={styles.metaIcon}>👥</span>
          <span>{club.members.length === 0 ? 'No members yet' : `${club.members.length} member${club.members.length === 1 ? '' : 's'}`}</span>
        </p>
      </div>
    </div>
  )
}
