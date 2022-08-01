import ImageClassification from './ImageClassification'


type PAGE = () => JSX.Element

export interface iPAGES {
  [key : string] : PAGE,
  ImageClassification : PAGE
}


const PAGES : iPAGES = {
  ImageClassification
}


export default PAGES