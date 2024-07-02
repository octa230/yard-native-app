import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const SafeScreen = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    //backgroundColor: 'white',
    //paddingVertical: 1, // Adjust padding as needed
    marginVertical: 12,
  },
});

export default SafeScreen;