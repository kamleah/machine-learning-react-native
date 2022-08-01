import React, { useState, useEffect, useRef } from 'react'
import { Animated, Easing, ScrollView } from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'

import PAGES, { iPAGES } from '~/pages'

import { Background, Button, ButtonContainer, Title } from '~/components'


type PAGE = keyof iPAGES | null
export type NAVIGATE = (to : PAGE) => void


function Home () {
  const mountAnimation = useRef(new Animated.Value(0)).current

  const [page, setPage] = useState<PAGE>('Home')

  useBackHandler(handleBackPress)


  function handleBackPress () {
    if (page != 'Home') {
      navigate('Home')
      return true
    }
    return false
  }


  function navigate (to : PAGE) {
    revertMountAnimations(to)
  }


  function PickPage () {
    return (
      <>
      <Title text='testTflite' />
      <Title text='chooseFunction' />

      <ButtonContainer style={{ width: '70%', maxWidth: 400 }}>
        { Object.keys(PAGES).map(page => (
          <Button key={page} onPress={() => navigate(page)} text={page} />
        )) }
      </ButtonContainer>
      </>
    )
  }


  function HandlePage () {
    if (page) {
      if (PAGES[page]) {
        return PAGES[page]({ navigate })
      }
      else {
        return PickPage()
      }
    }
    return null
  }


  function runMountAnimations () {
    Animated.timing(mountAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }


  function revertMountAnimations (page : PAGE) {
    Animated.timing(mountAnimation, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => {
      setPage(page)
    })
  }


  useEffect(() => {
    if (page) {
      runMountAnimations()
    }
  }, [page])


  return (
    <Background>
      <Animated.View
        style={{
          flex: 1, alignItems: 'center', justifyContent: 'center',
          left: mountAnimation.interpolate({
            inputRange: [0, 1], outputRange: ['10%', '0%']
          }),
          opacity: mountAnimation.interpolate({
            inputRange: [0, 1], outputRange: [0, 1]
          })
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            minWidth: '100%', minHeight: '100%', alignItems: 'center',
            justifyContent: 'center', paddingVertical: 40
          }}
        >
          { /* @ts-ignore */ }
          <HandlePage />
        </ScrollView>
      </Animated.View>
    </Background>
  )
}


export default Home