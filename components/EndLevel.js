import React from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import Styles from '../style';
import { useRoute } from '@react-navigation/native';

export default function EndLevel( { navigation } ) {
    const route = useRoute();

    const loadComponent = () => {
        navigation.navigate('Levels');
    }

    React.useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            const action = e.data.action;
            e.preventDefault();
            if (action.type === "POP") {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main'}, { name: 'Levels'}]
                })
                
            } else {
                navigation.dispatch(e.data.action);
            }
          })
      );

    return (
        <View style={Styles.container}>
            <Text style={Styles.headerText}>{route.params.data.header}</Text>
            <View style={[Styles.container, {marginTop: 100}]}>
                <Text style={Styles.boldText}>Ваш счёт - {route.params.data.score}</Text>
                <Text style={Styles.boldText}>Вы успели ответить на {route.params.data.answered} из {route.params.data.questionCount} вопросов.</Text>
                <TouchableOpacity style={[Styles.levelsButton, {marginTop: 10}]} onPress={loadComponent}>
                 <Text style={Styles.boldText}>Уровни</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
  
