import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import colorConstant from "../../constant/colorConstant";
import ManageBookingComponent from "./Components/ManageBookingComponent";

const ManageBooking = (props) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
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
                    Home/{''}
                    <Text style={styles.container1Text2}> Manage Booking</Text>
                </Text>
            </View>

          

            {/* Scrollable Content */}
            <ScrollView>
                {/* Booking Details */}
                <View style={styles.sectionTable}>
                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => toggleSection("bookingDetails")}
                    >
                        <Text style={styles.sectionTitle}>Booking Details</Text>
                       
                        <Image source={openSection === "bookingDetails" ? require('../../Img/icon/upArrow.png') : require('../../Img/icon/downArrow.png')} style={{ width: 18, height: 10 }} />
                    </TouchableOpacity>
                    {openSection === "bookingDetails" && (
                        <View style={styles.sectionContent}>
                            <DetailRow label="Date Created" value="2024-11-14 18:15:53" />
                            <DetailRow label="Start Date" value="2024-11-14" />
                            <DetailRow label="End Date" value="2024-11-15" isLine={false} />
                        </View>
                    )}

                </View>

                {/* Customer Details */}
                <View style={styles.sectionTable}>

                    <TouchableOpacity
                        style={styles.sectionHeader}
                        onPress={() => toggleSection("warehouseDetails")}
                    >
                        <Text style={styles.sectionTitle}>Warehouse Details</Text>
                  
                        <Image source={openSection === "warehouseDetails" ? require('../../Img/icon/upArrow.png') : require('../../Img/icon/downArrow.png')} style={{ width: 18, height: 10 }} />

                    </TouchableOpacity>
                    {openSection === "warehouseDetails" && (
                        <View style={styles.sectionContent}>
                            <DetailRow label="Warehouse" value="Dubai Warehouse" />
                            <DetailRow label="Sq Feet" value="50" />
                            <DetailRow label="Price" value="AED 400.00" />
                            <DetailRow label="Total days" value="1" />
                            <DetailRow label="Total" value="AED 500.00" isLine={false}/>
                        </View>
                    )}
                </View>

                <ManageBookingComponent/>


            </ScrollView>
        </View>
    );
};

const DetailRow = ({ label, value, isLine = true }) => (
    <View style={[styles.detailRow, isLine && { borderBottomWidth: 1, paddingBottom: 12, borderColor: 'rgba(25, 30, 59, 0.20)' }]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === 'ios'? 40:0,
    },
    container1: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '5%',
        alignItems: 'center',
        marginBottom:10
    },
    container1Touchable: {
        width: 25,
        height: 25,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    touchImg: { width: 12, height: 12 },
    container1Text1: { marginLeft: 10, color: '#191E3B' },
    container1Text2: { fontWeight: '600', fontSize: 15 },
 
    sectionTable: {
        marginTop: 10,
        marginHorizontal: 16,
        borderColor: 'rgba(25, 30, 59, 0.20)',
        borderWidth: 1,
        borderRadius: 8,
        overflow: 'hidden'
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EDEFF1",
        padding: 12,
        // marginTop: 10,
        // marginHorizontal: 16,

    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    sectionContent: {
        backgroundColor: "#FFF",
        // marginHorizontal: 16,
        padding: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
        paddingTop: 5
    },
    detailLabel: {
        fontSize: 14,
        color: "#555",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
        columnGap: 7
    },
    tableHeader: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        width: "20%",
        flexWrap: 'wrap',
        flex: 1
    },
    tableText: {
        fontSize: 12,
        color: "#555",
        width: "20%",
        flexWrap: 'wrap',
        flex: 1
    },
});

export default ManageBooking;
