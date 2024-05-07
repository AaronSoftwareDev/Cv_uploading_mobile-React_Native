import React, {useEffect, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import {Button} from '@rneui/themed';
import styles from './styles';

const Welcome = ({navigation}) => {
  const FadeInText = () => {
    const words = [
      'Welcome to',

      'endless',
      'opportunities,',
      'Connecting you',
      ' to a world',
      ' of ',

      'possibilities.',
    ];

    const animatedValues = useRef(
      words.map(() => new Animated.Value(0)),
    ).current;

    useEffect(() => {
      const animateWords = () => {
        const animations = words.map((word, index) =>
          Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: 7000,
            useNativeDriver: true,
            delay: index * 100,
          }),
        );

        return Animated.stagger(100, animations);
      };

      const sequence = Animated.sequence([animateWords()]);
      sequence.start();
    }, [animatedValues, words]);

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {words.map((word, index) => (
          <Animated.Text
            key={index}
            style={{...styles.whiteText, opacity: animatedValues[index]}}>
            {word}{' '}
          </Animated.Text>
        ))}
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2D70AA',
        justifyContent: 'space-around',
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}>
      <FadeInText />
      <View>
        <Button
          color="#235A8A"
          size="lg"
          onPress={() => navigation.navigate('Home')}
          containerStyle={{
            backgroundColor: '#235A8A',
            width: '100%',
            borderWidth: 1,
            borderColor: '#5188B6',
          }}>
          <Text style={{fontSize: 24, fontWeight: '300', color: 'white'}}>
            Proceed
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
