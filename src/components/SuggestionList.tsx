import { useState } from 'react'
import { Suggestion, Book } from '../types'
import styles from './SuggestionList.module.css'

interface Props {
  suggestions: Suggestion[]
  onAdd: (book: Book, suggestedBy: string) => void
  onVote: (suggestionId: string) => void
  currentVoterId: string // using first member id as "current user" for now
}

export default function SuggestionList({ suggestions, onAdd, onVote, currentVoterId }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [suggestedBy, setSuggestedBy] = useState('')

  const sorted = [...suggestions].sort((a, b) => b.votes.length - a.votes.length)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    onAdd(
      { id: crypto.randomUUID(), title: title.trim(), author: author.trim() },
      suggestedBy.trim() || 'Anonymous'
    )
    setTitle('')
    setAuthor('')
    setSuggestedBy('')
    setOpen(false)
  }

  return (
    <div className={styles.container}>
      {sorted.length > 0 && (
        <ul className={styles.list}>
          {sorted.map(s => {
            const voted = s.votes.includes(currentVoterId)
            return (
              <li key={s.id} className={styles.item}>
                <div className={styles.bookInfo}>
                  <span className={styles.bookTitle}>{s.book.title}</span>
                  <span className={styles.bookAuthor}>by {s.book.author}</span>
                  {s.suggestedBy && <span className={styles.suggestedBy}>suggested by {s.suggestedBy}</span>}
                </div>
                <button
                  className={`${styles.vote} ${voted ? styles.voted : ''}`}
                  onClick={() => onVote(s.id)}
                  title={voted ? 'Remove vote' : 'Vote for this book'}
                >
                  👍 {s.votes.length}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {open ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus required />
          <input className={styles.input} placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
          <input className={styles.input} placeholder="Your name (optional)" value={suggestedBy} onChange={e => setSuggestedBy(e.target.value)} />
          <div className={styles.formActions}>
            <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className={styles.submit} disabled={!title.trim() || !author.trim()}>Suggest</button>
          </div>
        </form>
      ) : (
        <button className={styles.trigger} onClick={() => setOpen(true)}>
          + Suggest a book
        </button>
      )}
    </div>
  )
}
