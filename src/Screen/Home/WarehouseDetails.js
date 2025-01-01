import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colorConstant from '../../constant/colorConstant';
import {Rating, AirbnbRating} from 'react-native-ratings';
import ImageConstant from '../../constant/ImageConstant';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import appConstant from '../../constant/appConstant';
import {getAddtoCart, getAvailableSpace, getFetchReview, getWareHouseDetails} from '../../Utility/api';
import PageLoader from '../../Component/PageLoader';
import {ImgMediaUrl, ImgUrl} from '../../Utility/request';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const WarehouseDetails = ({navigation, route}) => {
  const {id} = route.params;
  const imageArray = [
    {id: 1, image: ImageConstant.homeImage},
    {id: 2, image: ImageConstant.homeImage},
    {id: 3, image: ImageConstant.homeImage},
    {id: 4, image: ImageConstant.homeImage},
    {id: 5, image: ImageConstant.homeImage},
  ];
  const [isPageLoader, setisPageLoader] = useState(true);
  const [details, setDetails] = useState(null);
  const [selectedImg, setselectedImg] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(null);
  const [isopenCheckIn, setIsopenCheckIn] = useState(false);
  const [isopenCheckOut, setIsopenCheckOut] = useState(false);

  const [selectedValue, setSelectedValue] = useState(0);
  const sqFeetOptions = [10, 20, 30, 40];
  const [unboundArea, setunboundArea] = useState(0)

  const getTomorrowISODate = async(number=1) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + number); // Increment the date by 1
    // return tomorrow.toISOString(); // Get the ISO format
    return tomorrow
  };

  useEffect(() => {
    resetDate()
  }, [])

  const resetDate = async()=>{
    const date1 = await getTomorrowISODate(1)
    const date2 = await  getTomorrowISODate(2)
    setCheckIn(date1)
    setCheckOut(date2)
  }

  useEffect(() => {
    if (id) {
      getDetails();
    }
  }, []);
const [allDetails, setallDetails] = useState(null)
  const getDetails = async () => {
    const res = await getWareHouseDetails(id);
    if(res?.data){
      setallDetails(res?.data)
    }
    if (res?.data?.warehouse) {
      setDetails(res?.data?.warehouse);
      setselectedImg(res?.data?.warehouse?.images?.[0]);
    } else {
      setDetails(null);
      setisPageLoader(false);

    }
    getDetailsReview()

  };
  const [reviewData, setReviewData] = useState(null)
  const getDetailsReview = async () => {
    const res = await getFetchReview(id);
    console.log('resss',res)
    if(res?.status){
      setReviewData(res);

    }else{
      setReviewData(null);

    }
   

    setisPageLoader(false);
  };


  const getAvailableSpaceApi = async()=>{
    const url = `checkin=${moment(checkIn).format('YYYY-MM-DD')}&checkout=${moment(checkOut).format('YYYY-MM-DD')}&is_bonded=1`
    const res = await getAvailableSpace(id,url)
    if(res.status){
      setunboundArea(res?.data?.amount)
    }
  }

  useEffect(() => {
    if(checkIn && checkOut){
      getAvailableSpaceApi()
    }
  }, [checkIn,checkOut])

  const getAddtoCartAPi = async()=>{
    // const data = {
    //   "check_in_date":moment(checkIn).format('DD/MM/YYYY'),
    //   "check_out_date":moment(checkOut).format('DD/MM/YYYY'),
    //   "sq_feet":selectedValue,
    //   "is_bonded":0
    // }
    const formdata = new FormData();
formdata.append("check_in_date", moment(checkIn).format('YYYY-MM-DD'));
formdata.append("check_out_date", moment(checkOut).format('YYYY-MM-DD'));
formdata.append("sq_feet",selectedValue.toString());
formdata.append("is_bonded", "0");
    const res = await getAddtoCart(id,formdata)
    console.log('daaaaaaa',JSON.parse(res).status)
    const ress = JSON.parse(res)
    if(ress?.status){
      Toast.show({
        type:'success',
        text1:ress?.message
      })
      const cartid = ress?.cart_id
   navigation.navigate(appConstant.AdditionalServices,{cartid});

    }else{
      Toast.show({
        type:'error',
        text1:ress?.message
      })
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.container1Touchable}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../Img/icon/back.png')}
              style={styles.touchImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.container1Text1}>
            Home /{' '}
            <Text style={styles.container1Text2}> Warehouse details</Text>
          </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.container2Text1}>{details?.name}</Text>
          {/* <Text style={styles.container2Text2}>
            lorem Ipsum • lorem Ipsum • lorem Ipsum
          </Text> */}

          <View style={styles.subContainer}>
            <Rating style={{}} imageSize={20} ratingCount={5} startingValue={allDetails?.Reviewsaverage} />
            <Text style={styles.review}>{allDetails?.Reviews?.length} Reviews</Text>
          </View>

          {selectedImg?.image && (
            <Image
              source={{uri: ImgMediaUrl + selectedImg?.image}}
              style={styles.con2img}
              // resizeMode="contain"
            />
          )}

          <FlatList
            horizontal
            data={details?.images}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedImg(item);
                  }}>
                  <Image
                    source={{uri: ImgMediaUrl + item.image}}
                    style={[styles.flatimg, {marginLeft: index == 0 ? 0 : 15}]}
                    // resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            }}
            style={styles.flatlist}
          />
          <View style={styles.line}></View>
          <View style={styles.flView}>
            <Image
              style={styles.flImg}
              source={ImageConstant.location}
              resizeMode="contain"
            />
            <View style={styles.location}>
              <Text style={styles.loctext1}>Location & Accessibility</Text>
              <Text style={styles.loctext2}>
                {details?.warehouse_address_line1}{' '}
                {details?.warehouse_address_line2}
              </Text>
            </View>
          </View>
          <View style={styles.flView}>
            <Image
              style={styles.flImg}
              source={ImageConstant.size}
              resizeMode="contain"
            />
            <View style={styles.location}>
              <Text style={styles.loctext1}>Cargo Type</Text>
              <Text style={styles.loctext2}>Total square footage</Text>
            </View>
          </View>
          <View style={styles.flView}>
            <Image
              style={styles.flImg}
              source={ImageConstant.capacity}
              resizeMode="contain"
            />
            <View style={styles.location}>
              <Text style={styles.loctext1}>Available capacity</Text>
              <Text style={styles.loctext2}>Shelving & rack availability</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.TiView}>
            <Text style={styles.TiTitle}>Enter check in date</Text>
            <TouchableOpacity
              onPress={() => {
                setIsopenCheckIn(true);
              }}>
              <TextInput
                editable={false}
                placeholder="Add Dates"
                value={checkIn ? moment(checkIn).format('DD/MM/YYYY') : null}
                style={[
                  styles.Titext,
                  {paddingVertical: 0, height: 30},
                ]}></TextInput>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={isopenCheckIn}
              date={checkIn ?? new Date()}
              onConfirm={date => {
                setIsopenCheckIn(false);
                setCheckIn(date);
              }}
              onCancel={() => {
                setIsopenCheckIn(false);
              }}
            />
            {/* <TextInput placeholder="dd/mm/yyyy" style={[styles.Titext,{paddingVertical:0,height:30}]} /> */}
          </View>
          <View style={styles.TiView}>
            <Text style={styles.TiTitle}>Enter check out date</Text>
            <TouchableOpacity
              onPress={() => {
                setIsopenCheckOut(true);
              }}>
              <TextInput
                editable={false}
                placeholder="Add Dates"
                style={[styles.Titext, {paddingVertical: 0, height: 30}]}
                value={checkOut ? moment(checkOut).format('DD/MM/YYYY') : null}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={isopenCheckOut}
              minimumDate={checkIn}
              date={checkIn ?? new Date()}
              onConfirm={date => {
                setIsopenCheckOut(false);
                setCheckOut(date);
              }}
              onCancel={() => {
                setIsopenCheckOut(false);
              }}
            />
          </View>
          <View style={styles.TiView}>
            <Text style={styles.TiTitle}>Enter required sq. feets</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(!isModalVisible)}}>

            <TextInput placeholder="sq. feet" value={selectedValue>0 ?selectedValue.toString():''} editable={false} style={styles.Titext} />
            </TouchableOpacity>
          </View>

          <View style={styles.CalView}>
            <Text style={styles.CalText}>Total unbonded area</Text>
            <Text style={styles.CalText1}>{unboundArea} AED</Text>
          </View>
          <View style={styles.CalView1}>
            <Text style={styles.CalText}>Cost per sq. feet</Text>
            <Text style={styles.CalText1}>{details?.price} AED</Text>
          </View>
          <View style={styles.CalView1}>
            <Text style={styles.CalText}>Cost for one day</Text>
            <Text style={styles.CalText1}>{Number(selectedValue) * Number(details?.price)} AED</Text>
          </View>

          <View style={styles.line}></View>
          <View style={styles.CalView1}>
            <Text style={styles.CalText1}>Total</Text>
            <Text style={styles.CalText1}>{Number(selectedValue) * Number(details?.price)} AED</Text>
          </View>
          <Text style={styles.CalCharge}>Includes taxes and charges</Text>

          <TouchableOpacity
            style={styles.AddButton}
            onPress={() => {
              navigation.navigate(appConstant.EnquiryList);
            }}>
            <Text style={styles.AddText}>Add to wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.BookButton}
            disabled={Number(selectedValue) * Number(details?.price) < 1}
            onPress={() => {
              // navigation.navigate(appConstant.AdditionalServices);
              getAddtoCartAPi()
            }}>
            <Text style={styles.BookText}>Book now</Text>
          </TouchableOpacity>

          <Text style={styles.textTitle}>Warehouse description</Text>
          <Text style={styles.textBody}>{details?.description}</Text>

          <Text style={styles.textTitle}>What it offers</Text>

          {details?.properties?.length > 0 &&
            details?.properties.map((v, i) => {
              return (
                <View style={styles.flView}>
                  <Image
                    style={styles.flImg}
                    source={ImageConstant.location}
                    resizeMode="contain"
                  />
                  <Text style={styles.OfferText}>{v?.description}</Text>
                </View>
              );
            })}

          <TouchableOpacity
            style={styles.BookButton}
            onPress={() => {
              navigation.navigate(appConstant.ChatScreen);
            }}>
            <Text style={styles.BookText}>Connect with Host</Text>
          </TouchableOpacity>

          <Text style={styles.reviewText}>Reviews ({reviewData?.reviews?.length})</Text>
          <Text style={styles.reviewText1}>Overall rating</Text>
          <View style={styles.flView}>
            <Text style={styles.ratingText}>{reviewData?.reviews_average??0}</Text>
            <Image
              source={ImageConstant.star}
              style={styles.starImg}
              resizeMode="contain"
            />
          </View>

          {/* <View style={styles.flView}>
            <View style={styles.ratingView}>
              <Text style={styles.ratviText}>5</Text>
              <Image
                source={ImageConstant.star}
                style={styles.ratimg}
                resizeMode="contain"
              />
            </View>
            <ProgressBar
              progress={0.8}
              width={250}
              height={20}
              color="#F2CC00"
              borderWidth={0}
              style={styles.progress}
            />
            <Text style={styles.rattext}>105</Text>
          </View>

          <View style={styles.flView}>
            <View style={styles.ratingView}>
              <Text style={styles.ratviText}>4</Text>
              <Image
                source={ImageConstant.star}
                style={styles.ratimg}
                resizeMode="contain"
              />
            </View>
            <ProgressBar
              progress={0.5}
              width={250}
              height={20}
              color="#F2CC00"
              borderWidth={0}
              style={styles.progress}
            />
            <Text style={styles.rattext}>87</Text>
          </View>
          <View style={styles.flView}>
            <View style={styles.ratingView}>
              <Text style={styles.ratviText}>3</Text>
              <Image
                source={ImageConstant.star}
                style={styles.ratimg}
                resizeMode="contain"
              />
            </View>
            <ProgressBar
              progress={0.1}
              width={250}
              height={20}
              color="#F2CC00"
              borderWidth={0}
              style={styles.progress}
            />
            <Text style={styles.rattext}>30</Text>
          </View>
          <View style={styles.flView}>
            <View style={styles.ratingView}>
              <Text style={styles.ratviText}>2</Text>
              <Image
                source={ImageConstant.star}
                style={styles.ratimg}
                resizeMode="contain"
              />
            </View>
            <ProgressBar
              progress={0.2}
              width={250}
              height={20}
              color="#F2CC00"
              borderWidth={0}
              style={styles.progress}
            />
            <Text style={styles.rattext}>40</Text>
          </View> */}
          {reviewData?.star_percentages?.map((v,i)=>{
          return(
            <View style={styles.flView}>
            <View style={styles.ratingView}>
              <Text style={styles.ratviText}>{i+1}</Text>
              <Image
                source={ImageConstant.star}
                style={styles.ratimg}
                resizeMode="contain"
              />
            </View>
            <ProgressBar
              progress={v}
              width={250}
              height={20}
              color="#F2CC00"
              borderWidth={0}
              style={styles.progress}
            />
            <Text style={styles.rattext}>{v}</Text>
          </View>
          )
          })}

         

        {reviewData?.reviews?.map((v,i)=>{
          return(
            <View>
            <View style={styles.UserView}>
               <Image source={ImageConstant.user} style={styles.UserImg} />
               <View style={styles.UserSubView}>
                 <View style={styles.USteView}>
                   <Text style={styles.ratviText}>{v?.customer_name}</Text>
                   <Rating style={{marginLeft: '15%'}} imageSize={20} startingValue={v?.rating??0} />
                 </View>
                 {/* <Text style={styles.UserTextTiny}>Dubai • 1 weeks ago</Text> */}
               </View>
             </View>
   
             <Text style={styles.UserBody}>
               {v?.remark}
             </Text>
            </View>
          )
        })}

         
        </View>
      </ScrollView>
      <PageLoader visible={isPageLoader} />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Enter Sq feet value</Text>
            <Text style={styles.selectedValue}>{selectedValue}</Text>
            <View style={styles.optionsContainer}>
              {sqFeetOptions.map(value => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.optionButton,
                    selectedValue === value && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedValue(value)}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === value && styles.selectedOptionText,
                    ]}>
                    {value} sq. ft.
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default WarehouseDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {flex: 1, backgroundColor: colorConstant.white},
  container1: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  container1Touchable: {
    width: 30,
    height: 30,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  touchImg: {width: 12, height: 12},
  container1Text1: {marginLeft: 20, color: '#191E3B'},
  container1Text2: {fontWeight: '600', fontSize: 15},
  container2: {width: '90%', alignSelf: 'center', marginTop: '5%'},
  container2Text1: {
    fontSize: 18,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  container2Text2: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
    marginTop: '3%',
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '2%',
  },
  review: {
    marginLeft: 10,
    textDecorationLine: 'underline',
    color: colorConstant.textCOlor,
    fontSize: 14,
  },
  con2img: {
    width: '100%',
    height: 250,
    marginTop: '5%',
    borderRadius: 12,
  },
  flatimg: {
    width: 84,
    height: 84,
    borderRadius: 10,
  },
  flatlist: {
    marginTop: '5%',
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'lightgray',
    marginTop: '5%',
    marginBottom: '3%',
  },
  flView: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    paddingRight: 20,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  flImg: {width: 40, height: 40},
  location: {marginLeft: 10},
  loctext1: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  loctext2: {fontSize: 14},
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  TiView: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    borderColor: 'gray',
    marginTop: '5%',
  },
  TiTitle: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    marginLeft: 15,
    fontWeight: '500',
  },
  Titext: {
    fontSize: 12,
    color: '#000',
    marginLeft: 15,
    marginTop: 5,
    paddingVertical: 0,
    height: 30,
  },
  CalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  CalText: {fontSize: 16, color: 'gray', fontWeight: '400'},
  CalText1: {
    fontSize: 18,
    color: colorConstant.textCOlor,
    fontWeight: '700',
  },
  CalView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  CalCharge: {fontSize: 14, color: 'gray', fontWeight: '300'},
  AddButton: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddText: {
    fontSize: 20,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  BookButton: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorConstant.colorPrimary,
  },
  BookText: {
    fontSize: 20,
    color: colorConstant.white,
    fontWeight: '500',
  },
  textTitle: {
    fontSize: 22,
    color: colorConstant.textCOlor,
    fontWeight: '500',
    marginTop: '8%',
  },
  textBody: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '400',
    marginTop: '5%',
  },
  OfferText: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    fontWeight: '500',
    marginLeft: 15,
    paddingRight: 10,
  },
  reviewText: {
    fontSize: 22,
    color: colorConstant.textCOlor,
    fontWeight: '500',
    marginTop: '8%',
  },
  reviewText1: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    fontWeight: '500',
    marginTop: '5%',
  },
  ratingText: {
    fontSize: 30,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  starImg: {width: 25, height: 25, marginLeft: 5},
  ratingView: {flexDirection: 'row', alignItems: 'center'},
  ratviText: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  ratimg: {width: 14, height: 14, marginLeft: 5},
  progress: {
    height: 6,
    borderColor: 'transparent',
    backgroundColor: '#EEEEEE',
    marginLeft: 10,
  },
  rattext: {
    fontSize: 16,
    color: colorConstant.textCOlor,
    fontWeight: '500',
    marginLeft: 10,
  },
  UserView: {flexDirection: 'row', marginTop: '8%'},
  UserImg: {width: 45, height: 45},
  UserSubView: {marginLeft: 15},
  USteView: {flexDirection: 'row'},
  UserTextTiny: {fontSize: 14, marginTop: '2%'},
  UserBody: {
    fontSize: 16,
    marginTop: '2%',
    color: colorConstant.textCOlor,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'#000'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
    gap:10,
    flexWrap:'wrap'
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    // marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  optionText: {
    fontSize: 14,
    color: 'black',
  },
  selectedOptionText: {
    color: 'white',
  },
  doneButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
