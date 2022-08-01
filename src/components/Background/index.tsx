import React from 'react'
import { SafeAreaView } from 'react-native'


interface iBACKGROUND_PROPS {
  children : JSX.Element | JSX.Element[]
}


function Background ({ children } : iBACKGROUND_PROPS) {
  return (
    <SafeAreaView
      style={{
        flex: 1, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#301934'
      }}
    >
      { children }
    </SafeAreaView>
  )
}


export default Background