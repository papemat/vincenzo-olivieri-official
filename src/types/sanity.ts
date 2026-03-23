export interface Show {
  _id: string
  title: string
  date: string
  location: string
  venue: string
  status: 'Disponibile' | 'Ultimi Posti' | 'Sold Out'
  ticketUrl?: string
}

export interface Quote {
  _id: string
  text: string
  author: string
  role?: string
}

export interface Video {
  _id: string
  title: string
  category?: string
  duration?: string
  thumbnailUrl: string
  videoUrl?: string
  featured?: boolean
  order?: number
}
