import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, ScrollView, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {Appbar, TextInput, Button, List} from 'react-native-paper';

export default function App() {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const ref = firestore().collection('todos');

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  function Todo({id, title, complete}) {
    async function toggleComplete() {
      await firestore().collection('todos').doc(id).update({
        complete: !complete,
      });
    }

    return (
      <List.Item
        title={title}
        onPress={() => toggleComplete()}
        left={(props) => (
          <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
        )}
      />
    );
  }

  //render differently if loading state is true
  if (loading) {
    return null;
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Todo {...item} />}
      />
      <TextInput label={'New Todo'} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
}

const styles = StyleSheet.create({});
