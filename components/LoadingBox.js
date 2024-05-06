import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

export default function LoadingBox(props) {
  const { size, color } = props;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <ActivityIndicator 
        animating={true} 
        size={size || 'large'} 
        color={color || 'green'}
      />
    </View>
  );
}