import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingBox() {
  return <ActivityIndicator animating={true} 
    size="large" color='green' 
    style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
}
