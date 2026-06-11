import { useState } from 'react'
import { Club } from './types'
import { loadClubs, saveClubs } from './store/clubs'
import CreateClubForm from './components/CreateClubForm'
import ClubCard from './components/ClubCard'
import styles from './App.module.css'

export default function App() {
  const [clubs, setClubs] = useState<Club[]>(loadClubs)
  const [showForm, setShowForm] = useState(false)

  function handleCreated(club: Club) {
    const updated = [...clubs, club]
    setClubs(updated)
    saveClubs(updated)
    setShowForm(false)
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
            <p className={styles.emptyTitle}>No clubs yet</p>
            <p className={styles.emptySubtitle}>Create your first book club to get started.</p>
            <button className={styles.emptyButton} onClick={() => setShowForm(true)}>
              + New club
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {clubs.map(club => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
