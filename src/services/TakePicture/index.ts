import { launchCamera, CameraOptions, Asset } from 'react-native-image-picker'

function TakePicture(setFileUri: React.Dispatch<React.SetStateAction<string>>) {
  const options: CameraOptions = {
    mediaType: 'photo',
    saveToPhotos: true,
    cameraType: 'back',
  }

  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
      return
    }

    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage)
      return
    }

    const asset: Asset | undefined = response.assets?.[0]

    if (asset?.uri) {
      setFileUri(asset.uri)
    } else {
      console.warn('No image URI returned')
    }
  })
}

export default TakePicture
