import { TrackedTextFeature } from 'react-native-camera-tflite'
import _ from 'lodash'


let _currentInstant = Date.now()


function ProcessOutputLiveFeed (
  { data } : { data : { textBlocks : TrackedTextFeature[] }},
  outputs : string[],
  setOutput : React.Dispatch<React.SetStateAction<string>>
) {
  // @ts-ignore
  const probs = _.map(data, item => _.round(item / 255.0, 0.02))
  // @ts-ignore
  const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0] / 255.0, 2), item[1]]).value()
  const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${(item[0] * 100).toFixed(0)}%`).join('\n').value()
  const time = Date.now() - _currentInstant
  const output = `Guesses:\n\n${outputData}\n\nTime: ${time} ms`
  setOutput(output)
  _currentInstant = Date.now()
}


export default ProcessOutputLiveFeed