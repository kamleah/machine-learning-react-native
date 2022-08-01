import { launchImageLibrary } from 'react-native-image-picker'

import { Translate } from '~/services'


function ChooseFile (setFileUri : React.Dispatch<React.SetStateAction<string>>) {
  const options = {
    title: Translate('selectImage'),
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }
  // @ts-ignore
  launchImageLibrary(options, response => {
    if (response.didCancel) {
      return
    }
    // @ts-ignore
    setFileUri(response.assets[0].uri)
  })
}


export default ChooseFile