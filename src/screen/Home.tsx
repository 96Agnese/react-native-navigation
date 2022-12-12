import FontAwesome, {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Theme from '../styles/Theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteParams} from '../../App';

type HomeProps = NativeStackScreenProps<RouteParams, 'Home'>;

const Home = ({navigation, route}: HomeProps) => {
  const [showWarming, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [name, setName] = useState('');

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
      <View style={{alignItems: 'center'}}>
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
      </View>
    </View>
  );
};

export default Home;
