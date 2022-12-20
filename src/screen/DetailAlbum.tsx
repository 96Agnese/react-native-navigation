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
import ButtonCategory from '../components/buttonCategory';

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
      fontSize: 18,
      marginTop: 16,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
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
      textAlign: 'center',
    },
    directionCount: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      justifyContent: 'center',
    },
    categoryStyle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <ScrollView style={{flex: 1}}>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <ImageBackground
            resizeMode="contain"
            source={{uri: route?.params.image}}
            style={style.imgStyle}
          />
        </View>
        <Text style={style.title}>{route?.params.title.toUpperCase()}</Text>
        <Text style={style.productStyle}>Product info</Text>
        <Text style={style.description}>{route?.params.description}</Text>

        <View style={{marginHorizontal: 16, marginTop: 16}}>
          {/* //!lista */}
          <Text>Lista</Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <ButtonCategory
              // onPress={() => setOnClick(!onClick)}
              title="colore"
            />
            <View style={{marginHorizontal: 16}}>
              <ButtonCategory title="grandezza" />
            </View>
            <ButtonCategory title="misura" />
          </View>
          <Text style={style.categoryStyle}>
            {/* //!category */}
            Category: {route?.params.category}
          </Text>
        </View>
        {/* //! quantity */}
        <Text style={style.qtk}>Quantity</Text>
        <View style={style.directionCount}>
          <ButtonCategory
            title="-"
            onPress={() => dispatch(decrementCount(count))}
          />
          <View style={{marginHorizontal: 8}}>
            <Text>{count}</Text>
          </View>
          <ButtonCategory
            title="+"
            onPress={() => dispatch(increaseCount(count))}
          />
        </View>
        <Text style={style.price}>{route?.params.price}</Text>

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 10,
          }}>
          <ButtonCustom title="Aggiungi al carrello" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailAlbum;
