import FontAwesome, {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Theme from '../styles/Theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCustom from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {setName} from '../redux/action';

type HomeProps = NativeStackScreenProps<RouteParams, 'Home'>;

const Home = ({navigation, route}: HomeProps) => {
  const [showWarming, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

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
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          name(user.Name);
          age(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>HOME</Text>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => ({
          backgroundColor: pressed ? `#ff69b4` : `#9932cc`,
          borderRadius: 8,
          padding: 8,
        })}>
        <Text style={{fontSize: 30}}>Go to favourite</Text>
      </Pressable>
      {/* //! params */}
      <Text style={{fontSize: 25}}>{route.params?.message}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Welcome {name}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Age {age}</Text>
      <TextInput
        value={name}
        onChangeText={value => dispatch(setName(value))}
        placeholder="scrivi il nome"
        style={{
          borderWidth: 1,
          borderColor: `#20b2aa`,
          padding: 10,
          borderRadius: 8,
          backgroundColor: '#fff',
          marginTop: 16,
          minWidth: '50%',
          marginBottom: 24,
        }}
      />
      <ButtonCustom title="UPDATE" onPress={updateData} />
      <View style={{marginVertical: 8}}>
        <ButtonCustom title="DELETE" onPress={removeData} />
      </View>
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
  );
};

export default Home;
