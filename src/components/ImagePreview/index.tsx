import React from 'react'
import { Image, StyleProp, View, ViewStyle } from 'react-native'


interface iIMAGE_PREVIEW {
  children ?: JSX.Element | JSX.Element[] | null,
  style ?: StyleProp<ViewStyle>,
  uri : string
}


function ImagePreview ({ children, style, uri } : iIMAGE_PREVIEW) {
  return (
    <View
      style={[{
        width: '90%', height: '50%', maxWidth: 600,
        minHeight: 350, alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.2)'
      }, style]}
    >
      { uri && (
        <Image
          source={{ uri }}
          style={{
            resizeMode: 'contain', width: '96%', height: '96%'
          }}
        />
      ) }

      { children && children }
    </View>
  )
}


export default ImagePreview