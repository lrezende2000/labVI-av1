import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const Container = styled.View`
  padding: 60px 5% 10px;
  flex: 1;
`;

export const BackBtn = styled.TouchableOpacity``;

export const Title = styled.Text`
  margin: 30px 0;
  font-size: 30px;
  color: ${(props) => props.theme.text};
  font-weight: 700;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const TextField = styled.TextInput`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  color: ${(props) => props.theme.text};
`;

export const ErrorMessage = styled.Text`
  color: ${(props) => props.theme.primaryColor};
  margin-top: 5px;
`;

export const SubmitBtn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.primaryColor};
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
`;

export const SubmitText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
