import {View, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import {Button, ButtonProps, Title} from 'react-native-paper';

interface ButtonCategoryProps extends ButtonProps {
  title: string;
  onPress: () => void;
  colorBg: string;
  buttonCl: string;
}

const ButtonCategory: FC<ButtonCategoryProps> = ({
  title,
  onPress,
  buttonCl,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#48d1cc' : '#191970',
          padding: 8,
          borderRadius: 16,
          paddingHorizontal: 8,
          marginBottom: 16,
          minWidth: 40,
        },
      ]}>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ButtonCategory;
