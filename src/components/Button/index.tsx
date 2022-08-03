import React from 'react'
import {
  GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle
} from 'react-native'

import { Translate } from '~/services'

import { TRANSLATE } from '~/services/Translate/types'


interface iBUTTON_PROPS {
  onPress : (event : GestureResponderEvent) => void,
  style ?: StyleProp<ViewStyle>,
  text : keyof TRANSLATE,
  translate ?: boolean
}


function Button ({ onPress, text, style, translate = true } : iBUTTON_PROPS) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View
        style={[{
          width: '100%', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#ff033e', borderRadius: 3, paddingVertical: 16,
          marginBottom: 20
        }, style]}
      >
        <Text
          style={{
            color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          { translate ? Translate(text) : text }
        </Text>
      </View>
    </TouchableOpacity>
  )
}


export default Button