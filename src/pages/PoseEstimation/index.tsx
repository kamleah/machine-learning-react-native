import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
// @ts-ignore
import Tflite from 'tflite-react-native'

import { ChooseFile, TakePicture, Translate } from '~/services'

import {
  Button, ButtonContainer, ImagePreview, PoseEstimationRecognition, Title
} from '~/components'

import { POSE } from '~/components/PoseEstimationRecognition'


const tflite = new Tflite()


function PoseEstimation () {
  const [fileUri, setFileUri] = useState('')
  const [recognition, setRecognition] = useState<POSE[] | null>(null)


  function loadModel () {
    tflite.loadModel({
      model: 'models/posenet.tflite',
      numThreads: 1
    },
    (error : string) => {
      if (error) {
        Alert.alert(Translate('error'), Translate('errorLoadModel'))
      }
    })
  }


  function performPoseEstimation () {
    tflite.runPoseNetOnImage({
      path: fileUri,
      imageMean: 127.5,
      imageStd: 127.5,
      numResults: 3,
      threshold: 0.8,
      nmsRadius: 20
    },
    (error : string, response : POSE[]) => {
      if (error) {
        Alert.alert(Translate('error'), Translate('errorProcessingTflite'))
        return
      }
      setRecognition(response)
    })
  }


  useEffect(() => {
    if (fileUri) {
      performPoseEstimation()
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
      { /* @ts-ignore */ recognition && (
        <PoseEstimationRecognition recognition={recognition} />
      ) }
    </ImagePreview>
    <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
      <Button onPress={() => ChooseFile(setFileUri)} text='chooseFile' />
      <Button onPress={() => TakePicture(setFileUri)} text='takePicture' />
    </ButtonContainer>
    </>
  )
}


export default PoseEstimation