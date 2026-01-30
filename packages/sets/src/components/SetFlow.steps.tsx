import { SetDateFiltersForm } from './SetDateFiltersForm'
import { SetNameForm } from './SetNameForm'
import { SetTagFiltersForm } from './SetTagFiltersForm'

export const flowSteps = () => [
  {
    content: <SetNameForm />,
    icon: 'FolderPen',
    title: 'name',
  },
  {
    content: <SetDateFiltersForm />,
    icon: 'Calendar',
    title: 'date filters',
  },
  {
    content: <SetTagFiltersForm />,
    icon: 'Hash',
    title: 'tag filters',
  },
]
