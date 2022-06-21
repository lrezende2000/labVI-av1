import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Wrapper,
  Container,
  GreetingText,
  TextField,
  ErrorMessage,
  BackBtn,
  BackBtnText,
  SubmitBtn,
  SubmitText,
} from './styles';
import { api } from '../../services/api';
import { AxiosError } from 'axios';

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  login: yup.string().required("Login é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
  passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Senhas não conferem").required("Confirmação de senha é obrigatória"),
});

export function CreateAccount() {
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async (data: {
    name: string;
    login: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    try {
      setError('');
      await api.post("/signin", data);

      // @ts-ignore
      navigation.navigate("Login");
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <GreetingText>Cria uma conta</GreetingText>
        <Formik
          initialValues={{
            name: '',
            login: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={schema}
          onSubmit={handleSignIn}
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <>
              {!!error && <ErrorMessage>{error}</ErrorMessage>}
              <TextField
                value={values.name}
                placeholder="Informe seu nome"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  if (error) {
                    setError('');
                  }
                  setFieldValue("name", text);
                }}
              />
              {!!errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
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
                placeholder="Digite a senha"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  if (error) {
                    setError('');
                  }
                  setFieldValue("password", text);
                }}
              />
              {!!errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
              <TextField
                secureTextEntry
                value={values.passwordConfirmation}
                placeholder="Confirmação de senha"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  if (error) {
                    setError('');
                  }
                  setFieldValue("passwordConfirmation", text);
                }}
              />
              {!!errors.passwordConfirmation && <ErrorMessage>{errors.passwordConfirmation}</ErrorMessage>}
              <SubmitBtn onPress={() => handleSubmit()}>
                <SubmitText>Criar conta</SubmitText>
              </SubmitBtn>
              <BackBtn onPress={() => navigation.goBack()}>
                <BackBtnText>Voltar</BackBtnText>
              </BackBtn>
            </>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}