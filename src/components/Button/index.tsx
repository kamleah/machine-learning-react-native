import React from 'react'
import {
  GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle
} from 'react-native'

import { Translate } from '~/services'

import { TRANSLATE } from '~/services/Translate/types'


interface iBUTTON_PROPS {
  onPress : (event : GestureResponderEvent) => void,
  style ?: StyleProp<ViewStyle>,
  text : keyof TRANSLATE
}


function Button ({ onPress, text, style } : iBUTTON_PROPS) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View
        style={[{
          minWidth: '48%', backgroundColor: '#ff033e', borderRadius: 3,
          paddingVertical: 16, paddingHorizontal: 48, marginBottom: 20
        }, style]}
      >
        <Text
          style={{
            color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          { Translate(text) }
        </Text>
      </View>
    </TouchableOpacity>
  )
}


export default Button