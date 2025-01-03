import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colorConstant from "../../../constant/colorConstant";
import moment from "moment";

const ManageBookingComponent = ({bookingData}) => {
    const [sqFeet, setSqFeet] = useState("50");
    const [startDate, setStartDate] = useState(moment(bookingData?.checkin).format('Do MMM YYYY'));
    const [endDate, setEndDate] = useState(moment(bookingData?.checkout).format('Do MMM YYYY'));

    const totalArea = 2000.0;
    const costPerSqFeet = 10;
    const costOneDay = 500;
    const totalAmount = 4000;
    const payingAmount = 3500;

    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Manage Booking</Text>

            {/* Start and End Date */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={{ rowGap: 10 }}>
                        <Text style={styles.label}>Start Date</Text>
                        <Text style={styles.value}>{startDate}</Text>
                    </View>
                    {/* <Text style={styles.arrow}>→</Text> */}
                    <Image source={require('../../../Img/icon/arrowRightBlack.png')} style={{ width: 25, height: 10 }} />
                    <View style={{ rowGap: 10 }}>
                        <Text style={styles.label}>End Date</Text>
                        <Text style={styles.value}>{endDate}</Text>
                    </View>
                    {/* <Icon name="pencil" size={20} color="#1A3FA0" /> */}
                    <TouchableOpacity style={{ height: '100%' }}>
                        <Image source={require('../../../Img/icon/editblack.png')} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>



                </View>
            </View>

            {/* Enter Sq Feet */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Enter sq. feets:</Text>
                    <TextInput
                        style={styles.input}
                        value={sqFeet}
                        keyboardType="numeric"
                        onChangeText={setSqFeet}
                    />
                    <Image source={require('../../../Img/icon/editblack.png')} style={{ width: 18, height: 18, }} />
                </View>
            </View>

            {/* Booking Summary */}
            <View style={styles.summaryContainer}>
                <SummaryRow label="Total unbonded area" value={`${totalArea} Sq Feet`} />
                <SummaryRow label="Cost per sq. feet" value={`${costPerSqFeet} AED`} />
                <SummaryRow label="Cost for one day" value={`${costOneDay} AED`} />

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryBoldLabel}>Total Amount</Text>
                    <Text style={styles.summaryBoldValue}>{`${totalAmount} AED`}</Text>
                </View>
                <Text style={styles.subText}>Includes taxes and charges</Text>

                <View style={styles.summaryRow}>
                    <Text style={styles.summaryBoldLabel}>Paying Amount</Text>
                    <Text style={styles.summaryBoldValue}>{`${payingAmount} AED`}</Text>
                </View>
                <Text style={styles.subText}>Includes taxes and charges</Text>
            </View>

            <TouchableOpacity style={styles.BookButton} onPress={() => {}}>
                <Text style={styles.BookText}>Book now</Text>
            </TouchableOpacity>
        </View>
    );
};

// Reusable Row Component
const SummaryRow = ({ label, value }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1A3FA0",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(25, 30, 59, 0.20)'
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        fontSize: 12,
        color: "#888",

    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#191E3B",
    },
    arrow: {
        fontSize: 20,
        color: "#191E3B",
        marginHorizontal: 10,
    },
    input: {
        borderBottomWidth: 0,
        borderColor: "#DDD",
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        width: 50,
    },
    summaryContainer: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        // padding: 12,
        marginTop: 10,
        // shadowColor: "#000",
        // shadowOpacity: 0.1,
        // shadowOffset: { width: 0, height: 1 },
        // elevation: 2,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    summaryLabel: {
        fontSize: 14,
        color: "#555",
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    summaryBoldLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    summaryBoldValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A3FA0",
    },
    subText: {
        fontSize: 12,
        color: "#888",
        marginTop: -4,
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: "#DDD",
        marginVertical: 8,
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
});

export default ManageBookingComponent;
