import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import Share from 'react-native-share';

interface ShareProps {
  children: ReactNode;
  url: string;
}

export function ShareButton(props: ShareProps) {
  const {url, children} = props;

  const onTouch = async () => {
    await Share.open({url});
  };

  return <TouchableOpacity onPress={onTouch}>{children}</TouchableOpacity>;
}
