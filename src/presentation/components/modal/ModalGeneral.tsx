import React, {PropsWithChildren} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../../config/theme/styles';

interface Props {
  visible: boolean;
  url: string;
  setVisible: (value: boolean) => void;
}

export const ModalGeneral = ({visible, setVisible, url}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={{flex: 1, justifyContent: 'center'  ,alignItems: 'center'}}>
        <View style={{width: '60%', padding: 10, display: 'flex', justifyContent:'center', borderRadius: 20,borderWidth: 1,borderBlockColor: 'black',backgroundColor: 'white' , alignItems: 'center'}}>
          <Image style={{width: 100, height: 100}} source={{uri: url}} />
          <Pressable
            style={globalStyles.btnPrimary}
            onPress={() => setVisible(false)}>
            <Text> Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
