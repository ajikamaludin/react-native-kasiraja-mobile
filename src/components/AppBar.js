import React from 'react'
import {
  HStack,
  IconButton,
  Icon,
  Text,
  Box,
  StatusBar,
  View,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '../contexts/AppContext'
import { Dimensions } from 'react-native'

export default function AppBar(props) {
  const { drawer, navigation, options } = props

  return (
    <View>
      <StatusBar />
      <Box backgroundColor="primary.500" />
      <HStack
        bg="primary.500"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <Icon
                size="sm"
                as={<MaterialIcons name="menu" />}
                color="white"
              />
            }
            onPress={() => drawer.current.openDrawer()}
          />
          <Text color="white" fontSize={20} fontWeight="bold">
            {options?.title}
          </Text>
        </HStack>
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                as={<MaterialIcons name="more-vert" />}
                size="sm"
                color="white"
              />
            }
          />
        </HStack>
      </HStack>
    </View>
  )
}
