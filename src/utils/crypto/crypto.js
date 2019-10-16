import CryptoJS from 'crypto-js'
const DEFAULT_KEY = 'NloyIURAZUh2bHNpNWpQNQ=='// 6Z2!D@eHvlsi5jP5

export function base64encode (str) {
  var words = CryptoJS.enc.Utf8.parse(str) // WordArray object
  return CryptoJS.enc.Base64.stringify(words)
}

export function base64decode (str) {
  var words = CryptoJS.enc.Base64.parse(str)
  return CryptoJS.enc.Utf8.stringify(words)
}

/**
 * Crypto utils
 */
export default class Crypto {
  constructor (key) {
    this.key = base64decode(key || DEFAULT_KEY)
  }

  sha1encrypt (str) {
    const hash = CryptoJS.SHA1(str)
    return CryptoJS.enc.Hex.stringify(hash)
  }

  aesEncrypt (str) {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const srcs = CryptoJS.enc.Utf8.parse(str)
    const options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
    return CryptoJS.AES.encrypt(srcs, key, options).toString()
  }

  aesDecrypt (str) {
    const key = CryptoJS.enc.Utf8.parse(this.key)
    const options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
    const decrypt = CryptoJS.AES.decrypt(str, key, options)
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
