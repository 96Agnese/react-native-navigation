import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

interface ButtonCustomProps extends ButtonProps {
  title?: string;
  onPress?: () => void;
  colorBg?: string;
}

const ButtonCustom: FC<ButtonCustomProps> = ({
  title,
  onPress,
  colorBg = '#191970',
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={{padding: 24, borderRadius: 8, minWidth: '100%'}}
        colors={['#0000ff', '#8a2be2']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
