import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'


interface iRESULT_PROPS {
  result : string,
  style ?: StyleProp<TextStyle>
}


function Result ({ result, style } : iRESULT_PROPS) {
  return (
    <Text
      style={[{
        color: '#fff', fontSize: 18, lineHeight: 26,
        textAlign: 'center', marginTop: 20, marginBottom: 40
      }, style]}
    >
      { result }
    </Text>
  )
}


export default Result