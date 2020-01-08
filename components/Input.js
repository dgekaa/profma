import React from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  onChangeText,
} from 'react-native';

export const InputWithText = ({
  text,
  placeholder,
  keyboardType,
  validationErr,
  onChangeText,
  hideShadow,
  style,
}) => {
  const {
    inputWrap,
    input,
    wrapper,
    maxLength,
    topInputTextWrap,
    smallText,
  } = styles;

  return (
    <View style={[wrapper, style, {height: 60}]}>
      <View style={topInputTextWrap}>
        <Text style={smallText}>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          onChangeText={onChangeText}
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
  onChangeText,
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
    smallText,
  } = styles;

  return (
    <View style={[wrapper, {height: forgetPassword ? 95 : 60}]}>
      <View style={topInputTextWrap}>
        <Text style={smallText}>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          onChangeText={onChangeText}
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
    borderWidth: 0.5,
    borderColor: '#BFBFBF',
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 10,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 1.5,
  },

  topInputTextWrap: {
    height: 8,
    marginTop: 10,
  },
  smallText: {
    fontSize: 10,
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
    fontSize: 13,
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
