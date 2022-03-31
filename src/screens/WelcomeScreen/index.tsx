import { useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '../../context/UserContext';

import {
  Wrapper,
  Container,
  GreetingText,
  TextField,
  ErrorMessage,
  SubmitBtn,
  SubmitText,
} from './styles';

const schema = yup.object().shape({
  name: yup.string()
    .required('O nome é obrigatório')
    .min(2, 'O nome precisa ter no mínimo 2 letras'),
});

export function WelcomeScreen() {
  const { storeUser } = useContext(UserContext);

  const handleStoreUser = (data: { name: string }) => {
    storeUser(data.name);
  }

  return (
    <Wrapper>
      <Container>
        <GreetingText>Seja bem-vindo!</GreetingText>
        <Formik
          initialValues={{
            name: ''
          }}
          validationSchema={schema}
          onSubmit={handleStoreUser}
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <>
              <TextField
                value={values.name}
                placeholder="Informe seu nome"
                placeholderTextColor="gray"
                onChangeText={(text) => setFieldValue("name", text)}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              <SubmitBtn onPress={() => handleSubmit()}>
                <SubmitText>Comece a usar</SubmitText>
              </SubmitBtn>
            </>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}