import FruitRecognition from './FruitRecognition'
import FruitRecognitionLiveFeed from './FruitRecognitionLiveFeed'
import { NAVIGATE } from './Home'
import ImageClassification from './ImageClassification'


export interface iPAGES_PROPS {
  navigate : NAVIGATE
}

type PAGE = ({ navigate } : iPAGES_PROPS) => JSX.Element

export interface iPAGES {
  [key : string] : PAGE,
  FruitRecognition : PAGE,
  FruitRecognitionLiveFeed : PAGE,
  ImageClassification : PAGE
}


const PAGES : iPAGES = {
  FruitRecognition,
  FruitRecognitionLiveFeed,
  ImageClassification
}


export default PAGES