import { NoteSet } from '../types'
import { SetDateFiltersForm } from './SetDateFiltersForm'
import { SetNameForm } from './SetNameForm'
import { SetTagFiltersForm } from './SetTagFiltersForm'

export const flowSteps = ({
  initialSet,
  updateSet,
}: {
  initialSet: Partial<NoteSet>
  updateSet: (set: Partial<NoteSet>) => void
}) => [
  {
    content: <SetNameForm initialSet={initialSet} updateSet={updateSet} />,
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
