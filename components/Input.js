import React from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Input = ({
  text,
  placeholder,
  secureTextEntry,
  keyboardType,
  icon,
  onPress,
}) => {
  const {inputWrap, input, eye, wrapper, eyeWrap, maxLength} = styles;

  return (
    <View style={wrapper}>
      <Text>{text}</Text>
      <View style={inputWrap}>
        <TextInput
          maxLength={maxLength}
          placeholder={placeholder}
          style={input}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {icon && (
          <TouchableOpacity onPress={onPress}>
            <View style={eyeWrap}>
              {icon === 'openedEye' && (
                <Image
                  style={eye}
                  source={require(`../img/${'openedEye'}.png`)}
                />
              )}
              {icon === 'closedEye' && (
                <Image
                  style={eye}
                  source={require(`../img/${'closedEye'}.png`)}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 5,
    paddingHorizontal: 16,
    fontSize: 10,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    paddingHorizontal: 0,
    flex: 9,
    fontWeight: 'bold',
  },
  eye: {
    width: 16,
    height: 8,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  eyeWrap: {
    flex: 1,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
