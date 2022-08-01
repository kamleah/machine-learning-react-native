import React, { useState } from 'react'
import { RNCamera } from 'react-native-camera-tflite'

import { iPAGES_PROPS } from '~/pages'

import { ProcessOutputLiveFeed, Translate } from '~/services'

import { CameraNotAuthorized, Result } from '~/components'

import OUTPUTS from './outputs.json'


function ImageClassificationLiveFeed ({ navigate } : iPAGES_PROPS) {
  const [output, setOutput] = useState('')

  const modelParams = {
    file: 'models/mobilenet_v1_1.0_224_quant.tflite',
    inputDimX: 224,
    inputDimY: 224,
    outputDim: 1001,
    freqms: 0
  }


  return (
    <RNCamera
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      permissionDialogTitle={Translate('permissionCamera')}
      permissionDialogMessage={Translate('needPermissionCamera')}
      // @ts-ignore
      onModelProcessed={data => ProcessOutputLiveFeed(data, OUTPUTS, setOutput)}
      // @ts-ignore
      modelParams={modelParams}
      notAuthorizedView={<CameraNotAuthorized navigate={navigate} />}
      style={{
        width: '100%', height: '100%', alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Result result={output} />
    </RNCamera>
  )
}


export default ImageClassificationLiveFeed