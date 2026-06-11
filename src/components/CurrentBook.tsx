import { useState } from 'react'
import { Book } from '../types'
import styles from './CurrentBook.module.css'

interface Props {
  book?: Book
  onSet: (book: Book) => void
  onClear: () => void
}

export default function CurrentBook({ book, onSet, onClear }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [coverUrl, setCoverUrl] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    onSet({ id: crypto.randomUUID(), title: title.trim(), author: author.trim(), coverUrl: coverUrl.trim() || undefined })
    setTitle('')
    setAuthor('')
    setCoverUrl('')
    setEditing(false)
  }

  if (book && !editing) {
    return (
      <div className={styles.current}>
        {book.coverUrl && <img className={styles.cover} src={book.coverUrl} alt={book.title} />}
        <div className={styles.info}>
          <p className={styles.label}>Currently reading</p>
          <p className={styles.title}>{book.title}</p>
          <p className={styles.author}>by {book.author}</p>
          <div className={styles.bookActions}>
            <button className={styles.change} onClick={() => { setTitle(book.title); setAuthor(book.author); setCoverUrl(book.coverUrl ?? ''); setEditing(true) }}>Change</button>
            <button className={styles.clear} onClick={onClear}>Remove</button>
          </div>
        </div>
      </div>
    )
  }

  if (editing || !book) {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus required />
        <input className={styles.input} placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
        <input className={styles.input} placeholder="Cover image URL (optional)" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
        <div className={styles.formActions}>
          {(editing || book) && <button type="button" className={styles.cancel} onClick={() => setEditing(false)}>Cancel</button>}
          <button type="submit" className={styles.submit} disabled={!title.trim() || !author.trim()}>Set book</button>
        </div>
      </form>
    )
  }

  return null
}
