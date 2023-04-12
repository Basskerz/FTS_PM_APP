import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View>
        <Text style={styles.textstyle}>No internet connection</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: 'https://www.forthtrack.com/FTS_PM/'}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textstyle: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default App;
