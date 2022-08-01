import { launchCamera } from 'react-native-image-picker'


function TakePicture (setFileUri : React.Dispatch<React.SetStateAction<string>>) {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }
  // @ts-ignore
  launchCamera(options, response => {
    if (response.didCancel) {
      return
    }
    // @ts-ignore
    setFileUri(response.assets[0].uri)
  })
}


export default TakePicture