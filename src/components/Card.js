import React from 'react'
import {
  VStack,
  HStack,
  Avatar,
  Image,
  Text,
  NativeBaseProvider,
  AspectRatio,
  Center,
  Box,
  Stack,
  Heading,
} from 'native-base'

export default function Card({ children, ...restsProps }) {
  return (
    <Center flex={1}>
      <Box bg="white" shadow={2} rounded="lg" maxWidth="90%" m={2} p={5} {...restsProps}>
        {children}
      </Box>
    </Center>
  )
}
