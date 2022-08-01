import React from 'react'

import { NAVIGATE } from '~/pages/Home'

import { Button, ButtonContainer, Title } from '~/components'


interface iCAMERA_NOT_AUTHORIZED_PROPS {
  navigate : NAVIGATE
}


function CameraNotAuthorized ({ navigate } : iCAMERA_NOT_AUTHORIZED_PROPS) {
  return (
    <>
    <Title text='error' />
    <Title text='needPermissionCamera' />
    <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
      <Button onPress={() => navigate('Home')} text='Home' />
    </ButtonContainer>
    </>
  )
}


export default CameraNotAuthorized