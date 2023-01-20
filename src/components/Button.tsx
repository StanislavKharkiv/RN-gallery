import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Vibration,
} from 'react-native';
import {COLORS} from '../utils';

interface ButtonProps extends TouchableOpacityProps {
  onTouch: () => void;
  text: string;
  variant?: 'primary' | 'warning' | 'error';
  vibration?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    onTouch,
    text,
    disabled,
    variant = 'primary',
    vibration = false,
  } = props;

  const buttonStyles = {
    primary: styles.primaryVariant,
    warning: styles.warningVariant,
    error: styles.errorVariant,
  };

  return (
    <TouchableOpacity
      style={[styles.btn, buttonStyles[variant], props.style]}
      onPress={() => {
        onTouch();
        if (vibration) Vibration.vibrate(100);
      }}
      disabled={disabled}>
      <Text style={[styles.btnText, buttonStyles[variant]]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    width: '50%',
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  btnText: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  primaryVariant: {
    color: 'black',
    borderColor: COLORS.secondary,
  },
  warningVariant: {
    color: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  errorVariant: {
    color: 'red',
    borderColor: 'red',
  },
});
