import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appConstant from '../../constant/appConstant';
import colorConstant from '../../constant/colorConstant';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import PageLoader from '../../Component/PageLoader';
import { getTab, getWareHouseList } from '../../Utility/api';
import Toast from 'react-native-toast-message';
import { ImgMediaUrl, ImgUrl } from '../../Utility/request';
import FilterLanding from '../../Modal/FilterLanding';
import Slider from '@react-native-community/slider';

const LandingScreen = props => {
  const [id, setId] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPageLoader, setisPageLoader] = useState(true)


  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [isopenCheckIn, setIsopenCheckIn] = useState(false)
  const [isopenCheckOut, setIsopenCheckOut] = useState(false)

  const [openCargoType, setOpenCargoType] = useState(false);
  const [cargoType, setCargoType] = useState(null);
  const [cargoTypeOption, setCargoTypeOption] = useState([]);

  const [categoriesData, setcategoriesData] = useState({})
  const [warehouseData, setWarehouseData] = useState([])
  const [currentPage, setcurrentPage] = useState(0)
  const [totalPage, settotalPage] = useState(0)
  const [nextPage, setnextPage] = useState(null)

  const [isModalFilterVisible, setModalFilterVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 20, max: 89 });
  const [spaceRange, setSpaceRange] = useState({ min: 900, max: 10900 });

  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [selectedCommodities, setSelectedCommodities] = useState([]);
const params = props.route.params
console.log('params',params)
  useEffect(() => {
    getCategories()
  if(!params?.filterUrl){
      getWareHouseListData()

  }
    
  }, [])

  const getCategories = async () => {
    const res = await getTab()
    if (res?.data) {
      setcategoriesData(res?.data)

      console.log('res?.data?.cargoTypes', res?.data?.cargoTypes?.length)
      if (res?.data?.cargoTypes?.length > 0) {
        const data = res?.data?.cargoTypes?.map((v, i) => {
          return { value: v.id, label: v.name }
        })
        setCargoTypeOption(data)


      }

      setPriceRange({ min: parseInt(res?.data?.priceRange?.min_price), max: parseInt(res?.data?.priceRange?.max_price) })
      setSpaceRange({ min: parseInt(res?.data?.spaceRange?.min_space), max: parseInt(res?.data?.spaceRange?.max_space) })
    }
    setisPageLoader(false)

  }
  const getWareHouseListData = async (urls = null) => {
    let url = urls ? urls : ''
    console.log('urks', url)
    const res = await getWareHouseList(url)
    if (res?.data?.warehouses) {
      if (res?.data?.warehouses?.data?.length > 0) {
        console.log('currentPage', currentPage)
        if (res?.data?.warehouses?.current_page > 1) {
          setWarehouseData([...warehouseData, ...res?.data?.warehouses?.data]);

        } else {
          setWarehouseData(res?.data?.warehouses?.data)

        }
      }
      setcurrentPage(res?.data?.warehouses?.current_page)
      settotalPage(res?.data?.warehouses?.total)
      setnextPage(res?.data?.warehouses?.next_page_url)
    }
    setisPageLoader(false)

  }
console.log('rrrr',warehouseData[0])
  const onpressMoreData = async () => {
    let urls = `?page=${currentPage + 1}`;
    if (cargoType) {
      urls = `${urls}cargo_type=${cargoType}&`
    }

    if (checkIn) {
      urls = `${urls}check_in_date=${moment(checkIn).format("YYYY-MM-DD")}`
    }
    if (checkOut) {
      urls = `${urls}check_out_date=${moment(checkOut).format("YYYY-MM-DD")}`
    }
    urls = `${urls}`
    getWareHouseListData(urls)
  }

  const onPressSearch = () => {
    let urls = ``;
    if (cargoType) {
      urls = `${urls}cargo_type=${cargoType}&`
    }

    if (checkIn) {
      urls = `${urls}check_in_date=${moment(checkIn).format("YYYY-MM-DD")}&`
    }
    if (checkOut) {
      urls = `${urls}check_out_date=${moment(checkOut).format("YYYY-MM-DD")}&`
    }
    if (selectedCommodities?.length > 0) {
      const commoditiesParams = selectedCommodities.map((item) => `commodities[]=${item}`).join("&");
      console.log('commoditiesParams', commoditiesParams)
      urls = `${urls}${commoditiesParams}&`;
    }

    if (selectedRestrictions?.length > 0) {
      const commoditiesParams = selectedRestrictions.map((item) => `restriction[]=${item}`).join("&");
      console.log('commoditiesParams', commoditiesParams)
      urls = `${urls}${commoditiesParams}&`;
    }

    if (priceRange?.max) {
      urls = `${urls}price_range=${priceRange?.min}-${priceRange?.max}&`

    }
    if (spaceRange?.max) {
      urls = `${urls}space_range=${spaceRange?.min}-${spaceRange?.max}&`
    }
    if (id?.length > 0) {
      const commoditiesParams = id.map((item) => `category[]=${item}`).join("&");
      urls = `${urls}${commoditiesParams}&`;
    }

    if (urls) {
      urls = `?${urls}`
    }
    getWareHouseListData(urls)
    console.log('urls', urls)
    setModalVisible(false)
  }

  useEffect(() => {
    if(id?.length > 0){

      onPressSearch()
    }

  }, [id])

  const handleRestrictionPress = (restriction) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((item) => item !== restriction)
        : [...prev, restriction]
    );
  };
  const handleCommoditiesPress = (restriction) => {
    setSelectedCommodities((prev) =>
      prev.includes(restriction)
        ? prev.filter((item) => item !== restriction)
        : [...prev, restriction]
    );
  };

  const toggleModal = () => setModalFilterVisible(!isModalFilterVisible);

  const onFilterData = (e) => {
    onPressSearch()
    setModalFilterVisible(false)
  }

  useEffect(() => {
    if(params?.filterUrl){
      const urls =`?${params?.filterUrl}`
       getWareHouseListData(urls)
 
     }
     
  }, [params?.filterUrl])

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
          data={categoriesData?.categories?.length > 0 ? categoriesData?.categories : []}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      id.includes(item.id) ? colorConstant.colorPrimary : '#ffff',
                  },
                ]}
                onPress={() => {
                  setId((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((items) => items !== item.id)
                      : [...prev, item.id]
                  );
                }}>
                <View style={styles.flhzview}>
                  <Image
                    source={require('../../Img/icon/caticon.png')}
                    style={styles.imgicon}
                    resizeMode='contain'
                    tintColor={id.includes(item.id) ? '#ffff' : '#000'}
                  />
                  <Text
                    style={[
                      styles.filterText,
                      { color: id.includes(item.id) ? '#ffff' : '#000' },
                    ]}>
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
          showsHorizontalScrollIndicator={false}

        />

      </View>
      <View>
        <TouchableOpacity style={[styles.loadMoreBtn, { display: 'flex', flexDirection: 'row', columnGap: 5, alignSelf: 'flex-end', marginHorizontal: 15, marginVertical: 5 }]} onPress={() => { setModalFilterVisible(true) }} >
          <Image
            source={require('../../Img/icon/filter.png')}
            style={styles.cardprimgicon}
            resizeMode="contain"
          />
          <Text style={styles.loadmoreText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={warehouseData}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => {
          const bgImg = ImgMediaUrl + item?.image?.image
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                props.navigation.navigate(appConstant.WarehouseDetails, { id: item.id });
              }}>
              <View style={styles.flinview}>
                {item?.image?.image && <Image source={{ uri: bgImg }} style={styles.cardImage} />}
                <View style={styles.flinsubview}>
                  <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                  <Text style={styles.flinsubvitext}>{item?.review?.[0]?.rating ?? 0} </Text>
                  <Image
                    source={require('../../Img/icon/Starwhite.png')}
                    style={{ width: 10, height: 10 }}
                    resizeMode="contain"
                  /> 
                  </View>
                 
                   <Text style={styles.flinsubvitext}>|</Text>
                  <Text style={styles.flinsubvitext}>{item?.review?.[0]?.status ?? 0}</Text>
                </View>
              </View>
              <Text style={styles.cardDistance}>{item.name}</Text>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../Img/icon/location1.png')}
                  style={styles.cardprimgicon}
                  resizeMode="contain"
                />
                <Text style={[styles.cardTitle, { marginLeft: 3 }]}>{item.emirate_type?.name}</Text>
              </View>
              {/* <Text style={styles.cardDistance}>{item.location}</Text> */}
              <View style={styles.cardprview}>
                <Text style={styles.cardPrice}>
                  {item.price}
                  <Text style={styles.cardDistance}>{'/sq. ft.'}</Text>
                </Text>
                <Pressable style={styles.cardprimgview} onPress={() => {
                  if (item?.coordinates) {
                    const coordinates = JSON.parse(item?.coordinates);
                    const { lat, lng } = coordinates;
                    const googleMapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                    Linking.openURL(googleMapUrl)
                  }
                }} >
                  <Image
                    source={require('../../Img/icon/location.png')}
                    style={styles.cardprimgicon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </TouchableOpacity>
          )
        }}
        ListFooterComponent={() => {
          return (
            <>
              {nextPage && <TouchableOpacity style={styles.loadMoreBtn} onPress={() => { onpressMoreData() }} >
                <Text style={styles.loadmoreText}>Load More</Text>
              </TouchableOpacity>}

            </>

          )
        }}
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
                { marginTop: Platform.OS == 'ios' ? 5 : 0 },
              ]}></TextInput>
          </View>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Check In</Text>
            <TouchableOpacity onPress={() => { setIsopenCheckIn(true) }}>
              <TextInput
                editable={false}
                placeholder="Add Dates"
                value={checkIn ? moment(checkIn).format('DD/MM/YYYY') : null}
                style={[
                  styles.modaltextInput,
                  { marginTop: Platform.OS == 'ios' ? 5 : 0 },
                ]}></TextInput>
            </TouchableOpacity>
            <DatePicker
              modal
              mode='date'
              open={isopenCheckIn}
              date={checkIn ?? new Date()}
              onConfirm={(date) => {
                setIsopenCheckIn(false)
                console.log('data', date)
                setCheckIn(date)
              }}
              onCancel={() => {
                setIsopenCheckIn(false)
              }}
            />
          </View>
          <View style={styles.modalSearchview}>
            <Text style={styles.modalsearchText}>Check Out</Text>
            <TouchableOpacity onPress={() => { setIsopenCheckOut(true) }}>


              <TextInput
                editable={false}
                placeholder="Add Dates"
                value={checkOut ? moment(checkOut).format('DD/MM/YYYY') : null}
                style={[
                  styles.modaltextInput,
                  { marginTop: Platform.OS == 'ios' ? 5 : 0 },
                ]}></TextInput>
            </TouchableOpacity>
            <DatePicker
              modal
              mode='date'
              open={isopenCheckOut}
              minimumDate={checkOut ?? new Date()}
              date={checkOut ?? new Date()}
              onConfirm={(date) => {
                setIsopenCheckOut(false)
                console.log('data', date)
                setCheckOut(date)
              }}
              onCancel={() => {
                setIsopenCheckOut(false)
              }}
            />
          </View>
          <View style={styles.modalSearchview}>
            <Text style={[styles.modalsearchText, { zIndex: 99999 }]}>Cargo Type</Text>
            {/* <TextInput
              placeholder="Select cargo type"
              style={[
                styles.modaltextInput,
                { marginTop: Platform.OS == 'ios' ? 5 : 0 },
              ]}></TextInput> */}
            <View style={{ height: 30 }}>


              <DropDownPicker
                open={openCargoType}
                value={cargoType}
                items={cargoTypeOption}
                setOpen={setOpenCargoType}
                setValue={setCargoType}
                // setItems={setItems}
                placeholder='Cargo Types'
                zIndex={9999}
                style={{ borderWidth: 0, paddingLeft: 0, height: 33, backgroundColor: '#fff' }}
                textStyle={{ color: 'gray' }}
                maxHeight={'100%'}
                containerStyle={{ paddingTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 0, marginLeft: 0 }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.modalTouchable}
            onPress={onPressSearch}>
            <Text style={styles.modaltouchableText}>Search</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        // isVisible={isModalFilterVisible}
        // onBackdropPress={toggleModal}
        style={styles.modal}

        animationType="slide"
        transparent={true}
        visible={isModalFilterVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >

        <View style={styles.modalContent}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.sectionTitle, { fontSize: 22, color: '#000' }]}>Filters</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={require('../../Img/icon/close.png')}
                style={styles.cardprimgicon}
                resizeMode="contain"
              />

            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.rangeContainer}>
              <TextInput
                style={styles.input}
                value={`AED ${priceRange.min}`}
                editable={false}
              />
              <Text style={styles.rangeText}>-</Text>
              <TextInput
                style={styles.input}
                value={`AED ${priceRange.max}`}
                editable={false}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={categoriesData?.priceRange?.min_price || 18}
              maximumValue={categoriesData?.priceRange?.max_price || 100}
              step={categoriesData?.priceRange?.price_step || 1}
              minimumTrackTintColor={colorConstant.colorPrimary}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={colorConstant.colorPrimary}
              onValueChange={(value) =>
                setPriceRange((prev) => ({ ...prev, max: Math.round(value) }))
              }
              value={priceRange.max}
            />

            <Text style={styles.sectionTitle}>Available Space Range</Text>
            <View style={styles.rangeContainer}>
              <TextInput
                style={styles.input}
                value={`${spaceRange.min} Sq ft`}
                editable={false}
              />
              <Text style={styles.rangeText}>-</Text>
              <TextInput
                style={styles.input}
                value={`${spaceRange.max} Sq ft`}
                editable={false}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={categoriesData?.spaceRange?.min_space}
              maximumValue={categoriesData?.spaceRange?.max_space}
              step={categoriesData?.spaceRange?.space_step}
              minimumTrackTintColor={colorConstant.colorPrimary}
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor={colorConstant.colorPrimary}
              onValueChange={(value) =>
                setSpaceRange((prev) => ({ ...prev, max: Math.round(value) }))
              }
              value={spaceRange.max}
            />

            <Text style={styles.sectionTitle}>Storage Restrictions</Text>
            <View style={styles.restrictionsContainer}>
              {categoriesData?.restriction?.map((item) => (
                <TouchableOpacity
                  key={item?.id}
                  style={[
                    styles.restrictionButton,
                    selectedRestrictions.includes(item.id) &&
                    styles.selectedRestriction,
                  ]}
                  onPress={() => handleRestrictionPress(item.id)}
                >
                  <Text
                    style={[
                      styles.restrictionText,
                      selectedRestrictions.includes(item.id) &&
                      styles.selectedRestrictionText,
                    ]}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Storage Commodities</Text>
            <View style={styles.restrictionsContainer}>
              {categoriesData?.commodities?.map((item) => (
                <TouchableOpacity
                  key={item?.id}
                  style={[
                    styles.restrictionButton,
                    selectedCommodities.includes(item.id) &&
                    styles.selectedRestriction,
                  ]}
                  onPress={() => handleCommoditiesPress(item.id)}
                >
                  <Text
                    style={[
                      styles.restrictionText,
                      selectedCommodities.includes(item.id) &&
                      styles.selectedRestrictionText,
                    ]}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              setPriceRange({ min: parseInt(categoriesData?.priceRange?.min_price), max: parseInt(categoriesData?.priceRange?.max_price) })
              setSpaceRange({ min: parseInt(categoriesData?.spaceRange?.min_space), max: parseInt(categoriesData?.spaceRange?.max_space) })
              setSelectedRestrictions([]);
              setSelectedCommodities([])
              toggleModal()
            }}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onFilterData}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <PageLoader visible={isPageLoader} />
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
  flhzview: { flexDirection: 'row' },
  imgicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginEnd: 10,
  },
  filterText: { color: '#fff', fontWeight: '400' },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  flinview: { width: '100%', height: 120 },
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
    display: 'flex',
    flexDirection: 'row',
columnGap:5
  },
  flinsubvitext: { color: '#fff', fontSize: 10 },
  cardImage: { width: '100%', height: '100%' },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#191E3B',
    textTransform: 'capitalize'
  },
  cardDistance: {
    fontSize: 12,
    color: '#191E3B',
    marginHorizontal: 5,
    marginVertical: 5,
    fontWeight: '700'
  },
  cardprview: { flexDirection: 'row', justifyContent: 'space-between' },
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
  cardprimgicon: { width: 15, height: 15 },
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
  modalsearchText: { fontSize: 16, color: colorConstant.textCOlor },
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
  modaltouchableText: { fontSize: 20, color: colorConstant.white },
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
  loadMoreBtn: {
    width: '80%',
    maxWidth: 100,
    height: 40,
    borderRadius: 4,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colorConstant.colorPrimary,
  },
  loadmoreText: {
    fontSize: 14,
    color: colorConstant.white,
    fontWeight: '500',
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    // maxHeight: Dimensions.get("window").height * 0.8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  rangeText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  restrictionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  restrictionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedRestriction: {
    backgroundColor: colorConstant.colorPrimary,
    borderColor: colorConstant.colorPrimary,
  },
  restrictionText: {
    color: "#000",
  },
  selectedRestrictionText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  clearText: {
    color: "#000",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: colorConstant.colorPrimary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
  },
});
