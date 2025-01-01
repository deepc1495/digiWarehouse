import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { deleteCart, getCartList } from '../../Utility/api';
import { ImgMediaUrl } from '../../Utility/request';
import Toast from 'react-native-toast-message';

// Get device width and height
const {width, height} = Dimensions.get('window');

const CartListScreen = ({navigation}) => {
    const [cartListData, setCartListData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const getDetailsReview = async () => {
      const res = await getCartList();
      if(res?.status){
        setCartListData(res.data.data);
  
      }else{
        setCartListData([]);
  
      }
      setisLoading(false)
    };

    useEffect(() => {
      setisLoading(true)
      getDetailsReview()
    }, [navigation])


    const onPressDeleteCart = async(id)=>{
      const response = await deleteCart(id)
      const res = JSON.parse(response)
      if(res?.status){
        Toast.show({
          type:'success',
          text1:res?.message
        })
        setisLoading(true)
        getDetailsReview()
      }else{
        Toast.show({
          type:'error',
          text1:res?.message || res?.detail
        })
      }
    }
  const renderCartItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: ImgMediaUrl+item.warehouse?.image?.image}} style={styles.image} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartId}>Cart no: #{item.cart_no}</Text>
        <Text style={styles.title}>{item.warehouse?.name}</Text>
        <Text style={styles.date}>
          <Text style={{fontWeight:'400'}}>Start Date: </Text>{item.checkin} 
        </Text>
        <Text style={styles.date}>
        <Text style={{fontWeight:'400'}}>End Date:</Text> {item.checkout}        </Text>
      </View>
      <View style={styles.cartActions}>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>{onPressDeleteCart(item?.id)}}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <Text style={[styles.amount,{fontSize:12,marginTop:7,fontWeight:'400'}]}>Total amount</Text>
        <Text style={styles.amount}>AED {item.total_price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
        Cart List
        </Text>
      </View>
      {/* <Text style={styles.header}>Cart List</Text> */}
      <Text style={styles.subHeader}>Your Carts</Text>
      <FlatList
        data={cartListData}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>{
          return(
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height*0.7}}>
              <Text>Empty Cart</Text>
              </View>
          )
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: width * 0.05, // 5% of screen width
  },

  container1: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
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
  container1Text1: {marginLeft: 15, color: '#191E3B'},

  header: {
    fontSize: width * 0.06, // 6% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.02, // 2% of screen height
  },
  subHeader: {
    fontSize: width * 0.045, // 4.5% of screen width
    color: '#555',
    marginBottom: height * 0.02,
    marginTop:10
  },
  listContainer: {
    paddingBottom: height * 0.02,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f9f9f9',
    borderRadius: width * 0.02, // 2% of screen width
    marginBottom: height * 0.02,
    padding: width * 0.03,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: width * 0.2, // 20% of screen width
    height: width * 0.2, // Square image
    borderRadius: width * 0.01,
    marginRight: width * 0.03,
  },
  cartDetails: {
    flex: 1,
  },
  cartId: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#000',
    marginBottom: height * 0.005,
  },
  title: {
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.005,
    color:'#000'
  },
  date: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight:'600'
  },
  cartActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    borderRadius: width * 0.01,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  amount: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginTop: 2,
    color:'#000'
  },
});

export default CartListScreen;
