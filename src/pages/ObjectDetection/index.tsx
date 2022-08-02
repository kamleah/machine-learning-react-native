import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
// @ts-ignore
import Tflite from 'tflite-react-native'

import { ChooseFile, TakePicture, Translate } from '~/services'

import { Button, ButtonContainer, ImagePreview, Recognition, Title } from '~/components'

import { RECOGNITION } from '~/components/Recognition'


type MODELS = {
  ssdMobileNet : () => any,
  yolo : () => any
}


const tflite = new Tflite()


function ObjectDetection () {
  const [chosenModel, setChosenModel] = useState<keyof MODELS | null>(null)
  const [fileUri, setFileUri] = useState('')
  const [recognition, setRecognition] = useState<RECOGNITION[]>([])


  const loadModel : MODELS = {
    ssdMobileNet: () => tflite.loadModel({
        model: 'models/ssd_mobilenet.tflite',
        labels: 'models/ssd_mobilenet.txt',
        numThreads: 1
      },
      (error : string) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorLoadModel'))
        }
      }),
    yolo: () => tflite.loadModel({
        model: 'models/yolov2_tiny.tflite',
        labels: 'models/yolov2_tiny.txt',
        numThreads: 1
      },
      (error : string) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorLoadModel'))
        }
      })
  }


  const performObjectDetection : MODELS = {
    ssdMobileNet: () => tflite.detectObjectOnImage({
        path: fileUri,
        model: 'SSDMobileNet',
        imageMean: 127.5,
        imageStd: 127.5,
        threshold: 0.3,
        numResultsPerClass: 2
      },
      (error : string, response : RECOGNITION[]) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorProcessingTflite'))
          return
        }
        setRecognition(response)
      }),
    yolo: () => tflite.detectObjectOnImage({
        path: fileUri,
        model: 'YOLO',
        imageMean: 0.0,
        imageStd: 255.0,
        threshold: 0.3,
        numResultsPerClass: 2
      },
      (error : string, response : RECOGNITION[]) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorProcessingTflite'))
          return
        }
        setRecognition(response)
      })
  }


  function ChooseModel () {
    return (
      <>
      <Title text='chooseModel' />
      <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
        <Button
          onPress={() => setChosenModel('ssdMobileNet')}
          text='SSD MobileNet'
          translate={false}
        />
        <Button
          onPress={() => setChosenModel('yolo')}
          text='Tiny YOLO'
          translate={false}
        />
      </ButtonContainer>
      </>
    )
  }


  useEffect(() => {
    if (chosenModel && fileUri) {
      performObjectDetection[chosenModel]()
    }
  }, [chosenModel, fileUri])


  useEffect(() => {
    if (chosenModel) {
      loadModel[chosenModel]()
    }

    return () => {
      if (chosenModel) {
        tflite.close()
      }
    }
  }, [chosenModel])


  if (!chosenModel) return (
    <ChooseModel />
  )


  return (
    <>
    <Title text='pickImagesCG' />
    <ImagePreview uri={fileUri}>
      { /* @ts-ignore */ recognition && (
        <Recognition recognition={recognition} />
      ) }
    </ImagePreview>
    <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
      <Button onPress={() => ChooseFile(setFileUri)} text='chooseFile' />
      <Button onPress={() => TakePicture(setFileUri)} text='takePicture' />
    </ButtonContainer>
    </>
  )
}


export default ObjectDetection