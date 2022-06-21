import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '../../context/UserContext';

import {
  Wrapper,
  Container,
  GreetingText,
  TextField,
  ErrorMessage,
  NewAccountBtn,
  NewAccountText,
  SubmitBtn,
  SubmitText,
} from './styles';
import { api } from '../../services/api';
import { AxiosError } from 'axios';

const schema = yup.object().shape({
  login: yup.string()
    .required('O login é obrigatório'),
  password: yup.string()
    .required('A senha é obrigatória'),
});

export function Login() {
  const { storeUser, storeToken } = useContext(UserContext);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleStoreUser = async (data: { login: string, password: string }) => {
    try {
      setError('');
      const { data: { token, user } } = await api.post("/login", data);

      storeToken(token);
      storeUser(user.name);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <GreetingText>Seja bem-vindo!</GreetingText>
        <Formik
          initialValues={{
            login: '',
            password: ''
          }}
          validationSchema={schema}
          onSubmit={handleStoreUser}
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <>
              {!!error && <ErrorMessage>{error}</ErrorMessage>}
              <TextField
                value={values.login}
                placeholder="Informe seu login"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  if (error) {
                    setError('');
                  }
                  setFieldValue("login", text);
                }}
              />
              {!!errors.login && <ErrorMessage>{errors.login}</ErrorMessage>}
              <TextField
                secureTextEntry
                value={values.password}
                placeholder="Informe sua senha"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  if (error) {
                    setError('');
                  }
                  setFieldValue("password", text);
                }}
              />
              {!!errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              <SubmitBtn onPress={() => handleSubmit()}>
                <SubmitText>Comece a usar</SubmitText>
              </SubmitBtn>
              <NewAccountBtn onPress={() => navigation.navigate("CreateAccount")}>
                <NewAccountText>Criar conta</NewAccountText>
              </NewAccountBtn>
            </>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}