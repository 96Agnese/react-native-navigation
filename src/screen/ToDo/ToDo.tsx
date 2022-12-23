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
import {setTask, setTaskID, setTasks} from '../../redux/task/actionTask';
import CheckBox from '@react-native-community/checkbox';
import ButtonCustom from '../../components/button';

const style = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  banner: {
    height: 50,
    width: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  container: {
    marginVertical: 16,
    marginHorizontal: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
});

const ToDo = ({navigation}) => {
  const {tasks} = useSelector<StoreState>(state => state.taskReducer);
  const dispatch = useDispatch();

  //! non serve storage se uso redux
  // useEffect(() => {
  //   getTasks();
  // }, []);

  // const getTasks = () => {
  //   AsyncStorage.getItem('Tasks')
  //     .then(tasks => {
  //       const parsedTasks = JSON.parse(tasks);
  //       if (parsedTasks && typeof parsedTasks === 'object') {
  //         dispatch(setTask(parsedTasks));
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };
  // / delete task
  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success', 'Task removed');
      })
      .catch(err => console.log(err));
  };
  console.log('deletask', deleteTask);

  // / add task and go next page
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
      {/* <ButtonCustom
        title="prova"
        onPress={() =>
          navigation.navigate('Favourite', {
            movie: {
              title: 'stars wars',
              des: 'ciao',
            },
          })
        }></ButtonCustom> */}
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={tasks.filter(task => task.isSelected === false)}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}
            style={style.container}>
            <View
              style={[
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor:
                    item.color === 'red'
                      ? '#f28b82'
                      : item.color === 'blue'
                      ? '#aecbfa'
                      : item.color === 'green'
                      ? '#ccff90'
                      : '#ffffff',
                },
                style.banner,
              ]}
            />

            <View style={{marginHorizontal: 16}}>
              {/* // / azione che va in done  */}
              <CheckBox
                value={item.isSelected}
                onValueChange={newValue => {
                  checkTask(item.ID, newValue);
                }}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
                {item.title}
              </Text>
              <Text>{item.desc}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                deleteTask(item.ID);
              }}
              style={{alignItems: 'flex-end', flex: 1}}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          console.log('taskpyal', tasks.length);

          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <Text style={{color: 'white', fontSize: 40}}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ToDo;
