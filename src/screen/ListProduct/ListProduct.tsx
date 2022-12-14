import {
  View,
  Text,
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';

import {StoreState} from '../../redux/store';
import {UserState} from '../../redux/login/reducerLogin';
import {getProduct} from '../../redux/detail-product/actionDetail';
import {ProductState} from '../../redux/detail-product/reducerDetail';
import {getAlbum, SET_PRODUCTS} from '../../redux/product/actionProduct';

import style from '../ListProduct/ListProduct.styles';
import CheckBox from '@react-native-community/checkbox';
import {setTask, setTaskID} from '../../redux/task/actionTask';
import {
  setFavouriteID,
  setProducts,
} from '../../redux/detail-product/actionDetail';

type ListProduct = NativeStackScreenProps<RouteParams, 'Home'>;

const ListProduct = ({navigation, route}: ListProduct) => {
  const [showWarming, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [onClick, setOnClick] = useState();
  const [isSelected, setIsSelection] = useState(false);

  const {name, age} = useSelector<StoreState, UserState>(
    state => state.userReducer,
  );
  const {tasks, taskID} = useSelector<StoreState>(state => state.taskReducer);

  const {products} = useSelector<StoreState, ProductState>(
    state => state.productReducer,
  );
  console.log('product', products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    // getProduct()(dispatch);
    // getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setIsSelection(Task.isSelected);
    }
  };

  // const [name, setName] = useState('');
  // const [age, setAge] = useState('');

  const onPressHandler = () => {
    navigation.navigate('Favourite');
  };
  //   ItemName: 'item from screen A',
  //   ItemId: 12,
  // });

  const onPressHandlerModal = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      setShowWarning(true);
      // Alert.alert(
      //   'Warning!',
      //   'The name must be longer than 3 charachter',
      //   [{text: 'Ok', onPress: () => console.log('Yes button clicked')}],
      //   {
      //     cancelable: true,
      //   },
      // );
    }
  };
  useEffect(() => {
    // getData();
    // getAlbum()(dispatch);
  }, []);

  // const getData = () => {
  //   try {
  //     AsyncStorage.getItem('userData').then(value => {
  //       if (value != null) {
  //         let user = JSON.parse(value);
  //         name = user.Name;
  //         age = user.Age;
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('non corretto');
    } else {
      try {
        var user = {Name: name};
        await AsyncStorage.mergeItem('userData', JSON.stringify(user));
        Alert.alert('success!');
      } catch (error) {
        console.log('error');
      }
    }
  };

  const removeData = async () => {
    if (name.length === 0) {
      Alert.alert('non corretto');
    } else {
      try {
        await AsyncStorage.removeItem('userData');
        navigation.navigate('Login');
      } catch (error) {
        console.log('error');
      }
    }
  };

  // / add task and go next page
  const checkProduct = (id, newValue) => {
    console.log('JHBUHBHUBHUBUH');

    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
      let newProducts = [...products];
      newProducts[index].favourite = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newProducts))
        .then(() => {
          dispatch(setProducts(newProducts));
          Alert.alert('Success! Task state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#faf0e6'}}>
      <View style={{marginHorizontal: 16}}>
        <View style={style.cardStyle}>
          <Text style={style.title}>PRODOTTI</Text>
        </View>
        {/* <Pressable
          onPress={onPressHandler}
          style={({pressed}) => ({
            backgroundColor: pressed ? `#ff69b4` : `#9932cc`,
            borderRadius: 8,
            padding: 8,
          })}>
          <Text style={{fontSize: 30}}>DETTAGLIO</Text>
        </Pressable> */}
        {/* //! params */}
        {/* <Text style={{fontSize: 25}}>{route.params?.message}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Welcome {name}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Age {age}</Text> */}
        {/* <TextInput
          value={name}
          onChangeText={value => dispatch(setName(value))}
          placeholder="scrivi il nome"
          style={style.input}
        /> */}
        {/* <ButtonCustom title="UPDATE" onPress={updateData} />
        <View style={{marginVertical: 8}}>
          <ButtonCustom title="DELETE" onPress={removeData} />
        </View>
        <View style={{marginVertical: 8}}>
          <ButtonCustom
            title="INCREMENT AGE"
            onPress={() => dispatch(increaseAge(age))}
          />
        </View> */}

        {/* <View style={{alignItems: 'center'}}>
          <Modal
            hardwareAccelerated
            animationType="fade"
            transparent
            visible={showWarming}
            onRequestClose={() => setShowWarning(false)}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#00000099',
              }}>
              <View
                style={{
                  padding: 20,
                  height: 200,
                  width: 300,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 24}}>
                    WARNING!
                  </Text>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 24}}>
                    3 CHARACTER
                  </Text>
                  <Pressable onPress={() => setShowWarning(false)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        backgroundColor: 'yellow',
                        minWidth: '100%',
                        padding: 10,
                      }}>
                      OK
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Text
            style={{
              fontSize: 20,
              marginTop: 16,
              fontFamily: Theme.fonts.bold.fontFamily,
            }}>
            Please you name
          </Text>
          <TextInput
            keyboardType="email-address"
            onChangeText={value => setName(value)}
            placeholder="es agnese"
            style={{
              borderWidth: 1,
              borderColor: 'grey',
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
              width: 300,
              textAlign: 'center',
              marginBottom: 20,
            }}
          />
          <Pressable
            onPress={onPressHandlerModal}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#fff544' : '#332222',
                padding: 15,
                borderRadius: 20,
                marginBottom: 16,
              },
            ]}>
            <Text style={{fontSize: 20, color: 'white'}}>
              {submitted ? 'registrata' : 'clicca per registrarti'}
            </Text>
          </Pressable>
          {submitted ? <Text>Il tuo nome ?? {name} </Text> : null}
        </View> */}
      </View>
      <FlatList
        contentContainerStyle={{marginHorizontal: 16}}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={products}
        renderItem={({item, index}) => (
          <>
            <View
              style={{
                flex: 1,
                marginRight: index % 2 === 0 ? 8 : 0,
                marginLeft: index % 2 === 0 ? 0 : 8,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailProduct', {
                    title: item.title,
                    image: item.image,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                  });
                  setOnClick(!onClick);
                }}>
                <View
                  style={[
                    style.bgCard,
                    {backgroundColor: onClick ? 'pink' : 'white'},
                  ]}>
                  <ImageBackground
                    resizeMode="contain"
                    source={{uri: item.image}}
                    style={style.img}
                  />
                </View>
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 8}}>
                {item.title}
              </Text>
              <Text style={style.price}>Price: {item.price}</Text>
              <TouchableOpacity
                style={{position: 'absolute', top: 0, bottom: 0}}
                onPress={() => {
                  dispatch(setFavouriteID(item.id));
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
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default ListProduct;
