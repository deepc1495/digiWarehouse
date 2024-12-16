import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appConstant from '../../constant/appConstant';
import colorConstant from '../../constant/colorConstant';

const LandingScreen = props => {
  const [id, setId] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const catagories = [
    {id: 1, name: 'Government', icon: require('../../Img/icon/government.png')},
    {
      id: 2,
      name: 'Distribution',
      icon: require('../../Img/icon/Distribution.png'),
    },
    {
      id: 3,
      name: 'Cold storage',
      icon: require('../../Img/icon/coldstorage.png'),
    },
    {
      id: 4,
      name: 'Fulfillment',
      icon: require('../../Img/icon/fullfill.png'),
    },
    {
      id: 5,
      name: 'Order picking',
      icon: require('../../Img/icon/orderpackinng.png'),
    },
    {
      id: 6,
      name: 'Space for rent',
      icon: require('../../Img/icon/rent.png'),
    },
    {
      id: 7,
      name: 'Consolidated',
      icon: require('../../Img/icon/fullfill.png'),
    },
  ];
  const warehouses = [
    {
      id: '1',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Sharjah',
      distance: '29 km away',
      price: 'AED 120',
      location: 'Dubai',
    },
    {
      id: '2',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Dubai',
      distance: '22 km away',
      price: 'AED 150',
      location: 'Dubai',
    },
    {
      id: '3',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Abu Dhabi',
      distance: '50 km away',
      price: 'AED 100',
      location: 'Dubai',
    },
    {
      id: '4',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Fujairah',
      distance: '80 km away',
      price: 'AED 90',
      location: 'Dubai',
    },
    {
      id: '5',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Sharjah',
      distance: '29 km away',
      price: 'AED 120',
      location: 'Dubai',
    },
    {
      id: '6',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Dubai',
      distance: '22 km away',
      price: 'AED 150',
      location: 'Dubai',
    },
    {
      id: '7',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Abu Dhabi',
      distance: '50 km away',
      price: 'AED 100',
      location: 'Dubai',
    },
    {
      id: '8',
      image: require('../../Img/house1.png'),
      title: 'Warehouse in Fujairah',
      distance: '80 km away',
      price: 'AED 90',
      location: 'Dubai',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.subContainerView}>
          <View style={styles.subconimgview}>
            <Image source={require('../../Img/menu.png')} style={styles.icon} />
          </View>
          <TouchableOpacity
            style={styles.touchables}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              source={require('../../Img/search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.titletextview}>
            <Text style={styles.titletext}>Secure, Spacious & Ready</Text>
            <Text> for you!</Text>
          </Text>
          <Text style={styles.bodytext}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={catagories}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    index == id ? colorConstant.colorPrimary : '#ffff',
                },
              ]}
              onPress={() => {
                setId(index);
              }}>
              <View style={styles.flhzview}>
                <Image
                  source={item?.icon}
                  style={styles.imgicon}
                  tintColor={index == id ? '#ffff' : '#000'}
                />
                <Text
                  style={[
                    styles.filterText,
                    {color: index == id ? '#ffff' : '#000'},
                  ]}>
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={warehouses}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              props.navigation.navigate(appConstant.WarehouseDetails);
            }}>
            <View style={styles.flinview}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.flinsubview}>
                <Text style={styles.flinsubvitext}>4.1 | 272</Text>
              </View>
            </View>
            <Text style={styles.cardDistance}>{item.distance}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDistance}>{item.location}</Text>
            <View style={styles.cardprview}>
              <Text style={styles.cardPrice}>
                {item.price}
                <Text style={styles.cardDistance}>{'/sq. ft.'}</Text>
              </Text>
              <View style={styles.cardprimgview}>
                <Image
                  source={require('../../Img/icon/location.png')}
                  style={styles.cardprimgicon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Where</Text>
            <TextInput
              placeholder=" Serach your destination..."
              style={[
                styles.modaltextInput,
                {marginTop: Platform.OS == 'ios' ? 5 : 0},
              ]}></TextInput>
          </View>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Check In</Text>
            <TextInput
              placeholder="Add Dates"
              style={[
                styles.modaltextInput,
                {marginTop: Platform.OS == 'ios' ? 5 : 0},
              ]}></TextInput>
          </View>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Check Out</Text>
            <TextInput
              placeholder="Add Dates"
              style={[
                styles.modaltextInput,
                {marginTop: Platform.OS == 'ios' ? 5 : 0},
              ]}></TextInput>
          </View>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Cargo Type</Text>
            <TextInput
              placeholder="Select cargo type"
              style={[
                styles.modaltextInput,
                {marginTop: Platform.OS == 'ios' ? 5 : 0},
              ]}></TextInput>
          </View>

          <TouchableOpacity
            style={styles.modalTouchable}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modaltouchableText}>Search</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    height: '35%',
    width: '100%',
    backgroundColor: '#CBD0EC',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    opacity: 1.0,
    alignSelf: 'center',
  },
  subContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: '10%',
  },
  subconimgview: {
    width: 36,
    height: 36,
    backgroundColor: '#ffff',
    borderRadius: 18,
    alignItems: 'center',
  },
  touchables: {
    width: 36,
    height: 36,
    backgroundColor: '#ffff',
    borderRadius: 18,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 36,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textcontainer: {
    margin: 5,
    width: '95%',
    marginTop: '5%',
  },
  titletextview: {
    textAlign: 'center',
    fontSize: 20,
    color: colorConstant.colorPrimary,
    margin: 10,
  },
  titletext: {
    fontWeight: '500',
    fontSize: 20,
  },
  bodytext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 21,
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffff',
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    marginRight: 10,
    backgroundColor: colorConstant.colorPrimary,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    borderRadius: 10,
    padding: 10,
  },
  flhzview: {flexDirection: 'row'},
  imgicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginEnd: 10,
  },
  filterText: {color: '#fff', fontWeight: '400'},
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  flinview: {width: '100%', height: 120},
  flinsubview: {
    width: 60,
    height: 30,
    backgroundColor: '#232F3E',
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flinsubvitext: {color: '#fff', fontSize: 10},
  cardImage: {width: '100%', height: '100%'},
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#191E3B',
  },
  cardDistance: {
    fontSize: 12,
    color: '#888',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cardprview: {flexDirection: 'row', justifyContent: 'space-between'},
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginBottom: 10,
    color: '#191E3B',
  },
  cardprimgview: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232F3E',
    marginRight: 10,
    borderRadius: 4,
  },
  cardprimgicon: {width: 15, height: 15},
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginTop: '22%',
  },
  modalSearchview: {
    width: '90%',
    height: 65,
    backgroundColor: colorConstant.white,
    marginTop: '5%',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 15,
  },
  modalsearchText: {fontSize: 16, color: colorConstant.textCOlor},
  modaltextInput: {
    fontSize: 14,
    color: 'lightgray',
  },
  modalTouchable: {
    width: '90%',
    height: 65,
    backgroundColor: colorConstant.colorPrimary,
    marginTop: '5%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  modaltouchableText: {fontSize: 20, color: colorConstant.white},
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
