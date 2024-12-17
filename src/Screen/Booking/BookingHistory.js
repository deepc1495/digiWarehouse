import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import colorConstant from "../../constant/colorConstant";
import appConstant from "../../constant/appConstant";
// import { Picker } from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';

const BookingHistory = (props) => {
  const [selectedTab, setSelectedTab] = useState("Completed Booking");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "All", value: "all" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Under Process", value: "under_process" },
  ]);

  const bookings = [
    {
      id: 1,
      status: "Under Process",
      statusColor: "#F5B301",
      bookingNo: "#Booking-19",
      name: "sample21_",
      startDate: "2024-11-16",
      endDate: "2024-11-17",
      amount: "AED 63270.00",
      img: require('../../Img/house1.png')
    },
    {
      id: 2,
      status: "Confirmed",
      statusColor: "#30A644",
      bookingNo: "#Booking-19",
      name: "sample21_",
      startDate: "2024-11-16",
      endDate: "2024-11-17",
      amount: "AED 63270.00",
      img: require('../../Img/house1.png')

    },
    {
      id: 3,
      status: "Under Process",
      statusColor: "#F5B301",
      bookingNo: "#Booking-19",
      name: "sample21_",
      startDate: "2024-11-16",
      endDate: "2024-11-17",
      amount: "AED 63270.00",
      img: require('../../Img/house1.png')

    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.container1Touchable}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image
            source={require('../../Img/icon/back.png')}
            style={styles.touchImg}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.container1Text1}>
          Booking History
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Upcoming Booking" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Upcoming Booking")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Upcoming Booking" && styles.activeTabText,
            ]}
          >
            Upcoming Booking
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Completed Booking" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Completed Booking")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Completed Booking" && styles.activeTabText,
            ]}
          >
            Completed Booking
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {/* <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Confirmed" value="Confirmed" />
          <Picker.Item label="Under Process" value="Under Process" />
        </Picker>
      </View> */}

<View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="All"
          style={styles.dropdown}
          arrowIconStyle={{ tintColor: "rgba(25, 30, 59, 0.30)" }} // Set dropdown icon color to red
          dropDownContainerStyle={styles.dropdownList}
          textStyle={styles.dropdownText}
        />
      </View>

      {/* Booking List */}
      <ScrollView style={styles.bookingList}>
        {bookings.map((booking) => (
          <TouchableOpacity key={booking.id} style={styles.card} onPress={() => {
            props.navigation.navigate(appConstant.BookingDetails)
          }}>
            <Image
              source={booking?.img}
              style={styles.cardImage}
            />
            <View style={styles.cardDetails}>
              <Text style={[styles.status, { color: booking.statusColor }]}>
                {booking.status}
              </Text>
              <Text style={styles.bookingNo}>Booking no: {booking.bookingNo}</Text>
              <Text style={styles.name}>{booking.name}</Text>
              <Text style={styles.date}>
                Start Date: <Text style={{ fontWeight: '500' }}> {booking.startDate}</Text>
              </Text>
              <Text style={styles.date}>

                End Date:  <Text style={{ fontWeight: '500' }}> {booking.endDate}</Text>
              </Text>
              <Text style={styles.date}>
                Total amount: <Text style={styles.amount}>{booking.amount}</Text>

              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },


  container1: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
    marginBottom: 15
  },
  container1Touchable: {
    width: 25,
    height: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  touchImg: { width: 10, height: 10 },
  container1Text1: { marginLeft: 10, color: '#000', fontSize: 15 },

  header: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  headerTime: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colorConstant.colorPrimary,
    width: '90%',
    alignSelf: 'center',
  },
  tab: {
    paddingVertical: 10, flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  activeTab: {
    borderColor: colorConstant.colorPrimary,
    flex: 1,
    backgroundColor: colorConstant?.colorPrimary,
    borderRadius: 5
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: colorConstant.white,
    fontWeight: "400",
  },
  pickerContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  bookingList: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    marginBottom: 16,
    padding: 10,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-evenly",
  },
  status: {
    fontSize: 12,
    fontWeight: "500",
  },
  bookingNo: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#191E3B",
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  dropdownContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    zIndex: 1,
    width:'50%',
    marginBottom:20
  },
  dropdown: {
    borderColor: "rgba(25, 30, 59, 0.30)",
    borderRadius: 8,
  },
  dropdownList: {
    borderColor: "rgba(25, 30, 59, 0.30)",
  },
  dropdownText: {
    fontSize: 16,

  },
});

export default BookingHistory;
