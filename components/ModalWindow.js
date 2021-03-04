import React from 'react';

import {View, StyleSheet,KeyboardAvoidingView} from 'react-native';

export const ModalWindow = ({children, style, contaynerStyle}) => {
  const {container, modal, bg} = styles;
  return (
    <View style={[container, contaynerStyle]}>
      <View style={bg} />
      <View style={[modal, style]}>{children}</View>
    </View>
  );
};


export const ModalWindowWithKeyboard = ({children, style}) => {
  const {container, modal, bg} = styles;
  return (
    <KeyboardAvoidingView
        style={[container, {flex:1, backgroundColor:"rgba(0,0,0,0.1)"}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
      <View style={{
         position: 'relative',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         justifyContent: 'center',
         alignItems: 'center',
         width:"100%"
      }}>
        <View style={[modal, style]}>{children}</View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    opacity: 0.45,
  },
  modal: {
    borderRadius: 2,
    padding: 24,
    width: '90%',
    backgroundColor: '#FFFFFF',
    opacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.17)',
    elevation: 2,
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalWindow;
