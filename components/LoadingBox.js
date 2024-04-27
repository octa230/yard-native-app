import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingBox(props) {
  const {size, color} = props
  return <ActivityIndicator 
    animating={true} 
    size={size || "large"} 
    color={color || 'green' }
    style={{ justifyContent: 'center', alignItems: 'center' }}
    />
}
