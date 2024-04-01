import React, {useEffect} from 'react';
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
  item: string[];
}

export const ItemHeader = ({item}: Props) => {
  const {width} = useWindowDimensions();

  return (
    <View style={{...styles.container, backgroundColor: 'aquamarine'}}>
      <View style={{width: width * 0.1}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item[0]}
        </Text>
      </View>
      <View style={{width: width * 0.2}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item[1]}
        </Text>
      </View>
      <View style={{width: width * 0.2}}>
        <Text numberOfLines={3} style={{...styles.rows}}>
          {item[2]}
        </Text>
      </View>
      <View
        style={{
          width: width * 0.2,
        }}>
          <Text numberOfLines={3} style={{...styles.rows}}>Acciones</Text>
        </View>
      <View style={{width: width * 0.3}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, display: 'flex', flexDirection: 'row', borderWidth: 1},
  rows: {color: 'black'},
  head: {backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: 'black'},
});
