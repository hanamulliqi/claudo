import { Club } from '../types'

const STORAGE_KEY = 'claudo:clubs'

export function loadClubs(): Club[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Club[]) : []
  } catch {
    return []
  }
}

export function saveClubs(clubs: Club[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs))
}

export function createClub(data: { name: string; description: string; isVirtual: boolean }): Club {
  return {
    id: crypto.randomUUID(),
    name: data.name,
    description: data.description,
    isVirtual: data.isVirtual,
    currentBook: undefined,
    suggestions: [],
    members: [],
    meetings: [],
  }
}
