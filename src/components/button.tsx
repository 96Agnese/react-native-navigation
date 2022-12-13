import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {Button, ButtonProps} from 'react-native-paper';

interface ButtonCustomProps extends ButtonProps {
  title: string;
  onPress: () => void;
}

const ButtonCustom: FC<ButtonCustomProps> = ({title, onPress}) => {
  return (
    <Button
      buttonColor={`#ff69b4`}
      onPress={onPress}
      mode="contained"
      textColor="white">
      {title}
    </Button>
  );
};

export default ButtonCustom;
