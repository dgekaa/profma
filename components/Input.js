import React, {useState} from 'react';
import SvgUri from 'react-native-svg-uri';

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
  onChangeText,
  keyboardType,
  style,
  editable,
  selectTextOnFocus,
  value,
  validationErr,
  err,
  errStyle,
  withoutShadow,
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
    <View
      style={[
        wrapper,
        style,
        {
          shadowOpacity: withoutShadow ? 0 : 0.5,
          elevation: withoutShadow ? 0 : 1.5,
        },
      ]}>
      <View style={[topInputTextWrap]}>
        <Text style={smallText}>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          selectTextOnFocus={selectTextOnFocus}
          value={value}
          placeholderTextColor="rgba(0,0,0,0.2)"
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholder={placeholder}
          style={[input, {color: validationErr ? '#FF3D4B' : '#011627'}]}
          keyboardType={keyboardType}
          editable={editable}
        />
      </View>
      {!!err && <Text style={[errStyleLocal, errStyle]}>{err}</Text>}
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
  withoutShadow,
  value,
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

  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
  const [passwordText, setPasswordText] = useState('');

  return (
    <View
      style={[
        wrapper,
        {
          shadowOpacity: withoutShadow ? 0 : 0.5,
          elevation: withoutShadow ? 0 : 1.5,
        },
      ]}>
      <View style={topInputTextWrap}>
        <Text style={smallText}>{text}</Text>
      </View>
      <View style={inputWrap}>
        <TextInput
          placeholderTextColor="rgba(0,0,0,0.2)"
          onFocus={() => {
            setIsShowPlaceholder(false);
          }}
          value={value}
          onBlur={() => {
            passwordText
              ? setIsShowPlaceholder(false)
              : setIsShowPlaceholder(true);
          }}
          onChangeText={text => {
            onChangeText(text);
            setPasswordText(text);
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          style={[
            input,
            {
              color: validationErr ? '#FF3D4B' : '#011627',
            },
          ]}
          secureTextEntry={secureTextEntry}
        />
        {isShowPlaceholder && (
          <SvgUri
            style={{position: 'absolute', top: 12}}
            source={require('../img/Dots.svg')}
          />
        )}
        {icon && (
          <TouchableOpacity onPress={onPress}>
            <View style={eyeWrap}>
              {icon === 'openedEye' && (
                <SvgUri
                  style={eye}
                  width="16"
                  height="16"
                  source={require(`../img/${'Open'}.svg`)}
                />
              )}
              {icon === 'closedEye' && (
                <SvgUri
                  style={eye}
                  width="13"
                  height="13"
                  source={require(`../img/${'Closed'}.svg`)}
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
      width: 2,
      height: 2,
    },
    shadowRadius: 1.41,
    shadowOpacity: 0.5,
    elevation: 1.5,
  },
  topInputTextWrap: {
    marginTop: 10,
  },
  smallText: {
    fontSize: 10,
  },
  inputWrap: {
    flexDirection: 'row',
    height: 35,
  },
  errStyleLocal: {
    color: '#FF3D4B',
    fontSize: 10,
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
