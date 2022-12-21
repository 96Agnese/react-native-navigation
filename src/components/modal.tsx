import {View, Text, Modal, Pressable} from 'react-native';
import React, {FC, ReactNode, useState} from 'react';

interface ModalComponnetProps {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible?: ((value: boolean) => void) | undefined;
}

const ModalComponnet: FC<ModalComponnetProps> = ({
  modalVisible,
  setModalVisible,
  children,
}) => {
  if (!modalVisible) {
    return null;
  }

  return (
    <Modal
      hardwareAccelerated
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible?.(!modalVisible)}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#00000099',
        }}>
        <View
          style={{
            padding: 20,
            height: 200,
            width: 300,
            backgroundColor: '#fff',
            borderRadius: 20,
          }}>
          {children}
          {/* <Text>WARNING</Text>
          <Text>3 CHARACTER</Text>
          <Pressable onPress={() => setShowWarning(false)}>
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: 'yellow',
              }}>
              OK
            </Text>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponnet;
