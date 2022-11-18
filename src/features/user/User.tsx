import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {Image, Text, View, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {fetchUser} from './userThunk';
import {Plug} from '../../components/Plug';
import {Loader} from '../../components/Loader';

interface UserProps {
  route: RouteProp<{params: {username: string}}>;
}
export function User(props: UserProps) {
  const userName = props.route.params.username;
  const dispatch = useAppDispatch();
  const {user, error, status} = useAppSelector(state => state.users);

  useEffect(() => {
    if (userName) {
      dispatch(fetchUser(userName));
      return;
    }
    dispatch(fetchUser());
  }, [dispatch, userName]);

  if (error) return <Plug text={error} />;

  if (!user || status === 'pending') return <Loader />;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: user.profile_image.large}} style={styles.img} />
      <View style={styles.userInfo}>
        <Row label="Username:" text={user.username} />
        <Row label="Name:" text={user.name} />
        {user.location && <Row label="Location:" text={user.location} />}
        <Row label="Photos:" text={user.total_photos} />
        <Row label="Likes:" text={user.total_likes} />
        <Row label="Downloads:" text={user.downloads} />
      </View>
    </View>
  );
}

function Row({label, text}: {label: string; text: string}) {
  return (
    <View style={styles.rowWrap}>
      <Text>{label}</Text>
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const blockIndents = 8;

const styles = StyleSheet.create({
  wrapper: {
    padding: blockIndents,
    flexDirection: 'row',
  },
  img: {
    width: 100,
    height: 100,
    marginRight: blockIndents,
  },
  userInfo: {
    flex: 1,
    backgroundColor: 'white',
    padding: blockIndents,
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowText: {
    color: 'black',
    maxWidth: '70%',
    textAlign: 'right',
  },
});
