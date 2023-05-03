import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Styles from '../style';
import Animated, {Keyframe, Easing} from 'react-native-reanimated';
import { Audio } from 'expo-av';

const EASING_BEZIER = Easing.bezier(0.22, 1, 0.36, 1);

export default function Question( {level, timerKey, timerKeySetter, endGame, score, setScore, questionCounter, setQuestionCounter, setIsLive} ) {
    const [answer, setAnswer] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [sound, setSound] = React.useState();

    const playSound = async (soundName) => {
        switch (soundName) {
            case 'incorrectAnswer': {
                var soundFile=require('../assets/sounds/incorrectAnswer.mp3');
                break
            }
            case 'successLevel': {
                var soundFile=require('../assets/sounds/successLevel.mp3');
                break
            }
            case 'correctAnswer': {
                var soundFile=require('../assets/sounds/correctAnswer.mp3');
                break
            }
        }
        const { sound } = await Audio.Sound.createAsync(soundFile);
        setSound(sound);
        await sound.playAsync();
   }
    // incorrectAnswer.loadAsync(require(''));
    
    // const correctAnswer = new Audio.Sound();
    // correctAnswer.loadAsync(require('../assets/sounds/correctAnswer.mp3'));

    // const successLevel = new Audio.Sound();
    // successLevel.loadAsync(require('../assets/sounds/successLevel.mp3'));

    const operations = [{type: 'add', symbol: '+'}, {type: 'substract', symbol: '-'}, {type: 'multiply', symbol: '*'}, {type: 'divide', symbol: '/'}]
    const enteringAnimation = new Keyframe({
        0: {
            opacity: 1,
            transform: [{scale: 1}],
            easing: EASING_BEZIER,
          },
          100: {
            opacity: 0,
            transform: [{scale: 6}],
            easing: EASING_BEZIER,
          },
        });

    const checkInput = (text) => {
        setAnswer(text.replace(/[^0-9]/g, '')); // regular expression for prevent symbolic values
    }
    const generateQuestion = () => {
        var operation = operations[Math.floor(Math.random() * operations.length)];
        var x = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
        var y = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
        var out = {question: null, correct_answer: null};
        if (operation['symbol'] == '-' || operation['symbol'] == '/') {
            if (y > x) { // prevent negative answer
                [y, x] = [x, y];
            }

            if (operation['symbol'] == '/' && x%y!=0) { // prevent decimal answers
                var dividedNums = [];
                for (let i=1; i<=x; i++) {
                    if (x%i==0) {
                        dividedNums.push(i);
                    }
                }
                y = dividedNums[Math.floor(Math.random() * dividedNums.length)];
            }
        }
        out['question'] = `${x} ${operation['symbol']} ${y}`;
        out['correct_answer'] = eval(out['question']);
        setCurrentQuestion(out);
    }

    const applyAnswer = () => {
        if (answer == currentQuestion['correct_answer']) {
            setIsCorrectAnswer(true);
            setScore(score + 1);
            timerKeySetter(timerKey + 1);
            setQuestionCounter(questionCounter + 1);
            // correctAnswer.playAsync();
            playSound('correctAnswer');
            if (questionCounter >= level.question_count-1) {
                setIsLive(false);
                playSound('successLevel');
                endGame({header: 'Поздравляем!', score: score+1, answered: questionCounter+1, questionCount: level.question_count});
            } else {
                generateQuestion();
                setAnswer();
            }
        } else {
            // incorrectAnswer.playAsync();
            playSound('incorrectAnswer');
            setIsCorrectAnswer(false);
        }
        // gdhfdfjkg
        setVisibility(true);
        setTimeout( () => setVisibility(false), 800);
    }

    return (
        <View style={Styles.questionContainer}>
            <Text style={Styles.boldText}>Вопрос №{questionCounter+1}/{level.question_count}</Text>
            <View style={Styles.questionContainer}>
                <Text style={Styles.boldText}>{currentQuestion != null ? currentQuestion['question'] : generateQuestion()}</Text>
                <TextInput style={Styles.input} placeholder='Пиши сюда ответ' keyboardType='numeric' onChangeText={(text) => checkInput(text)} value={answer} maxLength={10}/>
                <Button title='ОК' onPress={applyAnswer}/>
            </View>
            {visibility && (
                            <Animated.View
                              entering={enteringAnimation.duration(800)}
                              style={[styles.dot, {backgroundColor: isCorrectAnswer ? 'green' : 'red'}]}
                            />
                          )}
        </View>    
    );
}

const styles = StyleSheet.create({
  dot: {
    height: 150,
    width: 150,
    borderRadius: 150,
    margin: 10
  }
});