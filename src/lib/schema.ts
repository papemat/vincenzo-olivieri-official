export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vincenzo Olivieri',
  jobTitle: 'Comico, Caratterista, Speaker Radiofonico',
  url: 'https://vincenzoolivieri.it',
  sameAs: [
    'https://www.instagram.com/vincenzoolivieri_official',
    'https://www.facebook.com/vincenzoolivieriofficial',
    'https://www.youtube.com/@vincenzoolivieri',
  ],
  knowsAbout: ['Comicità', 'Stand-up Comedy', 'Radio', 'Teatro'],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vincenzo Olivieri',
  url: 'https://vincenzoolivieri.it',
  description: 'Sito ufficiale di Vincenzo Olivieri. Comico, caratterista, cantante, autore e speaker radiofonico.',
  inLanguage: 'it',
};

export function eventSchema(show: {
  title: string;
  date: string;
  location: string;
  venue: string;
  ticketUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: show.title,
    startDate: show.date,
    location: {
      '@type': 'Place',
      name: show.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: show.location,
        addressCountry: 'IT',
      },
    },
    performer: {
      '@type': 'Person',
      name: 'Vincenzo Olivieri',
    },
    organizer: {
      '@type': 'Person',
      name: 'Vincenzo Olivieri',
      url: 'https://vincenzoolivieri.it',
    },
    ...(show.ticketUrl ? { offers: { '@type': 'Offer', url: show.ticketUrl, availability: 'https://schema.org/InStock' } } : {}),
  };
}
