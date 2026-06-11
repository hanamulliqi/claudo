export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  pageCount?: number;
}

export interface Suggestion {
  id: string;
  book: Book;
  suggestedBy: string;
  votes: string[]; // member ids who voted
}

export interface Club {
  id: string;
  name: string;
  description: string;
  isVirtual: boolean;
  currentBook?: Book;
  suggestions: Suggestion[];
  members: Member[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
}

export interface Meeting {
  id: string;
  clubId: string;
  date: string;
  location?: string;
  videoLink?: string;
  notes?: string;
}
