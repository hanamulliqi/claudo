import { Club, Member } from '../types'
import AddMemberForm from '../components/AddMemberForm'
import styles from './ClubDetail.module.css'

interface Props {
  club: Club
  onBack: () => void
  onUpdateClub: (club: Club) => void
}

export default function ClubDetail({ club, onBack, onUpdateClub }: Props) {
  function handleAddMember(member: Member) {
    onUpdateClub({ ...club, members: [...club.members, member] })
  }

  function handleRemoveMember(id: string) {
    onUpdateClub({ ...club, members: club.members.filter(m => m.id !== id) })
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onBack}>
        ← All clubs
      </button>

      <div className={styles.header}>
        <span className={styles.badge}>{club.isVirtual ? 'Virtual' : 'In-person'}</span>
        <h1 className={styles.name}>{club.name}</h1>
        {club.description && <p className={styles.description}>{club.description}</p>}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Members
          <span className={styles.count}>{club.members.length}</span>
        </h2>

        {club.members.length > 0 && (
          <ul className={styles.memberList}>
            {club.members.map(member => (
              <li key={member.id} className={styles.memberRow}>
                <div className={styles.avatar}>{member.name[0].toUpperCase()}</div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberEmail}>{member.email}</span>
                </div>
                <button
                  className={styles.remove}
                  onClick={() => handleRemoveMember(member.id)}
                  aria-label={`Remove ${member.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <AddMemberForm onAdd={handleAddMember} />
      </section>
    </div>
  )
}
