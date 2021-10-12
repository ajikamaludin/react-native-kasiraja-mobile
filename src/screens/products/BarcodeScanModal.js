import React, { useState, useEffect } from 'react'
import { StyleSheet, Linking, ToastAndroid } from 'react-native'
import { Text, View, Button, Center, Modal } from 'native-base'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function BarcodeScanScreen({ isOpen, setOpen, onScanned }) {
  const [hasPermission, setHasPermission] = useState(null)

  const handlePermissionRequest = () => {
    navigation.pop()
    Linking.openSettings()
  }

  const checkPermission =  async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  useEffect(() => {
    checkPermission()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
    setOpen(false)
    onScanned(data)
    ToastAndroid.show('Kode berhasil discan', ToastAndroid.SHORT)
  }

  if (hasPermission === null) {
    return <Center flex={1}>Requesting for camera permission</Center>
  }
  if (hasPermission === false) {
    return (
      <Center flex={1}>
        <Text>No access to camera, please allow in settings</Text>
        <Button mt={10} onPress={() => handlePermissionRequest()}>
          Open Settings
        </Button>
      </Center>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Modal.Body minHeight="450px">
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          >
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </BarCodeScanner>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

const opacity = 'rgba(0, 0, 0, .6)'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
})