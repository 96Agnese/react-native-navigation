import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../../App';

type FavouriteProps = NativeStackScreenProps<RouteParams, 'Favourite'>;

const Favourite = ({navigation, route}: FavouriteProps) => {
  // const {ItemName, ItemId} = route.params;

  const onPressHandler = () => {
    navigation.navigate('Home', {message: 'ciao sono un messaggio'});
    // navigation.setParams({ItemId: 14});
    // navigation.goBack();
  };
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>FAVOURITE</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({
          backgroundColor: pressed ? '#ddd' : '#0f0',
        })}>
        <Text style={{fontSize: 30}}>Go back screen a</Text>
      </Pressable>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          paddingBottom: 24,
          paddingTop: 24,
        }}>
        {route.params.ItemName}
      </Text>
      <Text style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 24}}>
        ID: {route.params.ItemId}
      </Text>
    </View>
  );
};

export default Favourite;
