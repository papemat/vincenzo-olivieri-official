import { defineType, defineField } from 'sanity'

export const show = defineType({
  name: 'show',
  title: 'Spettacolo',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Data', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Città', type: 'string', validation: r => r.required() }),
    defineField({ name: 'venue', title: 'Luogo / Teatro', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'status',
      title: 'Stato',
      type: 'string',
      options: { list: ['Disponibile', 'Ultimi Posti', 'Sold Out'] },
      initialValue: 'Disponibile',
    }),
    defineField({ name: 'ticketUrl', title: 'Link Biglietti', type: 'url' }),
  ],
  orderings: [{ title: 'Data', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
})
