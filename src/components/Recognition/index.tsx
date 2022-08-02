import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'


export type RECOGNITION = {
  detectedClass : string,
  confidenceInClass : number,
  rect : {
    x : number,
    y : number,
    w : number,
    h : number
  }
}

interface iRECOGNITION_PROPS {
  recognition : RECOGNITION[]
}


function Recognition ({ recognition } : iRECOGNITION_PROPS) {
  const { width, height } = useWindowDimensions()
  const isPortrait = height >= width


  return recognition.map((response, key) => {
    const { detectedClass } = response
    const { x, y, w, h } = response.rect
    let left, top, width, height
    left = x * 97 + '%'
    width = w * 100 + '%'
    if (isPortrait) {
      top = y * 94 + '%'
      height = h * 62 + '%'
    }
    else {
      top = y * 100 + '%'
      height = h * 100 + '%'
    }


    return (
      <View
        key={key}
        style={{
          position: 'absolute', borderColor: '#ff033e', borderWidth: 2,
          left, top, width, height
        }}
      >
        <Text
          style={{
            color: '#fff', fontSize: 14, fontWeight: 'bold'
          }}
        >
          { detectedClass }
        </Text>
      </View>
    )
  })
}


export default Recognition