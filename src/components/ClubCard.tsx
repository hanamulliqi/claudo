import { Club } from '../types'
import styles from './ClubCard.module.css'

interface Props {
  club: Club
}

export default function ClubCard({ club }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.badge}>{club.isVirtual ? 'Virtual' : 'In-person'}</div>
      <h3 className={styles.name}>{club.name}</h3>
      {club.description && <p className={styles.description}>{club.description}</p>}
      <p className={styles.members}>
        {club.members.length === 0
          ? 'No members yet'
          : `${club.members.length} member${club.members.length === 1 ? '' : 's'}`}
      </p>
    </div>
  )
}
