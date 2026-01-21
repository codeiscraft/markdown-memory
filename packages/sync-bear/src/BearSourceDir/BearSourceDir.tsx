import { Em, Separator, Stack, Strong, Text } from '@chakra-ui/react'
import { Icon } from '@mdm/components'

import { BearSourceDetails } from '../types'

export interface BearSourceDirProps {
  bearDetails: BearSourceDetails
}

export function BearSourceDir({ bearDetails }: BearSourceDirProps) {
  const { database, files, images } = bearDetails
  return (
    <Stack border="1px solid" borderColor="gray.200" borderRadius="md" gap={4} p={4} w="full">
      <Stack alignItems="center" direction="row" gap={2}>
        <Icon color="green.600" name="FolderCheck" size="sm" />
        <Strong textStyle="xs">source directory valid</Strong>
      </Stack>
      <Separator />
      <Stack alignItems="center" direction="row" gap={2}>
        <Icon color="green.600" name="Database" size="sm" />
        <Strong textStyle="xs">{database?.file}</Strong>
        <Text textStyle="xs">
          <Strong>size:</Strong> {database?.sizeMb} MB
        </Text>
        <Text textStyle="xs">
          <Strong>last modified:</Strong> {database?.lastModified?.toLocaleString()}
        </Text>
      </Stack>
      <Stack alignItems="center" direction="row" gap={2}>
        <Icon color="green.600" name="Image" size="sm" />
        <Strong textStyle="xs">image path:</Strong>
        <Em textStyle="xs">/{images?.assetsPath}</Em>
        <Text textStyle="xs">
          <Strong>image count:</Strong> {images?.assetCount}
        </Text>
      </Stack>
      <Stack alignItems="center" direction="row" gap={2}>
        <Icon color="green.600" name="File" size="sm" />
        <Strong textStyle="xs">files path:</Strong>
        <Em textStyle="xs">/{files?.assetsPath}</Em>
        <Text textStyle="xs">
          <Strong>file count:</Strong> {files?.assetCount}
        </Text>
      </Stack>
    </Stack>
  )
}
