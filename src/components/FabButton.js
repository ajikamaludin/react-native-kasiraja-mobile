import React from 'react'
import { Box, Button, HStack, Icon, Text } from 'native-base'

export default function FabButton({ onPress, icon, label = null, ...restProps}) {
  return (
    <Box position="absolute" bottom="4" right="4" shadow="7" rounded="full">
      <Button onPress={onPress} rounded="full" px="4" pt="1" {...restProps}>
        <HStack>
          <Icon color="white" as={icon} size="sm" mt="1"/>
          {label && (
            <Text color="white" ml={2}>
              {label}
            </Text>
          )}
        </HStack>
      </Button>
    </Box>
  )
}