import { Club, Member, Book, Suggestion, Meeting } from '../types'
import AddMemberForm from '../components/AddMemberForm'
import CurrentBook from '../components/CurrentBook'
import SuggestionList from '../components/SuggestionList'
import MeetingList from '../components/MeetingList'
import styles from './ClubDetail.module.css'

interface Props {
  club: Club
  onBack: () => void
  onUpdateClub: (club: Club) => void
}

export default function ClubDetail({ club, onBack, onUpdateClub }: Props) {
  const currentVoterId = club.members[0]?.id ?? 'guest'

  function handleAddMember(member: Member) {
    onUpdateClub({ ...club, members: [...club.members, member] })
  }

  function handleRemoveMember(id: string) {
    onUpdateClub({ ...club, members: club.members.filter(m => m.id !== id) })
  }

  function handleSetBook(book: Book) {
    onUpdateClub({ ...club, currentBook: book })
  }

  function handleClearBook() {
    onUpdateClub({ ...club, currentBook: undefined })
  }

  function handleAddSuggestion(book: Book, suggestedBy: string) {
    const suggestion: Suggestion = {
      id: crypto.randomUUID(),
      book,
      suggestedBy,
      votes: [],
    }
    onUpdateClub({ ...club, suggestions: [...(club.suggestions ?? []), suggestion] })
  }

  function handleAddMeeting(meeting: Meeting) {
    onUpdateClub({ ...club, meetings: [...(club.meetings ?? []), meeting] })
  }

  function handleDeleteMeeting(id: string) {
    onUpdateClub({ ...club, meetings: (club.meetings ?? []).filter(m => m.id !== id) })
  }

  function handleVote(suggestionId: string) {
    const suggestions = (club.suggestions ?? []).map(s => {
      if (s.id !== suggestionId) return s
      const alreadyVoted = s.votes.includes(currentVoterId)
      return {
        ...s,
        votes: alreadyVoted
          ? s.votes.filter(v => v !== currentVoterId)
          : [...s.votes, currentVoterId],
      }
    })
    onUpdateClub({ ...club, suggestions })
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={onBack}>← All clubs</button>

      <div className={styles.header}>
        <span className={styles.badge}>{club.isVirtual ? 'Virtual' : 'In-person'}</span>
        <h1 className={styles.name}>{club.name}</h1>
        {club.description && <p className={styles.description}>{club.description}</p>}
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Meetings
          {(club.meetings?.length ?? 0) > 0 && (
            <span className={styles.count}>{club.meetings.filter(m => new Date(m.date) >= new Date()).length} upcoming</span>
          )}
        </h2>
        <MeetingList
          meetings={club.meetings ?? []}
          isVirtual={club.isVirtual}
          onAdd={handleAddMeeting}
          onDelete={handleDeleteMeeting}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Current book</h2>
        <CurrentBook book={club.currentBook} onSet={handleSetBook} onClear={handleClearBook} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Suggestions
          {(club.suggestions?.length ?? 0) > 0 && (
            <span className={styles.count}>{club.suggestions.length}</span>
          )}
        </h2>
        <SuggestionList
          suggestions={club.suggestions ?? []}
          onAdd={handleAddSuggestion}
          onVote={handleVote}
          currentVoterId={currentVoterId}
        />
      </section>

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
                <button className={styles.remove} onClick={() => handleRemoveMember(member.id)} aria-label={`Remove ${member.name}`}>×</button>
              </li>
            ))}
          </ul>
        )}
        <AddMemberForm onAdd={handleAddMember} />
      </section>
    </div>
  )
}
