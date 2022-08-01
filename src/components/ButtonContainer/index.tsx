import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'


interface iBUTTON_CONTAINER_PROPS {
  children : JSX.Element | JSX.Element[],
  style ?: StyleProp<ViewStyle>
}


function ButtonContainer ({ children, style } : iBUTTON_CONTAINER_PROPS) {
  return (
    <View
      style={[{
        width: '100%', alignSelf: 'center', justifyContent: 'center'
      }, style]}
    >
      { children }
    </View>
  )
}


export default ButtonContainer