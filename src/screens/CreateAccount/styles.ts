import styled from "styled-components/native";

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: ${(props) => props.theme.background};
`;

export const Container = styled.View`
  padding: 0px 5% 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GreetingText = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`;

export const TextField = styled.TextInput`
  width: 100%;
  margin-top: 15px;
  padding: 15px;
  font-size: 18px;
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  color: ${(props) => props.theme.text};
`;

export const ErrorMessage = styled.Text`
  color: ${(props) => props.theme.primaryColor};
  margin-top: 5px;
  width: 100%;
`;

export const BackBtn = styled.TouchableOpacity`
  width: 100%;
  background-color: transparent;
  margin-top: 5px;
  padding: 15px;
  border-radius: 10px;
`;

export const BackBtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

export const SubmitBtn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.primaryColor};
  margin-top: 15px;
  padding: 15px;
  border-radius: 10px;
`;

export const SubmitText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
