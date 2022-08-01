import { NativeModules, Platform } from 'react-native'
import I18n from 'i18n-js'

import { TRANSLATE } from './types'

import en from './en-US'
import es from './es-ES'
import pt from './pt-BR'


interface NORMALIZE_TRANSLATE {
  [key : string] : string,
  en : string,
  en_US : string,
  es : string,
  es_ES : string,
  pt : string,
  pt_BR : string,
  pt_PT : string
}

const normalizeTranslate : NORMALIZE_TRANSLATE = {
  en: 'en_US',
  en_US: 'en_US',
  es: 'es_ES',
  es_ES: 'es_ES',
  pt: 'pt_BR',
  pt_BR: 'pt_BR',
  pt_PT: 'pt_BR'
}


const getLanguageByDevice = () : keyof NORMALIZE_TRANSLATE | string => {
  return Platform.OS == 'android'
    ? NativeModules.I18nManager.localeIdentifier
    : NativeModules.SettingsManager.settings.AppleLocale
}


I18n.translations = {
  en_US: en,
  es_ES: es,
  pt_BR: pt
}


const setLanguageToI18n = () => {
  const translateNormalize = normalizeTranslate[getLanguageByDevice()]
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize)

  iHaveThisLanguage
    ? I18n.locale = translateNormalize
    : I18n.defaultLocale = 'en_US'
}


setLanguageToI18n()


// @ts-ignore
const Translate = (key : keyof TRANSLATE) : string => I18n.t(key)


export default Translate