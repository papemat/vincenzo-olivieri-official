import { defineType, defineField } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titolo', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Categoria', type: 'string' }),
    defineField({ name: 'duration', title: 'Durata (es. 12:45)', type: 'string' }),
    defineField({ name: 'thumbnailUrl', title: 'URL Thumbnail', type: 'url', validation: r => r.required() }),
    defineField({ name: 'videoUrl', title: 'URL Video', type: 'url' }),
    defineField({ name: 'featured', title: 'Video in evidenza', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Ordine', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
