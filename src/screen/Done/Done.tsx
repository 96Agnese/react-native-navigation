import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTask, setTaskID} from '../../redux/task/actionTask';
import CheckBox from '@react-native-community/checkbox';

const style = StyleSheet.create({});

const Done = ({navigation}) => {
  const {tasks} = useSelector<StoreState>(state => state.taskReducer);
  const dispatch = useDispatch();

  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTask(filteredTasks));
        Alert.alert('Success', 'Task removed');
      })
      .catch(err => console.log(err));
  };
  console.log('tasklenghts', tasks.length);

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].isSelected = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTask(newTasks));
          Alert.alert('Success! Task state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tasks.filter(task => task.isSelected === true)}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}
            style={{
              marginVertical: 16,
              marginHorizontal: 16,
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CheckBox
              value={item.isSelected}
              onValueChange={newValue => {
                checkTask(item.ID, newValue);
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
                {item.title}
              </Text>
              <Text>{item.desc}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteTask(item.ID)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Done;
