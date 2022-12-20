import FontAwesome, {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Alert,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Theme from '../styles/Theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCustom from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {setName, increaseAge, getAlbum} from '../redux/action';
import {StoreState} from '../redux/store';
import {UserState} from '../redux/reducer';
import {getProduct} from '../redux/detail/actionDetail';
import {ProductState} from '../redux/detail/reducerDetail';

type HomeProps = NativeStackScreenProps<RouteParams, 'Home'>;

const Home = ({navigation, route}: HomeProps) => {
  const [showWarming, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [onClick, setOnClick] = useState();

  const {name, age} = useSelector<StoreState, UserState>(
    state => state.userReducer,
  );

  // const dispatch = useDispatch();

  const {products} = useSelector<StoreState, ProductState>(
    state => state.productReducer,
  );
  console.log('product', products);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct()(dispatch);
  }, []);

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
    getAlbum()(dispatch);
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

  const style = StyleSheet.create({
    cardStyle: {
      borderRadius: 16,
      paddingHorizontal: 8,
      marginVertical: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 16,
      color: 'grey',
    },
    bgCard: {
      borderRadius: 20,
      padding: 16,
    },
    img: {
      height: 150,
      width: 150,
      flex: 1,
    },
    price: {
      fontWeight: 'bold',
      color: 'grey',
      marginTop: 8,
      fontSize: 16,
    },
  });

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
          {submitted ? <Text>Il tuo nome è {name} </Text> : null}
        </View> */}
      </View>
      <FlatList
        contentContainerStyle={{marginHorizontal: 16}}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={products}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              marginRight: index % 2 === 0 ? 8 : 0,
              marginLeft: index % 2 === 0 ? 0 : 8,
            }}
            onPress={() => {
              navigation.navigate('DetailAlbum', {
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
            <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 8}}>
              {item.title}
            </Text>
            <Text style={style.price}>Price: {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
