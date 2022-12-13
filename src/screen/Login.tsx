import {View, Text, SafeAreaView, TextInput, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setAge, setName} from '../redux/action';

const Login = ({navigation}) => {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  //   const [name, setName] = useState('');
  //   const [age, setAge] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          navigation.navigate('Home');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! se non completo i campi mi da un alert
  const setData = async () => {
    if (name.length === 0 || age.length === 0) {
      Alert.alert('non corretto');
    } else {
      try {
        setName(name);
        setAge(age);
        // var user = {
        //   Name: name,
        //   Age: age,
        // };
        navigation.navigate('Home');
      } catch (error) {
        console.log('error');
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: `#e0ffff`}}>
      <View style={{padding: 16}}>
        <Text>Async storage</Text>
        <TextInput
          onChangeText={value => dispatch(setName(value))}
          placeholder="scrivi il nome"
          style={{
            borderWidth: 1,
            borderColor: `#20b2aa`,
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            marginTop: 16,
          }}
        />
        <TextInput
          onChangeText={value => dispatch(setAge(value))}
          placeholder="age"
          style={{
            borderWidth: 1,
            borderColor: `#20b2aa`,
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#fff',
            marginTop: 16,
          }}
        />
        <View style={{alignItems: 'center', marginTop: 16}}>
          <Button title="Login" onPress={setData} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
