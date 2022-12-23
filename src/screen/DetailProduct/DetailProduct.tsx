import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../../App';

import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {ProductState} from '../../redux/detail-product/reducerDetail';
import {
  decrementCount,
  getProduct,
  increaseCount,
} from '../../redux/detail-product/actionDetail';

import ButtonCustom from '../../components/button';
import ButtonCategory from '../../components/buttonCategory';

import style from '../DetailProduct/DetailProduct.styles';

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
        <Text style={style.price}>{route.params.price}</Text>

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
