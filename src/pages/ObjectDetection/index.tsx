import React, { useState, useEffect } from 'react'
import { Alert, PermissionsAndroid } from 'react-native'
// @ts-ignore
import Tflite from 'tflite-react-native'

import { ChooseFile, TakePicture, Translate } from '~/services'

import {
  Button, ButtonContainer, ImagePreview, ObjectDetectionRecognition, Title
} from '~/components'

import { OBJECT_DETECTED } from '~/components/ObjectDetectionRecognition'


type MODELS = {
  ssdMobileNet: () => any,
  yolo: () => any
}


const tflite = new Tflite()


function ObjectDetection() {
  const [chosenModel, setChosenModel] = useState<keyof MODELS | null>(null)
  const [fileUri, setFileUri] = useState('')
  const [recognition, setRecognition] = useState<OBJECT_DETECTED[] | null>(null)


  const loadModel: MODELS = {
    ssdMobileNet: () => tflite.loadModel({
      model: 'models/ssd_mobilenet.tflite',
      labels: 'models/ssd_mobilenet.txt',
      numThreads: 1
    },
      (error: string) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorLoadModel'))
        }
      }),
    yolo: () => tflite.loadModel({
      model: 'models/yolov2_tiny.tflite',
      labels: 'models/yolov2_tiny.txt',
      numThreads: 1
    },
      (error: string) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorLoadModel'))
        }
      })
  }


  const performObjectDetection: MODELS = {
    ssdMobileNet: () => tflite.detectObjectOnImage({
      path: fileUri,
      model: 'SSDMobileNet',
      imageMean: 127.5,
      imageStd: 127.5,
      threshold: 0.3,
      numResultsPerClass: 2
    },
      (error: string, response: OBJECT_DETECTED[]) => {
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
      (error: string, response: OBJECT_DETECTED[]) => {
        if (error) {
          Alert.alert(Translate('error'), Translate('errorProcessingTflite'))
          return
        }
        setRecognition(response)
      })
  }


  function ChooseModel() {
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
  };

  const handleTakePictureWithPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      TakePicture(setFileUri)
    } else {
      Alert.alert('Permission Denied', 'Camera access is required to take a picture.')
    }
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
          <ObjectDetectionRecognition recognition={recognition} />
        )}
      </ImagePreview>
      <ButtonContainer style={{ width: '60%', maxWidth: 300 }}>
        <Button onPress={() => ChooseFile(setFileUri)} text='chooseFile' />
        <Button onPress={() => handleTakePictureWithPermission()} text='takePicture' />
      </ButtonContainer>
    </>
  )
}


export default ObjectDetection