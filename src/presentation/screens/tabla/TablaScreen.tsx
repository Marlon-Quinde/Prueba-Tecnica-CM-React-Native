import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {API_JSON, API_URL} from '../../../config/api/general';
import {PhotosInterface} from './interfaces/Photos.interface,';
import {FlatList} from 'react-native-gesture-handler';
import {LoadingScreen} from '../loading/LoadingScreen';
import {FlatGrid} from 'react-native-super-grid';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../config/theme/styles';
import { ModalGeneral } from '../../components/modal/ModalGeneral';
import { ItemTable } from './components/ItemTable';
import { ItemTableBack } from './components/ItemTableBack';
import { ItemHeader } from './components/ItemHeader';

export const TablaScreen = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [data, setData] = useState<PhotosInterface[]>();
  const [guardado, setGuardado] = useState<PhotosInterface[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false)
  const [uri, setUri] = useState<string>('')
  
  const getData = async () => {
    setIsloading(true);
    const dataPhoto = API_JSON.get<PhotosInterface[]>('/photos');
    const getPhotos = API_URL.get<PhotosInterface[]>('/jsn/register')
    const allPeticion = [dataPhoto, getPhotos]
    const [fotosApi, fotosBack] = await Promise.all(allPeticion)
    console.log(fotosBack.data)
    const setPrimeraTabla = fotosApi.data.map((res) => {
      const estaGuardado = fotosBack.data.some((guardado) => guardado.id == res.id)
      if(estaGuardado){
        res.guardado = true
      } else {
        res.guardado = false

      }
      return {
        ...res
      }
    })
    setGuardado(fotosBack.data)
    setData(setPrimeraTabla)
    setIsloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(reload){
      getData();
    }
  }, [reload]);


  const setImage = (url: string) => {
    console.log('llega')
    setUri(url)
    setModalVisible(true)
  }


  return (
    <>
      {
        isLoading ? <LoadingScreen /> :  <View>
        <FlatList
          data={data }
          style={{height: '50%'}}
          numColumns={1}
          stickyHeaderIndices={[0]} 
          ListHeaderComponent={() => (<ItemHeader item={['ID', 'Title', 'Url']} />)}
          ListHeaderComponentStyle={{ position: 'relative'}}
          
          renderItem={({item}) => (
            <ItemTable  item={item} setImage={setImage} setReload={setReload}/>
          )}
        />
        <FlatList
          data={guardado }
          style={{height: '50%'}}
          numColumns={1}
          stickyHeaderIndices={[0]} 
          ListHeaderComponent={() => (<ItemHeader item={['ID', 'Title', 'Url']} />)}
          renderItem={({item}) => (
            <ItemTableBack  item={item} setImage={setImage} setReload={setReload}/>
          )}
        />
        <ModalGeneral setVisible={setModalVisible} url={uri} visible={modalVisible} />
      </View>
      }
    </>
   
  );
};




