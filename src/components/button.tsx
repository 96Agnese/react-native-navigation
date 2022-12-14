import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {Button, ButtonProps} from 'react-native-paper';

interface ButtonCustomProps extends ButtonProps {
  title: string;
  onPress: () => void;
  colorBg: string;
}

const ButtonCustom: FC<ButtonCustomProps> = ({
  title,
  onPress,
  colorBg = '#191970',
}) => {
  return (
    <Button
      buttonColor={colorBg}
      onPress={onPress}
      mode="contained"
      textColor="white">
      {title}
    </Button>
  );
};

export default ButtonCustom;
