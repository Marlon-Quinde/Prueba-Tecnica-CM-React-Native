import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../../../config/theme/styles';
import {PhotosInterface} from '../interfaces/Photos.interface,';
import {API_URL} from '../../../../config/api/general';

interface Props {
  item: PhotosInterface;
  setImage: (url: string) => void;
  setReload: (value: boolean) => void
}

export const ItemTable = ({item, setImage, setReload}: Props) => {
  const {width} = useWindowDimensions();

  const saveInfo = async (item: PhotosInterface) => {

    const res = await API_URL.post<boolean>('/json/save', item);
    setReload(false)
    
    if (res.data) {
      Alert.alert('Guardado con exito', 'Guardado');
    } else {
      Alert.alert('Error al guardar', 'No Guardado');
    }
    setReload(true)

  };
  return (
    <View style={styles.container}>
      <View style={{width: width * 0.1}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item.id}
        </Text>
      </View>
      <View style={{width: width * 0.2}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item.title}
        </Text>
      </View>
      <View style={{width: width * 0.2}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item.url}
        </Text>
      </View>
      <View
        style={{
          width: width * 0.2,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            setImage(item.thumbnailUrl);
          }}>
          <Icon color={'black'} name="search-circle-outline" size={30} />
        </Pressable>
      </View>
      <View style={{width: width * 0.3}}>
        {item.guardado ? (
          <Pressable
            style={{
              ...globalStyles.btnPrimary,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.4,
              paddingHorizontal: 0
            }}>
            <Icon name="bookmarks-outline" size={15} color={'black'} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => saveInfo(item)}
            style={{
              ...globalStyles.btnPrimary,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="save-outline" size={15} />
            <Text style={{marginLeft: 3}}>Guardar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, display: 'flex', flexDirection: 'row', borderWidth: 1},
  rows: {color: 'black', flex: 1},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: 'black'},
});
