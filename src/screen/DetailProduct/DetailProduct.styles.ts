import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  imgStyle: {
    height: 200,
    width: 200,
    flex: 1,
  },
  title: {
    marginHorizontal: 16,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 32,
  },
  productStyle: {
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
  description: {
    marginHorizontal: 16,
    fontSize: 18,
    marginTop: 16,
  },
  qtk: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  circleStyl: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 8,
    width: 35,
    marginHorizontal: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  directionCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  categoryStyle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
