import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {fetchUser, fetchUserImages} from './userThunk';
import {Plug} from '../../components/Plug';
import {Loader} from '../../components/Loader';
import {Row} from './components/Row';
import {RootStackParamList, ScreenNavigationProp} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {routes} from '../../routes';
import {Gallery} from './components/Gallery';
import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

type UserProps = NativeStackScreenProps<
  RootStackParamList,
  routes.user,
  'user'
>;

export function User(props: UserProps) {
  const userName = props.route.params.username;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ScreenNavigationProp<routes.user>>();
  const {user, error, status, photos} = useAppSelector(state => state.users);
  const {liked} = useAppSelector(state => state.imageViewer);

  useEffect(() => {
    if (userName) {
      dispatch(fetchUser(userName));
      return;
    }
    dispatch(fetchUser());
  }, [dispatch, userName]);

  const onTouchLoad = () => dispatch(fetchUserImages(userName));
  const onTouchMyImages = () => navigation.navigate(routes.local);

  if (error) return <Plug text={error} />;

  if (!user || status === 'pending') return <Loader />;

  return (
    <View style={styles.wrap}>
      <View style={styles.userWrapper}>
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
      {!photos && user.total_photos > 0 && (
        <Button text="get user photos" onTouch={onTouchLoad} />
      )}
      {photos && <Gallery photos={photos} likedPhotos={liked} />}
      {photos && photos.length < user.total_photos && (
        <View>
          <Button text="load more" onTouch={onTouchLoad} />
        </View>
      )}
      {!userName && (
        <View>
          <Button text="my images" onTouch={onTouchMyImages} />
        </View>
      )}
    </View>
  );
}

const blockIndents = 8;

const styles = StyleSheet.create({
  userWrapper: {
    padding: blockIndents,
    flexDirection: 'row',
    backgroundColor: 'white',
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
  wrap: {
    flex: 1,
    alignItems: 'center',
  },
});
