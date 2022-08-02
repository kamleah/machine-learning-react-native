import React, { useState, useEffect } from 'react'
import { Alert, Image } from 'react-native'
// @ts-ignore
import Tflite from 'tflite-react-native'

import { ChooseFile, TakePicture, Translate } from '~/services'

import { Button, ButtonContainer, ImagePreview, Title } from '~/components'


const tflite = new Tflite()


function ImageSegmentation () {
  const [fileUri, setFileUri] = useState('')
  const [recognitions, setRecognitions] = useState('')


  function loadModel () {
    tflite.loadModel({
      model: 'models/deeplabv3_257_mv_gpu.tflite',
      labels: 'models/deeplabv3_257_mv_gpu.txt',
      numThreads: 1
    },
    (error : string) => {
      if (error) {
        Alert.alert(Translate('error'), Translate('errorLoadModel'))
      }
    })
  }


  function performImageSegmentation () {
    tflite.runSegmentationOnImage({
      path: fileUri,
      imageMean: 127.5,
      imageStd: 127.5,
      outputType: 'png'
    },
    (error : string, response : string) => {
      if (error) {
        Alert.alert(Translate('error'), Translate('errorProcessingTflite'))
        return
      }
      setRecognitions(response)
    })
  }


  useEffect(() => {
    if (fileUri) {
      performImageSegmentation()
    }
  }, [fileUri])


  useEffect(() => {
    loadModel()

    return () => {
      tflite.close()
    }
  }, [])


  return (
    <>
    <Title text='pickImagesCG' />
    <ImagePreview uri={fileUri}>
      { /* @ts-ignore */ }
      { recognitions && (
        <Image
          source={{ uri: 'data:image/png;base64,' + recognitions }}
          style={{
            resizeMode: 'contain', width: '96%', height: '96%',
            position: 'absolute', opacity: 0.5
          }}
        />
      ) }
    </ImagePreview>
    <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
      <Button onPress={() => ChooseFile(setFileUri)} text='chooseFile' />
      <Button onPress={() => TakePicture(setFileUri)} text='takePicture' />
    </ButtonContainer>
    </>
  )
}


export default ImageSegmentation