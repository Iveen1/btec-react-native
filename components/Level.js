import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Styles from '../style';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Question from '../components/Question';
import { Audio } from 'expo-av';

export default function Level( { navigation } ) {
    const [key, setKey] = useState(0);
    const [score, setScore] = useState(0);
    const [questionCounter, setQuestionCounter] = useState(0);
    const [isLive, setIsLive] = useState(true);
    const [sound, setSound] = React.useState();
    const route = useRoute();
    const level = route.params.level;
  
    const endGame = (data) => {
        navigation.navigate('EndLevel', {data: data});
    }

        const playSound = async (soundName) => {
        switch (soundName) {
            case 'failedLevel': {
                var soundFile=require('../assets/sounds/failedLevel.mp3');
                break
            }
            case 'timer': {
                var soundFile=require('../assets/sounds/timer.mp3');
                break
            }
        }
        const { sound } = await Audio.Sound.createAsync(soundFile);
        setSound(sound);
        await sound.playAsync();
   }
    return (
        <View style={[Styles.container]}>
            <View style={[{width: "100%", justifyContent: 'space-between', flexDirection: 'row', height: '20%'}]}>
              <View style={[Styles.button, {height: 50}]}>
                <Text style={[{textAlign: 'left'}]}>{level.name}</Text>
              </View>

              <CountdownCircleTimer
                key={key}
                size={100}
                onUpdate={(remainingTime) => {remainingTime==5 ? playSound('timer') : ''}}
                isSmoothColorTransition
                onComplete={() => {
                  endGame({header: 'Вы проиграли!', score: score, answered: questionCounter, questionCount: level.question_count});
                  playSound('failedLevel');
                  }}
                isPlaying={level.seconds_per_question != null && isLive ? true : false}
                duration={level.seconds_per_question != null ? level.seconds_per_question : 10}
                colors={['#228B22', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[level.seconds_per_question, level.seconds_per_question/2, level.seconds_per_question/5, 0]}
                >
                    {({ remainingTime, color }) => <Text style={{color, fontSize: 40}}>{level.seconds_per_question ? (remainingTime) : "∞"}</Text>}
              </CountdownCircleTimer>

              <View style={[Styles.button, {height: 50}]}>
                <Text style={[{textAlign: 'right'}]}>Очки {score}</Text>
              </View>
            </View>

          <Question level={level} timerKey={key} timerKeySetter={setKey} endGame={endGame} score={score} setScore={setScore} questionCounter={questionCounter} setQuestionCounter={setQuestionCounter} setIsLive={setIsLive}/>
        </View>
    );
}
