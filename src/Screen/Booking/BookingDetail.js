import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import appConstant from '../../constant/appConstant';
import {getOrderDetail} from '../../Utility/api';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingDetails = ({navigation, route}) => {
  const [openSection, setOpenSection] = useState(null);
  const id = route.params?.id;
  console.log('id', id);
  const toggleSection = section => {
    setOpenSection(openSection === section ? null : section);
  };
  const [bookingData, setbookingData] = useState(null);
  const [userData, setuserData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getuserData();
    getDetails();
  }, [id]);

  const getuserData = async () => {
    const user = await AsyncStorage.getItem('userData');
    console.log('user--', JSON.parse(user));
    if (user) {
      setuserData(JSON.parse(user));
    }
  };

  const getDetails = async () => {
    const res = await getOrderDetail(id);
    console.log('res---', res?.status);
    if (res?.status) {
      setbookingData(res?.data);
    } else {
      Toast.show({
        type: 'error',
        text1: res?.message,
      });
    }
    setisLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}

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
          Booking History/{''}
          <Text style={styles.container1Text2}> #{bookingData?.order_no}</Text>
        </Text>
      </View>

      {!isLoading && bookingData?.id && (
        <View>
          {/* Booking Status and Buttons */}
          <View style={styles.bookingStatusContainer}>
            <Text style={styles.bookingId}>#{bookingData?.order_no}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Confirmed</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>View Invoice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                navigation.navigate(appConstant.ManageBooking, {bookingData});
              }}>
              <Text style={styles.buttonText}>Manage Booking</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView>
            {/* Booking Details */}
            <View style={styles.sectionTable}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('bookingDetails')}>
                <Text style={styles.sectionTitle}>Booking Details</Text>
                {/* <Icon
            name={
              openSection === "bookingDetails" ? "chevron-up" : "chevron-down"
            }
            size={24}
            color="#555"
          /> */}
                <Image
                  source={
                    openSection === 'bookingDetails'
                      ? require('../../Img/icon/upArrow.png')
                      : require('../../Img/icon/downArrow.png')
                  }
                  style={{width: 18, height: 10}}
                />
              </TouchableOpacity>
              {openSection === 'bookingDetails' && (
                <View style={styles.sectionContent}>
                  {bookingData?.created_at && (
                    <DetailRow
                      label="Date Created"
                      value={moment(bookingData?.created_at).format(
                        'YYYY-MM-DD',
                      )}
                    />
                  )}
                  {bookingData?.checkin && (
                    <DetailRow
                      label="Start Date"
                      value={moment(bookingData?.checkin).format('YYYY-MM-DD')}
                    />
                  )}
                  {bookingData?.checkin && (
                    <DetailRow
                      label="End Date"
                      value={moment(bookingData?.checkout).format('YYYY-MM-DD')}
                      isLine={false}
                    />
                  )}
                </View>
              )}
            </View>

            {/* Customer Details */}
            <View style={styles.sectionTable}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('customerDetails')}>
                <Text style={styles.sectionTitle}>Customer Details</Text>
                {/* <Icon
            name={
              openSection === "customerDetails" ? "chevron-up" : "chevron-down"
            }
            size={24}
            color="#555"
          /> */}
                <Image
                  source={
                    openSection === 'customerDetails'
                      ? require('../../Img/icon/upArrow.png')
                      : require('../../Img/icon/downArrow.png')
                  }
                  style={{width: 18, height: 10}}
                />
              </TouchableOpacity>
              {userData && openSection === 'customerDetails' && (
                <View style={styles.sectionContent}>
                  <DetailRow label="Customer" value={userData?.first_name} />
                  <DetailRow
                    label="Email"
                    value={userData?.email}
                    isLine={false}
                  />
                </View>
              )}
            </View>

            {/* Warehouse Details */}
            <View style={styles.sectionTable}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('warehouseDetails')}>
                <Text style={styles.sectionTitle}>Warehouse Details</Text>
                {/* <Icon
            name={
              openSection === "warehouseDetails" ? "chevron-up" : "chevron-down"
            }
            size={24}
            color="#555"
          /> */}
                <Image
                  source={
                    openSection === 'warehouseDetails'
                      ? require('../../Img/icon/upArrow.png')
                      : require('../../Img/icon/downArrow.png')
                  }
                  style={{width: 18, height: 10}}
                />
              </TouchableOpacity>
              {openSection === 'warehouseDetails' && (
                <View style={styles.sectionContent}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Warehouse Name</Text>
                    <Text style={styles.tableHeader}>Sq Feet</Text>
                    <Text style={styles.tableHeader}>Price</Text>
                    <Text style={styles.tableHeader}>Total Days</Text>
                    <Text style={styles.tableHeader}>Total</Text>
                  </View>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      backgroundColor: 'rgba(25, 30, 59, 0.20)',
                      marginVertical: 10,
                    }}
                  />
                  <View style={styles.tableRow}>
                    <Text style={styles.tableText}>
                      {bookingData?.warehouse?.name}
                    </Text>
                    <Text style={styles.tableText}>{bookingData?.sq_feet}</Text>
                    <Text style={styles.tableText}>
                      AED {bookingData?.warehouse?.price}
                    </Text>
                    <Text style={styles.tableText}>
                      {bookingData?.no_of_days}
                    </Text>
                    <Text style={styles.tableText}>
                      AED {bookingData?.total_price}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* //Booking Summery */}
            <View style={styles.sectionTable}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection('bookingSummary')}>
                <Text style={styles.sectionTitle}>Booking Summary</Text>
                {/* <Icon
            name={
              openSection === "bookingSummary" ? "chevron-up" : "chevron-down"
            }
            size={24}
            color="#555"
          /> */}
                <Image
                  source={
                    openSection === 'bookingSummary'
                      ? require('../../Img/icon/upArrow.png')
                      : require('../../Img/icon/downArrow.png')
                  }
                  style={{width: 18, height: 10}}
                />
              </TouchableOpacity>
              {openSection === 'bookingSummary' && (
                <View style={styles.sectionContent}>
                  {/* <DetailRow label="Date Created" value="2024-11-14 18:15:53" />
            <DetailRow label="Start Date" value="2024-11-14" />
            <DetailRow label="End Date" value="2024-11-15" isLine={false} /> */}

                  <View style={styles.sectionContent}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>Description</Text>
                      <Text style={styles.tableHeader}>Price</Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'rgba(25, 30, 59, 0.20)',
                        marginVertical: 10,
                      }}
                    />
                    <View style={styles.tableRow}>
                      <Text style={styles.tableText}>Grand Total:</Text>
                      <Text style={styles.tableText}>AED 0.00</Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'rgba(25, 30, 59, 0.20)',
                        marginVertical: 10,
                      }}
                    />

                    <View style={styles.tableRow}>
                      <Text style={styles.tableText}>Shipping Charge:</Text>
                      <Text style={styles.tableText}>AED 0.00</Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'rgba(25, 30, 59, 0.20)',
                        marginVertical: 10,
                      }}
                    />

                    <View style={styles.tableRow}>
                      <Text style={styles.tableText}>Estimated Tax:</Text>
                      <Text style={styles.tableText}>AED 0.00</Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: 'rgba(25, 30, 59, 0.20)',
                        marginVertical: 10,
                      }}
                    />

                    <View style={styles.tableRow}>
                      <Text style={styles.tableHeader}>Total::</Text>
                      <Text style={styles.tableHeader}>
                        AED {bookingData?.total_price}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
       {!isLoading && !bookingData?.id && 
              <View style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
                <Text>No Booking Detail Found</Text>
              </View>
              }
              {isLoading &&
              <View style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>
                <ActivityIndicator size={30} color='#000'/>
              </View>
              }
    </View>
  );
};

const DetailRow = ({label, value, isLine = true}) => (
  <View
    style={[
      styles.detailRow,
      isLine && {
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderColor: 'rgba(25, 30, 59, 0.20)',
      },
    ]}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  container1: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  container1Touchable: {
    width: 25,
    height: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  touchImg: {width: 12, height: 12},
  container1Text1: {marginLeft: 10, color: '#191E3B'},
  container1Text2: {fontWeight: '600', fontSize: 15},
  title: {
    fontSize: 16,
    color: '#333',
  },
  bookingStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    marginTop: 20,
  },
  bookingId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191E3B',
    letterSpacing: 0.6,
  },
  statusBadge: {
    backgroundColor: '#00A94B',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: colorConstant?.colorPrimary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: colorConstant?.white,
    fontWeight: '700',
    fontSize: 16,
  },
  sectionTable: {
    marginTop: 10,
    marginHorizontal: 16,
    borderColor: 'rgba(25, 30, 59, 0.20)',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDEFF1',
    padding: 12,
    // marginTop: 10,
    // marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContent: {
    backgroundColor: '#FFF',
    // marginHorizontal: 16,
    padding: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingTop: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    columnGap: 7,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: '20%',
    flexWrap: 'wrap',
    flex: 1,
  },
  tableText: {
    fontSize: 12,
    color: '#555',
    width: '20%',
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default BookingDetails;
