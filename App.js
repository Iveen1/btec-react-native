import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';
import MainStack from './navigate';

export default function App() {
  return (
    <MainStack />
    // <View style={styles.container}>
      /* <Text>Open up [eqApp.js to start working on your app!</Text> */
      // <Button title={'Уровни'}/>
      // <StatusBar style="auto" />
    // </View>
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
