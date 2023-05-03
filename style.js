'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    containerRowFlex: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
    },
    questionContainer: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20
    },
    basicText: {
        fontSize: 15
    },
    boldText: {
        fontSize: 25,
        textAlign: 'center'
    },
    headerText: {
        fontSize: 40
    },
    levelsButton: {
        width: 200,
        height: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20
    },
    input: {
        borderColor: "gray",
        width: "70%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
      },
});
  