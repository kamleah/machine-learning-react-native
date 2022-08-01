import FruitRecognition from './FruitRecognition'
import ImageClassification from './ImageClassification'


type PAGE = () => JSX.Element

export interface iPAGES {
  [key : string] : PAGE,
  FruitRecognition : PAGE,
  ImageClassification : PAGE
}


const PAGES : iPAGES = {
  FruitRecognition,
  ImageClassification
}


export default PAGES