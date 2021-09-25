import React  from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, VStack, Text } from 'native-base'
import { formatIDR } from '../utils'

export default function ItemProduct(props) {
  const { item, onPress } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Box rounded="5" p="2" borderWidth={1} borderColor="trueGray.400" mx="1" my="0.5">
        <HStack justifyContent="space-between">
          <VStack>
            <Text color="black" fontWeight="bold" fontSize="md">
              {item?.name}
            </Text>
            <Text color="black"> - </Text>
          </VStack>
          <Text color="black" fontSize="lg">
            {formatIDR(item?.price)}
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}