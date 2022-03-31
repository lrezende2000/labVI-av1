import { Platform, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  /* padding: ${() => Platform.OS === 'ios' ? '100px 10px 10px 10px' : '10px'}; */
  position: relative;
  background-color: ${(props) => props.theme.background};
`;

export const Container = styled.View`
  padding: 20px 5% 10px;
  flex: 1;
`;

export const GreetingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Greeting = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 30px;
  font-weight: 500;
`;

export const ToDoContainer = styled.ScrollView`
  margin-top: 20px;
`;

export const ToDo = styled.View`
  background-color: ${(props) => props.theme.secondaryColor};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IToDoStatus extends TouchableOpacityProps {
  checked: boolean;
}

export const ToDoStatus = styled.TouchableOpacity<IToDoStatus>`
  background-color: ${(props) => props.checked ? props.theme.primaryColor : 'transparent'};
  opacity: ${(props) => props.checked ? .5 : 1};
  border: 2px solid ${(props) => props.theme.primaryColor};
  border-radius: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToDoText = styled.Text`
  margin-left: 15px;
  color: ${(props) => props.theme.text};
`;

export const DeleteBtn = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  padding-right: 20px;
  height: 60px;
  background-color: ${(props) => props.theme.primaryColor};
`;

export const AddBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 30px;
  align-items: flex-end;
  justify-content: center;
  border-radius: 100px;
  padding: 10px;
  background-color: ${(props) => props.theme.primaryColor};
`;
