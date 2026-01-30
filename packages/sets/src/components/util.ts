import { FilterDateMode } from '../types'

export const getDateFilterModeLabel = (mode: FilterDateMode) => {
  switch (mode) {
    case FilterDateMode.AllDates:
      return 'All Dates'
    case FilterDateMode.SpecificDate:
      return 'Specific Date'
    case FilterDateMode.ThisDayInThePast:
      return 'This Day in the Past'
    case FilterDateMode.Today:
      return 'Today'
    default:
      return 'All Dates'
  }
}

export const getDateFilterLabels = (): string[] => {
  return ['All Dates', 'This Day in the Past', 'Specific Date', 'Today']
}

export const getDateFilterModeFromLabel = (label: string): FilterDateMode => {
  switch (label) {
    case 'All Dates':
      return FilterDateMode.AllDates
    case 'Specific Date':
      return FilterDateMode.SpecificDate
    case 'This Day in the Past':
      return FilterDateMode.ThisDayInThePast
    case 'Today':
      return FilterDateMode.Today
    default:
      return FilterDateMode.AllDates
  }
}
