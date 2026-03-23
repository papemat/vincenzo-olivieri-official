import { defineType, defineField } from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Recensione',
  type: 'document',
  fields: [
    defineField({ name: 'text', title: 'Testo', type: 'text', validation: r => r.required() }),
    defineField({ name: 'author', title: 'Autore / Fonte', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Ruolo / Tipo', type: 'string' }),
  ],
})
