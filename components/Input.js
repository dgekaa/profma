import React from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export const InputWithText = ({
  text,
  placeholder,
  keyboardType,
  validationErr,
  onChangeText,
}) => {
  const {inputWrap, input, wrapper, maxLength, topInputTextWrap} = styles;

  return (
    <View style={[wrapper, {height: 60}]}>
      <View style={topInputTextWrap}>
        <Text>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          maxLength={maxLength}
          placeholder={placeholder}
          style={[input, {color: validationErr ? '#FF3D4B' : '#011627'}]}
          keyboardType={keyboardType}
          onChangeText={text => onChangeText(text)}
        />
      </View>
    </View>
  );
};

export const InputWithPassword = ({
  text,
  placeholder,
  secureTextEntry,
  icon,
  onPress,
  forgetPassword,
  validationErr,
  onPressPassRecovery,
}) => {
  const {
    inputWrap,
    input,
    eye,
    wrapper,
    eyeWrap,
    maxLength,
    forgetText,
    topInputTextWrap,
    forgetTextWrap,
  } = styles;

  return (
    <View style={[wrapper, {height: forgetPassword ? 95 : 60}]}>
      <View style={topInputTextWrap}>
        <Text>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          maxLength={maxLength}
          placeholder={placeholder}
          style={[input, {color: validationErr ? '#FF3D4B' : '#011627'}]}
          secureTextEntry={secureTextEntry}
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
      {forgetPassword && (
        <TouchableOpacity style={forgetTextWrap} onPress={onPressPassRecovery}>
          <Text style={forgetText}>Забыли свой пароль?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
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

  topInputTextWrap: {
    height: 15,
    marginTop: 5,
  },
  inputWrap: {
    flexDirection: 'row',
    height: 35,
  },
  forgetTextWrap: {
    height: 30,
  },

  input: {
    paddingHorizontal: 0,
    flex: 9,
    fontWeight: 'bold',
    height: 35,
  },
  eye: {
    width: 16,
    height: 8,
  },
  eyeWrap: {
    flex: 1,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetText: {
    fontFamily: 'Futura PT',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
