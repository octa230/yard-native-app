import React from 'react'
import { Image } from 'react-native'

const ImagePlaceHolder = (props) => {
    const {source} = props
    const imageSource = source ? { uri: source } : { uri: "https://fakeimg.pl/600x400" };
  return <Image 
  source={imageSource}
  style={{height: 150, width: 200, borderRadius: 8, margin: 12, objectFit: "contain"}}
 />
}

export default ImagePlaceHolder
