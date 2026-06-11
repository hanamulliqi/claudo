import { useState } from 'react'
import { Club } from '../types'
import { createClub } from '../store/clubs'
import styles from './CreateClubForm.module.css'

interface Props {
  onCreated: (club: Club) => void
  onCancel: () => void
}

export default function CreateClubForm({ onCreated, onCancel }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isVirtual, setIsVirtual] = useState(true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onCreated(createClub({ name: name.trim(), description: description.trim(), isVirtual }))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>New book club</h2>

      <label className={styles.label}>
        Club name
        <input
          className={styles.input}
          type="text"
          placeholder="e.g. The Midnight Pages"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
      </label>

      <label className={styles.label}>
        Description
        <textarea
          className={styles.textarea}
          placeholder="What kind of books will you read? Who's it for?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </label>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Format</legend>
        <label className={styles.radio}>
          <input
            type="radio"
            name="format"
            checked={isVirtual}
            onChange={() => setIsVirtual(true)}
          />
          Virtual — we meet online
        </label>
        <label className={styles.radio}>
          <input
            type="radio"
            name="format"
            checked={!isVirtual}
            onChange={() => setIsVirtual(false)}
          />
          In-person — we meet somewhere local
        </label>
      </fieldset>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit} disabled={!name.trim()}>
          Create club
        </button>
      </div>
    </form>
  )
}
