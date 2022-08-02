import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'


export type POSE = {
  score : number,
  keypoints : {
    [key : number] : {
      x : number,
      y : number,
      part : string,
      score : number
    }
  }
}

interface iPOSE_ESTIMATION_RECOGNITION_PROPS {
  recognition : POSE[]
}


function PoseEstimationRecognition ({ recognition } : iPOSE_ESTIMATION_RECOGNITION_PROPS) {
  const { width, height } = useWindowDimensions()
  const isPortrait = height >= width


  return recognition.map(response => {
    return Object.values(response.keypoints).map(({ x, y, part }, key) => {
      let left, top
      top = y * 100 + '%'
      if (isPortrait) {
        left = x * 90 + '%'
      }
      else {
        left = x * 93 + '%'
      }


      return (
        <View
          key={key}
          style={{
            position: 'absolute', left, top
          }}
        >
          <Text
            style={{
              color: '#ff033e', fontSize: 14, fontWeight: 'bold'
            }}
          >
            { '.' + part }
          </Text>
        </View>
      )
    })
  })
}


export default PoseEstimationRecognition