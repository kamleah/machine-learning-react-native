import FruitRecognition from './FruitRecognition'
import FruitRecognitionLiveFeed from './FruitRecognitionLiveFeed'
import { NAVIGATE } from './Home'
import ImageClassification from './ImageClassification'
import ImageClassificationLiveFeed from './ImageClassificationLiveFeed'
import ImageSegmentation from './ImageSegmentation'
import ObjectDetection from './ObjectDetection'
import PoseEstimation from './PoseEstimation'


export interface iPAGES_PROPS {
  navigate : NAVIGATE
}

type PAGE = ({ navigate } : iPAGES_PROPS) => JSX.Element

export interface iPAGES {
  [key : string] : PAGE,
  FruitRecognition : PAGE,
  FruitRecognitionLiveFeed : PAGE,
  ImageClassification : PAGE,
  ImageClassificationLiveFeed : PAGE,
  ImageSegmentation : PAGE,
  ObjectDetection : PAGE,
  PoseEstimation : PAGE
}


const PAGES : iPAGES = {
  FruitRecognition,
  FruitRecognitionLiveFeed,
  ImageClassification,
  ImageClassificationLiveFeed,
  ImageSegmentation,
  ObjectDetection,
  PoseEstimation
}


export default PAGES