import { useState } from 'react'
import { Club } from './types'
import { loadClubs, saveClubs } from './store/clubs'
import CreateClubForm from './components/CreateClubForm'
import ClubCard from './components/ClubCard'
import ClubDetail from './pages/ClubDetail'
import styles from './App.module.css'

export default function App() {
  const [clubs, setClubs] = useState<Club[]>(loadClubs)
  const [showForm, setShowForm] = useState(false)
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null)

  const selectedClub = clubs.find(c => c.id === selectedClubId) ?? null

  function handleCreated(club: Club) {
    const updated = [...clubs, club]
    setClubs(updated)
    saveClubs(updated)
    setShowForm(false)
  }

  function handleUpdateClub(updated: Club) {
    const next = clubs.map(c => c.id === updated.id ? updated : c)
    setClubs(next)
    saveClubs(next)
  }

  if (selectedClub) {
    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <span className={styles.logo} style={{ cursor: 'pointer' }} onClick={() => setSelectedClubId(null)}>📖 Claudo</span>
          </div>
        </header>
        <main className={styles.main}>
          <ClubDetail
            club={selectedClub}
            onBack={() => setSelectedClubId(null)}
            onUpdateClub={handleUpdateClub}
          />
        </main>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>📖 Claudo</span>
          <button className={styles.newButton} onClick={() => setShowForm(true)}>
            + New club
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {showForm && (
          <div className={styles.overlay} onClick={() => setShowForm(false)}>
            <div onClick={e => e.stopPropagation()}>
              <CreateClubForm onCreated={handleCreated} onCancel={() => setShowForm(false)} />
            </div>
          </div>
        )}

        {clubs.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIllustration}>📚</div>
            <p className={styles.emptyTitle}>No clubs yet</p>
            <p className={styles.emptySubtitle}>Start your first book club — virtual or in-person, big or small.</p>
            <button className={styles.emptyButton} onClick={() => setShowForm(true)}>
              + New club
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {clubs.map(club => (
              <div key={club.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedClubId(club.id)}>
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
