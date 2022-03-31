import { useState, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

import { ToDoContext } from '../../context/ToDoContext';
import { UserContext } from '../../context/UserContext';

import {
  Wrapper,
  Container,
  GreetingContainer,
  Greeting,
  ToDo,
  ToDoStatus,
  ToDoText,
  DeleteBtn,
  AddBtn,
} from './styles';
import { theme } from '../../global/theme';

function HomeScreen() {
  const { toDoList, removeToDo, toggleStatus, resetToDo } = useContext(ToDoContext);
  const { user, resetUser } = useContext(UserContext);
  const [sound, setSound] = useState<any>();

  const navigation = useNavigation();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/sounds/plin.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  const handleToggleStatus = (id: string, status: boolean) => {
    toggleStatus(id);
    if (!status) {
      playSound();
    }
  }

  const handleResetApp = () => {
    resetToDo()
    resetUser()
  }

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <Wrapper>
      <Container>
        <GreetingContainer>
          <Greeting>Olá {user.name}</Greeting>
          <TouchableOpacity onPress={() => handleResetApp()}>
            <Ionicons
              name="ios-exit-outline"
              size={30}
              color={theme.primaryColor}
              style={{
                transform: [
                  { rotateZ: '180deg' }
                ]
              }}
            />
          </TouchableOpacity>
        </GreetingContainer>

        <SwipeListView
          style={{
            marginTop: 20
          }}
          data={toDoList}
          renderItem={({ item }) => (
            <ToDo key={item.id}>
              <ToDoStatus
                checked={item.checked}
                onPress={() => handleToggleStatus(item.id, item.checked)}
              >
                <Entypo name="check" size={20} color="white" />
              </ToDoStatus>
              <ToDoText>{item.description}</ToDoText>
            </ToDo>
          )}
          renderHiddenItem={({ item }) => (
            <DeleteBtn onPress={() => removeToDo(item.id)}>
              <FontAwesome name="trash-o" size={24} color="white" />
            </DeleteBtn>
          )}
          disableRightSwipe
          rightOpenValue={-60}
        />
      </Container>

      <AddBtn onPress={() => navigation.navigate('NewToDo')}>
        <Entypo name="plus" size={25} color="white" />
      </AddBtn>
    </Wrapper>
  );
}

export { HomeScreen };
