import React from 'react'
import { Center, Box } from 'native-base'

export default function Card({ children, ...restsProps }) {
  return (
    <Center flex={1}>
      <Box bg="white" shadow={2} rounded="lg" maxWidth="90%" m={2} p={5} {...restsProps}>
        {children}
      </Box>
    </Center>
  )
}
