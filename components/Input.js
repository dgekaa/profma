import React, {useState} from 'react';
import SvgUri from 'react-native-svg-uri';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import DotsIcon from '../img/Dots.svg';
import OpenIcon from '../img/Open.svg';
import ClosedIcon from '../img/Closed.svg';

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
  autoFocus,
  onSubmitEditing,
  maxLength,
  onFocus,
}) => {
  const {
    inputWrap,
    input,
    wrapper,
    topInputTextWrap,
    smallText,
    errStyleLocal,
    wrapperIos,
  } = styles;

  return (
    <View
      style={[
        Platform.OS === 'ios' ? wrapperIos : wrapper,
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
          onFocus={onFocus}
          autoFocus={autoFocus}
          selectTextOnFocus={selectTextOnFocus}
          value={value}
          placeholderTextColor="rgba(0,0,0,0.2)"
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholder={placeholder}
          style={[input, {color: validationErr ? '#FF3D4B' : '#011627'}]}
          keyboardType={keyboardType}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
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
  maxLength,
  onSubmitEditing,
}) => {
  const {
    inputWrap,
    input,
    eye,
    wrapper,
    eyeWrap,
    forgetText,
    topInputTextWrap,
    forgetTextWrap,
    smallText,
    wrapperIos,
  } = styles;

  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true),
    [passwordText, setPasswordText] = useState('');

  return (
    <View
      style={[
        Platform.OS === 'ios' ? wrapperIos : wrapper,
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
          onFocus={() => setIsShowPlaceholder(false)}
          onSubmitEditing={onSubmitEditing}
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
            svgXmlData={DotsIcon}
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
                  svgXmlData={OpenIcon}
                />
              )}
              {icon === 'closedEye' && (
                <SvgUri
                  style={eye}
                  width="13"
                  height="13"
                  svgXmlData={ClosedIcon}
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
  wrapperIos: {
    backgroundColor: '#fff',
    borderRadius: 2,
    marginVertical: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  topInputTextWrap: {
    marginTop: 10,
  },
  smallText: {
    fontSize: 10,
    fontFamily: 'FuturaPT-Medium',
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
    height: 40,
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
    fontFamily: 'FuturaPT-Bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
});
