import React from 'react'
import { StatusBar } from 'react-native'

import Home from '~/pages/Home'


function Index () {
  return (
    <>
    <StatusBar backgroundColor='#301934' barStyle='dark-content' />
    <Home />
    </>
  )
}


export default Index