import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colorConstant from '../../constant/colorConstant'
import { Image } from 'react-native'
import appConstant from '../../constant/appConstant'

const EnquiryList = (props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
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
            Enquiry List
          </Text>
        </View>
              <View style={{width: '90%', alignSelf: 'center'}}>
       {[1,2,3].map((v,i)=>{
        return(
          <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: colorConstant.white,
            shadowColor: 'rgba(0, 0, 0, 0.10)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 0.5,
            padding: 15,
            marginTop: '5%',
            borderRadius:10,
            columnGap:10,
            borderWidth:1,
            flex:1
          }}
          onPress={()=>{props.navigation.navigate(appConstant.ChatScreen)}}
          >
            <View>
              <Image source={require('../../Img/icon/profile.png')} style={{width:40,height:40}}/>
            </View>
            <View style={{flex:3}}>
              <Text style={styles.cardTitle1}>Enquiry 1/ <Text style={styles.cardTitle2}>Dubai Warehouse</Text></Text>
              <Text style={styles.cardContent}>Lorem ipsum dolor sit amet </Text>
            </View>
            <View style={{flexWrap:'wrap'}}>
              <Text style={styles.daysContent}>3 days ago</Text>
            </View>

        </TouchableOpacity>
        )
       })}
        </View>
     
      </ScrollView>
    </SafeAreaView>
  )
}

export default EnquiryList

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
    width: 25,
    height: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  touchImg: { width: 12, height: 12 },
  container1Text1: { marginLeft: 10, color: '#000', fontSize: 15 },
  cardContent:{
    color:colorConstant.grayColor,
    fontSize:12,
    letterSpacing:0.36,
    marginTop:6
  },
  cardTitle1:{
        color:'#191E3B',
        fontSize:14,
        fontWeight:'500',
        letterSpacing:0.42,
        
        
  },
  cardTitle2:{
        color:'rgba(25, 30, 59, 0.70)',
        fontWeight:'400',
        
  },
  daysContent:{
    color:'rgba(25, 30, 59, 0.50)',
    fontSize:14,
    letterSpacing:0.42,
    flexWrap:'wrap',
    
  }
})