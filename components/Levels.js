import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LevelsData from '../levels.json';
import Styles from '../style';

export default function Levels( { navigation } ) {
    const loadLevel = (level) => {
        navigation.navigate('Level', { level: level });
    }

    return (
        <View style={Styles.containerRowFlex}>
        {LevelsData.map((el, index) => {
            return (<TouchableOpacity style={Styles.button} onPress={ () => loadLevel(el)}>
                    <Text style={Styles.text}>{index}</Text>
                   </TouchableOpacity>
                   )
        })}
      </View>
     );
}