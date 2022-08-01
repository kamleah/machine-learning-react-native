import React from 'react'
import { Image, View } from 'react-native'


interface iIMAGE_PREVIEW {
  uri : string
}


function ImagePreview ({ uri } : iIMAGE_PREVIEW) {
  return (
    <View
      style={{
        width: '90%', height: '50%', maxWidth: 600,
        minHeight: 300, alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
      }}
    >
      { uri && (
        <Image
          source={{ uri }}
          style={{
            resizeMode: 'center', width: '100%', height: '100%'
          }}
        />
      ) }
    </View>
  )
}


export default ImagePreview