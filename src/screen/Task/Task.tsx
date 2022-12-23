import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonCustom from '../../components/button';

import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {setTasks} from '../../redux/task/actionTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskReducer from '../../redux/task/reducerTask';

import CheckBox from '@react-native-community/checkbox';

import checkActive from '../../assets/checkActive.png';
import home from '../../assets/home.png';

import ModalComponnet from '../../components/modal';

import style from '../Task/Task.styles';

const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector<StoreState, taskReducer>(
    state => state.taskReducer,
  );
  const dispatch = useDispatch();
  console.log('TASKID', taskID, tasks);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSelected, setIsSelection] = useState(false);
  const [color, setColor] = useState('white');
  const [bellTime, setBellTime] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isCompleteForm, setIsCompleteForm] = useState<boolean>(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.title);
      setDesc(Task.desc);
      setIsSelection(Task.isSelected);
      setColor(Task.color);
    }
  };

  const setTask = () => {
    if (title.length === 0) {
      setIsCompleteForm(true);
    } else {
      try {
        var Task = {
          ID: taskID,
          title: title,
          desc: desc,
          isSelected: isSelected,
          color: color,
        };
        const index = tasks.findIndex(tasks => tasks.ID === taskID);
        console.log('INDEX', index, taskID);

        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Task', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!!');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{margin: 16}}>
      {/* <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        hardwareAccelerated>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000099',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 200,
              width: 300,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text>Remind me After</Text>
              <TextInput
                value={bellTime}
                onChangeText={value => setBellTime(value)}
                keyboardType="numeric"
                style={{
                  height: 50,
                  borderWidth: 1,
                  width: 50,
                  borderRadius: 8,
                  marginVertical: 16,
                }}></TextInput>
              <Text>minute(s)</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 16,
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      {/* // / component modal*/}
      <ModalComponnet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>Remind me After</Text>
          <TextInput
            value={bellTime}
            onChangeText={value => setBellTime(value)}
            keyboardType="numeric"
            style={style.input}></TextInput>
          <Text>minute(s)</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
          }}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </ModalComponnet>
      {/* // / modal */}
      <ModalComponnet
        modalVisible={isCompleteForm}
        setModalVisible={setIsCompleteForm}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            Completa i campi !
          </Text>
          <TouchableOpacity onPress={() => setIsCompleteForm(false)}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>OK</Text>
          </TouchableOpacity>
        </View>
      </ModalComponnet>
      <TextInput
        value={title}
        onChangeText={value => setTitle(value)}
        placeholder="TITOLO"
        style={style.title}
      />
      <TextInput
        value={desc}
        onChangeText={value => setDesc(value)}
        placeholder="DESCRIZIONE"
        style={style.desc}
      />
      <View style={style.containerColor}>
        <TouchableOpacity style={style.white} onPress={() => setColor('white')}>
          {color === 'white' && <Image source={checkActive} />}
        </TouchableOpacity>
        <TouchableOpacity style={style.red} onPress={() => setColor('red')}>
          {color === 'red' && <Image source={checkActive} />}
        </TouchableOpacity>
        <TouchableOpacity style={style.blue} onPress={() => setColor('blue')}>
          {color === 'blue' && <Image source={checkActive} />}
        </TouchableOpacity>
        <TouchableOpacity style={style.green} onPress={() => setColor('green')}>
          {color === 'green' && <Image source={checkActive} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          height: 50,
          backgroundColor: 'blue',
          marginVertical: 16,
          borderRadius: 8,
        }}>
        <View style={{alignItems: 'center', paddingVertical: 8}}>
          <Image source={home} style={{tintColor: 'white'}} />
        </View>
      </TouchableOpacity>
      <View style={style.alignCheck}>
        <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={newValue => setIsSelection(newValue)}
        />
        <Text style={{marginLeft: 8, fontWeight: 'bold'}}>Is done</Text>
      </View>
      <ButtonCustom title="Save task" onPress={() => setTask()} />
    </SafeAreaView>
  );
};

export default Task;
