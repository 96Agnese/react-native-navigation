import {View, Text, Modal, Pressable} from 'react-native';
import React, {FC, useState} from 'react';

interface ModalComponnetProps {}

const ModalComponnet: FC<ModalComponnetProps> = () => {
  const [showWarming, setShowWarning] = useState(false);

  return (
    <Modal
      hardwareAccelerated
      animationType="fade"
      transparent
      visible={showWarming}
      onRequestClose={() => setShowWarning(false)}>
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
          <Text>WARNING</Text>
          <Text>3 CHARACTER</Text>
          <Pressable onPress={() => setShowWarning(false)}>
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: 'yellow',
              }}>
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponnet;
