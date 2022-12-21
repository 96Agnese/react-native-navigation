import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setAge, setName} from '../../redux/login/actionLogin';
import {UserState} from '../../redux/login/reducerLogin';
import {StoreState} from '../../redux/store';
import ButtonCustom from '../../components/button';

import * as Animatable from 'react-native-animatable';
import ModalComponnet from '../../components/modal';

const Login = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {name, age} = useSelector<StoreState, UserState>(
    state => state.userReducer,
  );
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

  //!error
  const Error = ({display = false}) => {
    const viewElement = useRef(null);
    useEffect(() => {
      if (display) {
        viewElement.current.animate('shake', 500, 'linear');
      } else {
        viewElement.current.animate('bounceOut', 50);
      }
    }, [display]);

    const viewStyle = [style.error, {opacity: 0}];

    if (display) {
      viewStyle.push({opacity: 1});
    }

    return (
      <Animatable.View
        animation="shake"
        duration={500}
        easing="linear"
        ref={viewElement}>
        <Text style={style.error}>XXX</Text>
      </Animatable.View>
    );
  };

  const Input = ({label, error, ...props}) => {
    return (
      <View style={{height: 50, width: '100%', backgroundColor: 'pink'}}>
        <Text>{label}</Text>
        <View>
          <TextInput autoCapitalize="none" {...props} />
          <Error display={error} />
        </View>
      </View>
    );
  };
  // useEffect(() => {
  //   if (name !== '' || name.includes('@')) {
  //     setIsValid(false);
  //   } else {
  //     Alert.alert('Non hai riempito i campi');

  //     setIsValid(false);
  //   }
  // }, [name]);

  //! se non completo i campi mi da un alert
  const setData = async () => {
    console.log({name, age});
    if (name.length === 0 || age === 0) {
      setModalVisible(true);
      console.log('mofal', name.length, age);
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
  // const validateName = (name: string) => {
  //   if (name !== '') {
  //     let re = /@+/;
  //     let cond = re.test(name);
  //     if (!cond) {
  //       return (
  //         <View>
  //           <Text style={{color: 'red'}}>Email should contain @ </Text>
  //         </View>
  //       );
  //     } else {
  //       return <View> </View>;
  //     }
  //   } else {
  //     return (
  //       <View>
  //         <Text style={{color: 'red'}}>Email is required </Text>
  //       </View>
  //     );
  //   }
  // };

  const style = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#fff',
      marginTop: 16,
    },
    error: {
      height: 30,
      width: 30,
      backgroundColor: 'red',
      borderRadius: 8,
    },
  });

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>LOGIN</Text>
          {/* <Input
          // error={submit.value}
          label="usarname"
          placeholder="ksks"
          // onChangeText={usarname.set}
        /> */}
          <TextInput
            placeholderTextColor={'grey'}
            value={name}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={value => dispatch(setName(value))}
            placeholder="NOME"
            style={style.input}
          />
          {/* {validateName(name)} */}
          <TextInput
            placeholderTextColor={'grey'}
            onChangeText={value => dispatch(setAge(Number(value)))}
            placeholder="ETA'"
            style={style.input}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 16,
          }}>
          <ButtonCustom
            title="Login"
            onPress={() => {
              setData();
            }}
          />
        </View>
      </SafeAreaView>
      <ModalComponnet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>Mancano dei campi !</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>OK</Text>
        </TouchableOpacity>
      </ModalComponnet>
    </>
  );
};

export default Login;
