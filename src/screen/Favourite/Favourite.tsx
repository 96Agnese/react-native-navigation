import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../../App';

import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';

import CheckBox from '@react-native-community/checkbox';

import {ProductState} from '../../redux/detail-product/reducerDetail';

import {setTask, setTaskID} from '../../redux/task/actionTask';
import {setFavouriteID} from '../../redux/detail-product/actionDetail';

type FavouriteProps = NativeStackScreenProps<RouteParams, 'Favourite'>;

const Favourite = ({navigation, route}: FavouriteProps) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const {screenNumber, movie} = route.params;

  const {products} = useSelector<StoreState, ProductState>(
    state => state.productReducer,
  );
  const dispatch = useDispatch();
  // const {ItemName, ItemId} = route.params;

  const onPressHandler = () => {
    navigation.navigate('Home', {message: 'ciao sono un messaggio'});
    // navigation.setParams({ItemId: 14});
    // navigation.goBack();
  };
  const checkProduct = (id, newValue) => {
    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
      let newProducts = [...products];
      newProducts[index].favourite = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newProducts))
        .then(() => {
          dispatch(setTask(newProducts));
          Alert.alert('Success! Task state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  const deleteProduct = (id: number) => {
    console.log('*********idddddd', id);

    const filteredProducts = products.filter(product => product.id !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredProducts))
      .then(() => {
        dispatch(setFavouriteID(filteredProducts));
        Alert.alert('Success', 'Task removed');
      })
      .catch(err => console.log(err));
  };

  // / dati tramite api prova
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://www.omdbapi.com/?apikey=16f7a2eb&t=Star+Wars&y=1977',
    );
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.response);
        setMovieDetails(response);
      } else {
        console.log(`HTTP request failed ${xhr.status}`);
      }
    };
  }, []);

  return (
    // <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    //   <Text style={{fontSize: 30, fontWeight: 'bold'}}>FAVOURITE</Text>
    //   <Pressable
    //     onPress={onPressHandler}
    //     style={({pressed}) => ({
    //       backgroundColor: pressed ? '#ddd' : '#0f0',
    //     })}>
    //     <Text style={{fontSize: 30}}>Go back screen a</Text>
    //   </Pressable>
    //   <Text
    //     style={{
    //       fontWeight: 'bold',
    //       fontSize: 16,
    //       paddingBottom: 24,
    //       paddingTop: 24,
    //     }}>
    //     {route.params.ItemName}
    //   </Text>
    //   <Text style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 24}}>
    //     ID: {route.params.ItemId}
    //   </Text>
    // </View>
    <>
      <Text>{screenNumber}</Text>
      {/* <Text>{movie.title}</Text>
      <Text>{movie.des}</Text> */}
      <Text>{movie?.title}</Text>
      <FlatList
        contentContainerStyle={{marginHorizontal: 16}}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={products.filter(product => product.favourite === true)}
        renderItem={({item, index}) => (
          <View
            style={{
              flex: 1,
              marginRight: index % 2 === 0 ? 8 : 0,
              marginLeft: index % 2 === 0 ? 0 : 8,
            }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setFavouriteID(item.id));
                navigation.navigate('Prodotti');
              }}>
              <View
                style={{
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: 'white',
                }}>
                <ImageBackground
                  resizeMode="contain"
                  source={{uri: item.image}}
                  style={{height: 150, width: 150, flex: 1}}
                />
              </View>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 8}}>
              {item.title}
            </Text>
            <Text>Price: {item.price}</Text>
            <TouchableOpacity
              style={{position: 'absolute', top: 0, bottom: 0}}
              onPress={() => {
                deleteProduct(item.id);
                // dispatch(setFavouriteID(item.id));
                // navigation.navigate('Favourite');
              }}>
              <CheckBox
                boxType="square"
                onTintColor="blue"
                animationDuration={0.3}
                tintColor={'black'}
                onAnimationType="fill"
                value={item.favourite}
                onValueChange={newValue => {
                  checkProduct(item.id, newValue);
                  // navigation.navigate('Favourite');
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

export default Favourite;
