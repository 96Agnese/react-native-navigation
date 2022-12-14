import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../App';
import ButtonCustom from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../redux/store';
import {ProductState} from '../redux/detail/reducerDetail';
import {
  decrementCount,
  getProduct,
  increaseCount,
} from '../redux/detail/actionDetail';
import {UserState} from '../redux/reducer';
import {counter} from '@fortawesome/fontawesome-svg-core';

type DetailProps = NativeStackScreenProps<RouteParams, 'DetailAlbum'>;

const DetailAlbum = ({route, navigation}: DetailProps) => {
  const {products, count} = useSelector<StoreState, ProductState>(
    state => state.productReducer,
  );
  console.log('product', products);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct()(dispatch);
  }, []);

  const style = StyleSheet.create({
    imgStyle: {
      height: 200,
      width: 200,
      flex: 1,
    },
    title: {
      marginHorizontal: 16,
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 32,
    },
    productStyle: {
      marginHorizontal: 16,
      marginTop: 16,
      fontWeight: 'bold',
    },
    description: {
      marginHorizontal: 16,
      fontSize: 18,
      marginTop: 16,
    },
    qtk: {
      marginHorizontal: 16,
      fontSize: 18,
      marginTop: 16,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    circleStyl: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 8,
      padding: 8,
      width: 35,
      marginHorizontal: 16,
    },
    price: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    directionCount: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
    },
  });

  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <ImageBackground
            resizeMode="contain"
            source={{uri: route?.params.image}}
            style={style.imgStyle}
          />
        </View>
        <Text style={style.title}>{route?.params.title.toUpperCase()}</Text>
        <Text style={style.productStyle}>Product info</Text>
        <Text style={style.description}>{route?.params.description}</Text>
        <Text style={{marginHorizontal: 16}}>
          Category: {route?.params.category}
        </Text>
        <Text style={style.qtk}>Quantity</Text>
        <View style={style.directionCount}>
          <ButtonCustom
            title="-"
            onPress={() => dispatch(decrementCount(count))}
            colorBg={'#191970'}
          />
          <View style={{marginHorizontal: 8}}>
            <Text>{count}</Text>
          </View>
          <ButtonCustom
            title="+"
            onPress={() => dispatch(increaseCount(count))}
            colorBg={'#191970'}
          />
          <Text style={style.price}>{route?.params.price}</Text>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 50,
          }}>
          <ButtonCustom title="Aggiungi al carrello" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailAlbum;
