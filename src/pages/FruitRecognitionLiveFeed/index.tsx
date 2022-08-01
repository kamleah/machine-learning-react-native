import React, { useState } from 'react'
import { RNCamera, TrackedTextFeature } from 'react-native-camera-tflite'
import _ from 'lodash'

import { iPAGES_PROPS } from '~/pages'

import { Translate } from '~/services'

import { Button, ButtonContainer, Result, Title } from '~/components'

import OUTPUTS from './outputs.json'


let _currentInstant = 0


function FruitRecognitionLiveFeed ({ navigate } : iPAGES_PROPS) {
  const [output, setOutput] = useState('')

  const modelParams = {
    file: 'models/fruit_recognitio_live_feed.tflite',
    inputDimX: 224,
    inputDimY: 224,
    outputDim: 1001,
    freqms: 0
  }


  function processOutput ({ data } : { data : { textBlocks : TrackedTextFeature[] }}) {
    // @ts-ignore
    const probs = _.map(data, item => _.round(item / 255.0, 0.02))
    // @ts-ignore
    const orderedData = _.chain(data).zip(OUTPUTS).orderBy(0, 'desc').map(item => [_.round(item[0] / 255.0, 2), item[1]]).value()
    const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${(item[0] * 100).toFixed(0)}%`).join('\n').value()
    const time = Date.now() - (_currentInstant || Date.now())
    const output = `Guesses:\n\n${outputData}\n\nTime: ${time} ms`
    setOutput(output)
    _currentInstant = Date.now()
  }


  function NotAuthorizedView () {
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


  return (
    <RNCamera
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      permissionDialogTitle={Translate('permissionCamera')}
      permissionDialogMessage={Translate('needPermissionCamera')}
      // @ts-ignore
      onModelProcessed={processOutput}
      // @ts-ignore
      modelParams={modelParams}
      notAuthorizedView={<NotAuthorizedView />}
      style={{
        width: '100%', height: '100%', alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Result result={output} />
    </RNCamera>
  )
}


export default FruitRecognitionLiveFeed