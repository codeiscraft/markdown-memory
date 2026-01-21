import type { IconProps as ChakraIconProps } from '@chakra-ui/react'

import { Icon as ChakraIcon } from '@chakra-ui/react'
import * as Icons from 'lucide-react'

import { IconProps } from './Icon.types'

const IconMap = Icons as unknown as {
  [key: string]: Icons.LucideIcon | undefined
}

export function Icon(props: ChakraIconProps & IconProps) {
  const { name } = props

  const testId = `Icon${name}`
  const MappedIcon = IconMap[name]
  console.log('MappedIcon', MappedIcon)
  return MappedIcon ? (
    <ChakraIcon {...props}>
      <MappedIcon data-testid={testId} />
    </ChakraIcon>
  ) : null
}
