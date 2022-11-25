import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {routes} from '../routes';
import {COLORS} from '../utils';

interface HeaderLeftProps {
  to?: routes;
  params?: Record<string, unknown>;
}

export function HeaderLeft({to, params}: HeaderLeftProps) {
  const navigation = useNavigation<any>();

  const onTouch = () => {
    if (to) navigation.navigate(to, params);
    if (to === undefined) navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onTouch}>
      <Icon name="arrow-back-ios" size={20} color={COLORS.secondary} />
    </TouchableOpacity>
  );
}
