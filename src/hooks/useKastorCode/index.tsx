import React, { useState, useEffect, useRef } from 'react'
import { Animated, Easing, Modal, View } from 'react-native'

import LOGO from '~/assets/images/kastorCodeLogo.png'

import NAME from '~/assets/images/kastorCodeName.png'


function useKastorCode () {
  const animation = useRef(new Animated.Value(0)).current

  const [show, setShow] = useState(false)


  function runAnimations () {
    setShow(true)
  }


  function runAnimationsNow () {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false
    })
    .start(() => {
      setShow(false)
      animation.setValue(0)
    })
  }


  function Component () {
    return (
      <Modal transparent={true}>
        <Animated.View
          style={{
            flex: 1, alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.33)',
            opacity: animation.interpolate({
              inputRange: [0, 0.3, 0.7, 1], outputRange: [0, 1, 1, 0]
            })
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Animated.Image
              source={LOGO}
              // @ts-ignore
              tintColor='#301934'
              style={{
                resizeMode: 'contain',
                height: animation.interpolate({
                  inputRange: [0, 1], outputRange: [216 / 2, 216]
                })
              }}
            />

            <Animated.Image
              source={LOGO}
              // @ts-ignore
              tintColor='#ff033e'
              style={{
                position: 'absolute', resizeMode: 'contain',
                height: animation.interpolate({
                  inputRange: [0, 1], outputRange: [216 / 2, 216]
                })
              }}
            />
          </View>

          <View>
            <Animated.Image
              source={NAME}
              // @ts-ignore
              tintColor='#301934'
              style={{
                resizeMode: 'contain',
                height: animation.interpolate({
                  inputRange: [0, 1], outputRange: [33 / 2, 33]
                })
              }}
            />

            <Animated.Image
              source={NAME}
              // @ts-ignore
              tintColor='#ff033e'
              style={{
                position: 'absolute', resizeMode: 'contain',
                height: animation.interpolate({
                  inputRange: [0, 1], outputRange: [33 / 2, 33]
                })
              }}
            />
          </View>
        </Animated.View>
      </Modal>
    )
  }


  useEffect(() => {
    if (show) {
      runAnimationsNow()
    }
  }, [show])


  return {
    Component,
    runAnimations,
    show
  }
}


export default useKastorCode