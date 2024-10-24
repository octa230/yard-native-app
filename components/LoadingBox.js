import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingBox(props) {
  const { size, color } = props;
  return (

      <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        animating={true} 
        size={size || 'large'} 
        color={color || 'white'}
      />
  );
}