import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colorConstant from '../../constant/colorConstant';
import ImageConstant from '../../constant/ImageConstant';
import { getExplore } from '../../Utility/api';
import PageLoader from '../../Component/PageLoader';
import { ImgUrl } from '../../Utility/request';
import appConstant from '../../constant/appConstant';

const ExplorServices = ({navigation}) => {
  const locationData = [
    {id: 1, name: 'DUBAI', image: require('../../Img/toplocation/dubai.png')},
    {
      id: 2,
      name: 'ABU DHABI',
      image: require('../../Img/toplocation/abudhabi.png'),
    },
    {id: 3, name: 'AjMANI', image: require('../../Img/toplocation/AjMANI.png')},
    {
      id: 4,
      name: 'SHARJAH',
      image: require('../../Img/toplocation/SHARJAH.png'),
    },
    {
      id: 5,
      name: 'UMMAL QUWAIN',
      image: require('../../Img/toplocation/UMMALQUWAIN.png'),
    },
    {
      id: 6,
      name: 'RASALKHAIMAH',
      image: require('../../Img/toplocation/RASALKHAIMAH.png'),
    },
    {
      id: 7,
      name: 'FUJAIRAH',
      image: require('../../Img/toplocation/FUJAIRAH.png'),
    },
  ];
  const [isPageLoader, setisPageLoader] = useState(true)

  const [exploreData, setexploreData] = useState([])

  useEffect(() => {
    getExploreData()
  }, [])

const getExploreData = async () => {
    const res = await getExplore()
    if (res?.data) {
      setexploreData(res?.data)
    console.log('res',res.data)
     
    }
    setisPageLoader(false)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scroll}>
        <ImageBackground
          source={ImageConstant.services}
          style={styles.imgServices}
          resizeMode="contain">
          <TouchableOpacity style={styles.backIcon}>
            <Image
              source={require('../../Img/icon/back.png')}
              style={styles.imgIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.servText}>Explore Our Services</Text>
        </ImageBackground>

        <View style={styles.container}>

        

          
          <ImageBackground
            source={ImageConstant.Climate}
            style={styles.imgBack}
            borderRadius={8}>
            <View style={styles.imgsubContainer}>
              <Text style={styles.imgsubcontitText}>
                Climate-Controlled Storage
              </Text>
              <Text style={styles.imgsubconbodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </Text>
              <Text style={styles.readmore}>Read more</Text>
            </View>
          </ImageBackground>

          <ImageBackground
            source={ImageConstant.cold}
            style={styles.imgBack}
            borderRadius={8}>
            <View style={styles.imgsubContainer1}>
              <Text style={styles.imgsubcontitText}>Cold Storage</Text>
              <Text style={styles.imgsubconbodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </Text>
              <Text style={styles.readmore}>Read more</Text>
            </View>
          </ImageBackground>

          <ImageBackground
            source={ImageConstant.bulk}
            style={styles.imgBack}
            borderRadius={8}>
            <View style={styles.imgsubContainer}>
              <Text style={styles.imgsubcontitText}>Bulk Storage</Text>
              <Text style={styles.imgsubconbodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </Text>
              <Text style={styles.readmore}>Read more</Text>
            </View>
          </ImageBackground>

          <ImageBackground
            source={ImageConstant.controall}
            style={styles.imgBack}
            borderRadius={8}>
            <View style={styles.imgsubContainer1}>
              <Text style={styles.imgsubcontitText}>
                Climate-Controlled Storage
              </Text>
              <Text style={styles.imgsubconbodyText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et
              </Text>
              <Text style={styles.readmore}>Read more</Text>
            </View>
          </ImageBackground>

          <Text style={styles.text}>Top Location For Storage House</Text>

          <FlatList
            horizontal
            data={exploreData?.emirates || []}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={()=>{navigation.navigate(appConstant.LandingScreen,{filterUrl:`emirate=${item?.id}`})}}
                  style={[styles.flatView, {marginLeft: index == 0 ? 0 : 20}]}>
                  <Image source={{uri:ImgUrl+item?.image}} style={styles.flimg} />
                  <View style={styles.flinview}>
                    <Text style={styles.nametext}>{item?.name}</Text>
                    <View style={styles.flinsubview}>
                      <Image
                        source={require('../../Img/icon/Group.png')}
                        style={styles.flsubimg}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />


        </View>
      </ScrollView>
      <PageLoader visible={isPageLoader}  />

    </SafeAreaView>
  );
};

export default ExplorServices;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  scroll: {
    flex: 1,
  },
  imgServices: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  imgIcon: {
    width: 12,
    height: 12,
  },
  servText: {fontSize: 26, color: colorConstant.white},
  container: {width: '90%', alignSelf: 'center'},
  imgBack: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imgsubContainer: {
    width: '80%',
    height: 100,
    backgroundColor: colorConstant.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    padding: 15,
    borderBottomRightRadius: 8,
  },
  imgsubContainer1: {
    width: '80%',
    height: 100,
    backgroundColor: colorConstant.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    padding: 15,
    borderBottomLeftRadius: 8,
  },
  imgsubcontitText: {
    fontSize: 14,
    color: colorConstant.textCOlor,
    fontWeight: '700',
  },
  imgsubconbodyText: {fontSize: 12, color: 'gray'},
  readmore: {
    fontSize: 14,
    color: colorConstant.textCOlor,
    textDecorationLine: 'underline',
  },
  text: {
    marginTop: '5%',
    fontSize: 22,
    color: colorConstant.textCOlor,
    fontWeight: '500',
  },
  flatView: {
    width: 200,
    height: 230,
    marginTop: '5%',
  },
  flimg: {width: '100%', height: '100%', borderRadius: 4},
  flinview: {
    width: '90%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nametext: {
    color: colorConstant.white,
    fontSize: 16,
    fontWeight: '500',
  },
  flinsubview: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colorConstant.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flsubimg: {width: 25, height: 25},
});
