import { useState } from 'react'
import { Member } from '../types'
import styles from './AddMemberForm.module.css'

interface Props {
  onAdd: (member: Member) => void
}

export default function AddMemberForm({ onAdd }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    onAdd({ id: crypto.randomUUID(), name: name.trim(), email: email.trim() })
    setName('')
    setEmail('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button className={styles.trigger} onClick={() => setOpen(true)}>
        + Add member
      </button>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
        required
      />
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button type="submit" className={styles.submit} disabled={!name.trim() || !email.trim()}>
          Add
        </button>
      </div>
    </form>
  )
}
