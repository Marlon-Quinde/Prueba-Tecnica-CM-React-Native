import React, { useEffect, useState } from 'react'
import { ScrollView, View, useWindowDimensions } from 'react-native'
import {  API_JSON } from '../../../config/api/general'
import { PostInterface } from './interface/Posts.interface'

import {
  BarChart,
} from "react-native-chart-kit";
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { LoadingScreen } from '../loading/LoadingScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';


export interface Graficos {
  labels:   string[];
  datasets: Dataset[];
}

export interface Dataset {
  data: number[];
}

export interface Contador {
  palabra: string;
  contador: number
}


export const MapeoScreen = () => {

    const [peticion, setPeticion] = useState<ChartData>()

    const getCountries = async ()  => {
        const response = await API_JSON.get<PostInterface[]>('/posts')
        const arregloPalabras = response.data.map(({body}) => body).join(' ').toLowerCase().split(' ')
      

        let contador: any = {}
        arregloPalabras.forEach(palabra => {
          contador[palabra] = (contador[palabra] ?? 0) + 1
        });

        
        
        const nuevoObjetoPlabras =  Object.entries(contador).sort((a: any,b: any) => b[1] - a[1])
        const palabrasRepetidas: any = Object.fromEntries(nuevoObjetoPlabras.slice(0, 30))

        const arregloLabel = Object.keys(palabrasRepetidas)
        const arregloNumeros: number[] = Object.values(palabrasRepetidas)


        const dataGrafico: ChartData = {
          labels: arregloLabel,
          datasets: [
            {data: arregloNumeros}
          ]
        }
        setPeticion(dataGrafico)
        
    }

    const navigation = useNavigation<NavigationProp<RootStackParams>>()

    useEffect(  () => {
        getCountries()
    }, [])

    const {width} = useWindowDimensions()

  if(!peticion) {
    return ( <LoadingScreen />)
  }
    
  return (
    <View style={{flex: 1 }}>
      <ScrollView horizontal>
        <BarChart 
          style={{flex: 1, alignItems: 'center', justifyContent:'center'}}
          data={peticion}
          width={1000}
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "red",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        />

      </ScrollView>
    </View>
  )
}
