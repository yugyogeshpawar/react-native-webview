import React from 'react';
import {StyleSheet, View} from 'react-native';
// import { StatusBar } from "expo-status-bar";
import WebViewPage from './Webview';

export default function App() {
  return (
    <View style={styles.container}>
      <WebViewPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
