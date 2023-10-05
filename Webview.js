/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Linking,
} from 'react-native';
import {WebView} from 'react-native-webview';

const Webview = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  const handleBackButton = () => {
    if (webviewRef.current && canGoBack) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  };

  const onNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
  };

  const handleShouldStartLoadWithRequest = request => {
    const {url} = request;
    if (!url.startsWith('https://blazingmalls.com/')) {
      Linking.openURL(url);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{uri: 'https://blazingmalls.com/'}}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        onNavigationStateChange={onNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Webview;
