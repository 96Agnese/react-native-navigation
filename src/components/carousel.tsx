import {View, Image, Text} from 'react-native';
import React, {useState} from 'react';
//! library
import PagerView from 'react-native-pager-view';
import Theme from '../../../styles/theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
//! styles
import styles from '../../../screen/Order/CarouselHome/CarouselHome';
//! screen carousel
import OnBoardingHome1 from './OnBoardingHome1';
import OnBoardingHome2 from './OnBoardingHome2';
import OnBoardingHome3 from './OnBoardingHome3';
//! component

import {useSafeAreaInsets} from 'react-native-safe-area-context';
const CarouselHome = () => {
  const [position, setPosition] = useState<number>(0);
  const pageNum: number = 3;
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const {bottom, top} = useSafeAreaInsets();
  //!--> navigate --> usarlo solo quando non sono screen
  // const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#E5193D', '#7375B4']}
        style={styles.borderBottomSheet}>
        <View style={[styles.containerAddress, {paddingTop: top}]}>
          <View style={{paddingRight: 32}}></View>

          <Text style={styles.textAddress}>Via Carlo Mollino, 90, VI</Text>
          {/* <View style={{ paddingTop: top }}> */}

          {/* </View> */}
        </View>
        <PagerView
          style={{flex: 1, minHeight: 368}}
          scrollEnabled={true}
          initialPage={0}
          onPageSelected={e => setPosition(e.nativeEvent.position)}>
          <View key="1">
            <OnBoardingHome1 />
          </View>
          <View key="2">
            <OnBoardingHome2 />
          </View>
          <View key="3">
            <OnBoardingHome3 />
          </View>
        </PagerView>
        <View style={[styles.spaceGo]}>
          <View style={styles.direction}>
            {Array.apply(null, {length: pageNum}).map((dot, i) => (
              <Image
                key={i}
                style={[
                  styles.stylesCircle,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor:
                      position === i
                        ? Theme.colors.greys.white
                        : 'hsla(0, 0%, 100%, 0.3)',
                    marginRight: i < pageNum - 1 ? 8 : 0,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CarouselHome;
