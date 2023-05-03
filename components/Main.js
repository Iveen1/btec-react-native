import React from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Styles from '../style';

export default function Main( { navigation } ) {
    const loadComponent = () => {
        navigation.navigate('Levels');
    }

    return (
        <View style={Styles.containerRowFlex}>
            <TouchableOpacity style={Styles.levelsButton} onPress={loadComponent}>
                 <Text style={Styles.boldText}>Уровни</Text>
            </TouchableOpacity>
        </View>
    );
}
  