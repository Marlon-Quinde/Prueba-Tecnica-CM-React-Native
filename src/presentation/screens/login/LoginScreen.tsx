import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, Text, TextInput, View} from 'react-native';
import { globalStyles } from '../../../config/theme/styles';
import { API_URL } from '../../../config/api/general';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Login {
    email: string;
    password: string
}

export const LoginScreen = () => {
  const {control, getValues, handleSubmit, formState:{errors}} = useForm({
    defaultValues: {
     email: '',
      password: '',
    },
  });

  const loginApi = async (data: Login) => {

    console.log(data)
    // const res = await API_URL.get<boolean>('/auth/login')
  };

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '50%'}} >
        <Text style={{fontWeight: 'bold'}}>Correo</Text>
        <Controller
          control={control}
          name="email"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{borderWidth: 1, borderRadius: 10, width: '100%', marginTop: 3}}
              placeholder="Ingrese su correo"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              
            />
          )}
        />
        {errors.email && <Text style={{color: 'red', fontWeight: 'bold'}}>El correo es requerido</Text>}
      </View>
      <View style={{width: '50%', marginTop: 3}} >
        <Text style={{fontWeight: 'bold'}}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{borderWidth: 1, borderRadius: 10, width: '100%', marginTop: 3}}
              placeholder="Ingrese su contraseña"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              
            />
          )}
        />
        {errors.password && <Text style={{color: 'red', fontWeight: 'bold'}}>La contraseña es requerida</Text>}
      </View>

      <Pressable style={{...globalStyles.btnPrimary}} onPress={handleSubmit(loginApi)}> 
            <Text style={{color: 'white'}} >Inicia Sesion</Text>

      </Pressable>


      <Pressable onPress={() => navigation.navigate('RegisterScreen')}> 
            <Text style={{color: 'black', textDecorationLine: 'underline'}} >¿No tienes cuenta?, Registrate aqui</Text>

      </Pressable>
    </View>
  );
};
