import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'

import { Translate } from '~/services'

import { TRANSLATE } from '~/services/Translate/types'


interface iTITLE_PROPS {
  text : keyof TRANSLATE,
  style ?: StyleProp<TextStyle>
}


function Title ({ text, style } : iTITLE_PROPS) {
  return (
    <Text
      style={[{
        color: '#fff', fontSize: 20, textAlign: 'center',
        marginBottom: 20
      }, style]}
    >
      { Translate(text) }
    </Text>
  )
}


export default Title