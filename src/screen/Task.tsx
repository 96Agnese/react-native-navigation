import {View, Text, TextInput, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonCustom from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../redux/store';
import {setTask} from '../redux/task/actionTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import taskReducer from '../redux/task/reducerTask';
import CheckBox from '@react-native-community/checkbox';

const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector<StoreState, taskReducer>(
    state => state.taskReducer,
  );
  const dispatch = useDispatch();
  console.log('TASKID', taskID, tasks);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSelected, setIsSelection] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.title);
      setDesc(Task.desc);
    }
  };

  const setTasks = () => {
    if (title.length === 0) {
      Alert.alert('Warning');
    } else {
      try {
        var Task = {
          ID: taskID,
          title: title,
          desc: desc,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
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
            dispatch(setTask(newTasks));
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
      <TextInput
        value={title}
        onChangeText={value => setTitle(value)}
        placeholder="TITOLO"
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: 'grey',
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        value={desc}
        onChangeText={value => setDesc(value)}
        placeholder="DESCRIZIONE"
        style={{
          padding: 16,

          width: '100%',
          borderWidth: 1,
          borderColor: 'grey',

          borderRadius: 8,
          backgroundColor: '#fff',
          marginTop: 16,
          marginBottom: 16,
        }}
      />
      <View style={{alignItems: 'center', marginBottom: 16}}>
        <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={newValue => setIsSelection(newValue)}
        />
      </View>
      <ButtonCustom title="Save task" onPress={() => setTasks()} />
    </SafeAreaView>
  );
};

export default Task;
