import { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';


import { ToDoContext } from '../../context/ToDoContext';
import {
  Wrapper,
  Container,
  BackBtn,
  Title,
  FormContainer,
  TextField,
  SubmitBtn,
  SubmitText,
  ErrorMessage,
} from './styles';

const schema = yup.object().shape({
  toDo: yup.string().required('Descrição é obrigatória'),
});

function AddToDoScreen() {
  const navigation = useNavigation();
  const { addToDo } = useContext(ToDoContext);

  const handleAddToDo = async (data: { toDo: string }) => {
    addToDo(data.toDo);
    navigation.goBack();
  }

  return (
    <Wrapper>
      <Container>
        <BackBtn onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color="white" />
        </BackBtn>

        <Title>Adicionar um ToDo</Title>

        <Formik
          initialValues={{
            toDo: '',
          }}
          validationSchema={schema}
          onSubmit={handleAddToDo}
        >
          {({ errors, handleSubmit, setFieldValue, values }) => (
            <FormContainer>
              <TextField
                value={values.toDo}
                placeholder='Descrição'
                placeholderTextColor='gray'
                onChangeText={(text) => setFieldValue('toDo', text)}
              />
              {errors.toDo && <ErrorMessage>{errors.toDo}</ErrorMessage>}
              <SubmitBtn onPress={() => handleSubmit()}>
                <SubmitText>Adicionar ToDo</SubmitText>
              </SubmitBtn>
            </FormContainer>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}

export { AddToDoScreen };
