export const enum FilterDateMode {
  AllDates = 'AllDates',
  SpecificDate = 'SpecificDate',
  ThisDayInThePast = 'ThisDayInThePast',
  Today = 'Today',
}

export type DateMatchOptions = 'createDate' | 'modifiedDate' | 'textMatch'

export interface NoteSet {
  description?: string
  filters: NoteSetFilters
  name: string
  slug: string
  ttlSeconds?: number
}

export interface NoteSetFilters {
  allowTags?: string[]
  blockTags?: string[]
  dateMatchOptions?: DateMatchOptions[]
  dateMode: FilterDateMode
  matchDate?: Date
  noteLimit: number
  randomize?: boolean
  searchText?: string[]
}
