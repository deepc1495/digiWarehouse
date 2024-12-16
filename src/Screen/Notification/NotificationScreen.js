import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colorConstant from '../../constant/colorConstant'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../Component/Button'
const NotificationScreen = (props) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.scrollContainer}>
                <View>
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
                            Notification
                        </Text>
                    </View>
                    <View>

                    </View>
                </View>

                <View style={{ width: '90%', alignSelf: 'center' }}>
                    {[{ title: 'Enquiry 1', title2: "Dubai Warehouse", isUser: false },
                    { title: 'Devyani Shinde', isUser: true }
                    ].map((v, i) => {
                        return (
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: colorConstant.white,
                                    shadowColor: 'rgba(0, 0, 0, 0.10)',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    elevation: 5,
                                    padding: 15,
                                    marginTop: '5%',
                                    borderRadius: 10,
                                    columnGap: 10,
                                    display: 'flex',
                                    // backgroundColor:'red',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    paddingRight: 0




                                }}>

                                <View style={{ display: 'flex', flexDirection: 'row', columnGap: 10 }}>

                                    <View>
                                        {v?.isUser ? <Image source={require('../../Img/icon/profile.png')} style={{ width: 22, height: 22 }} /> :
                                            <Image source={require('../../Img/icon/image.png')} style={{ width: 22, height: 20 }} />}
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle1}>{v?.title}{!v?.isUser ? '/' : ''}{!v?.isUser && <Text style={styles.cardTitle2}>Dubai Warehouse</Text>}</Text>
                                        <Text style={styles.cardContent}>3 days ago </Text>
                                    </View>

                                </View>
                                <View style={{ position: 'absolute', right: 15, top: 10 }}>
                                    <Image source={require('../../Img/icon/action.png')} style={{ height: 30, width: 50 }} resizeMode='contain' />
                                </View>


                                <View>
                                </View>

                            </View>
                        )
                    })}
                </View>

            </ScrollView>
            <View style={{ backgroundColor: colorConstant.white }}>
                <TouchableOpacity style={styles.touchables} onPress={props.onPress}>
                    <Text style={styles.touchableText}>Mark all as read</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

    },
    scrollContainer: { flex: 1, backgroundColor: colorConstant.white },
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
    touchImg: { width: 12, height: 12 },
    container1Text1: { marginLeft: 20, color: '#000', fontSize: 15 },
    cardContent: {
        color: colorConstant.grayColor,
        fontSize: 12,
        letterSpacing: 0.36,
        marginTop: 6
    },
    cardTitle1: {
        color: '#191E3B',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.42

    },
    cardTitle2: {
        color: 'rgba(25, 30, 59, 0.70)',
        fontWeight: '400',

    },
    daysContent: {
        color: 'rgba(25, 30, 59, 0.50)',
        fontSize: 14,
        letterSpacing: 0.42

    },
    touchables: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(25, 30, 59, 0.70)',
        padding: 16,
        width: '90%',
        alignSelf: 'center'
    },
    touchableText: {
        fontSize: 16,
        color: 'rgba(25, 30, 59, 0.70)',
        textAlign:'center'

    }
})