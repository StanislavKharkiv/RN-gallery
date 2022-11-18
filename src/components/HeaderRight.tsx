import {Link, useRoute} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {routes} from '../routes';
import {COLORS} from '../utils';

export function HeaderRight() {
  const route = useRoute();

  if (route.name === routes.user) return null;

  return (
    <Link to={{screen: routes.user, params: {}}}>
      <Icon name="person" size={30} color={COLORS.secondary} />
    </Link>
  );
}
