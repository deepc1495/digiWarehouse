import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import colorConstant from '../constant/colorConstant';
import ImageConstant from '../constant/ImageConstant';
import appConstant from '../constant/appConstant';
import { orderPlaceApi, getFinalReview } from '../Utility/api';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const CustomProgressSteps = ({steps,navigation,cartid}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reviewData, setreviewData] = useState(null)
console.log('cartid',cartid)

useEffect(() => {
 getReviewData()
}, [cartid])

const getReviewData = async()=>{
  const res = await getFinalReview(cartid)
  console.log('ress---',res.status)
  if(res?.status){
    setreviewData(res?.data)
  }
}

  const moveNext = async() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }else{
      const ress = await orderPlaceApi(cartid)
      const res = JSON.parse(ress)
      console.log('resss',res)
      console.log('resss',res.status)
      if(res?.status){
        Toast.show({
          show:'success',
          text1:res?.message
        })
        const bookingid = res?.booking_id
      navigation.navigate(appConstant.BookingHistory)

      }
    }
  };

  const movePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  console.log('steps[currentStep]', currentStep);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.stepContainer}>
          {steps.map((step, index) => (
            <View
              key={index} // Ensure a unique key for each iteration
              style={{
                alignItems: 'center', // Centers both step number and title horizontally
                flexDirection: 'column', // Stack the number and title vertically
                flex: 1,
              }}>
              <View
                style={[
                  styles.step,
                  currentStep === index && styles.activeStep,
                  index < currentStep && styles.completedStep,
                ]}>
                <Text
                  style={[
                    styles.stepText,
                    {
                      color:
                        currentStep === index || index < currentStep
                          ? '#fff'
                          : '#000',
                    },
                  ]}>
                  {index + 1}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    {left: Platform.OS == 'ios' ? 130 : 110, width: Platform.OS == 'ios' ? 140 : 130,},
                  ]}
                />
              )}
              <Text
                style={[
                  styles.stepTitle,
                  {
                    color: currentStep === index ? '#000' : '#000', // Active step title color
                  },
                ]}>
                {step}
              </Text>
            </View>
          ))}
        </View>
        {/* <View style={styles.stepContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepWrapper}>
              <View
                style={[
                  styles.step,
                  currentStep === index && styles.activeStep,
                  index < currentStep && styles.completedStep,
                ]}>
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
              {index < steps.length - 1 && <View style={styles.stepLine} />}
            </View>
          ))}
        </View> */}
      </View>

      <View style={styles.contentContainer}>
        {currentStep == 0 ? (
          <ScrollView style={{flex: 1, backgroundColor: colorConstant.white}}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text
                style={{
                  marginTop: '5%',
                  fontSize: 22,
                  color: colorConstant.textCOlor,
                  fontWeight: '500',
                }}>
                Additional services
              </Text>

              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: colorConstant.white,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: '5%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    Forklift services ($29)
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontWeight: '500',
                      marginTop: '2%',
                    }}>
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: colorConstant.colorPrimary,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={ImageConstant.plus}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: colorConstant.white,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: '5%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    Crane services ($39)
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontWeight: '500',
                      marginTop: '2%',
                    }}>
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: colorConstant.colorPrimary,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={ImageConstant.plus}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: colorConstant.white,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  marginTop: '5%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    Additional help ($19)
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontWeight: '500',
                      marginTop: '2%',
                    }}>
                    Lorem ipsum dolor sit amet consectetur.
                  </Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: colorConstant.colorPrimary,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={ImageConstant.plus}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <Text
                style={{
                  marginTop: '8%',
                  fontSize: 22,
                  color: colorConstant.textCOlor,
                  fontWeight: '500',
                }}>
                Additional remarks
              </Text>

              <View
                style={{
                  width: '100%',
                  height: 100,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  borderColor: 'lighthgray',
                  marginTop: '5%',
                }}>
                <TextInput
                  placeholder="Write all the additional remarks you wants us to remember..."
                  style={{width: '90%', alignSelf: 'center'}}
                  multiline={true}
                />
              </View>

              <Text
                style={{
                  marginTop: '8%',
                  fontSize: 22,
                  color: colorConstant.textCOlor,
                  fontWeight: '500',
                }}>
                Price details
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '5%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  Fare/night
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  ${reviewData?.per_day_charge}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '400',
                  }}>
                  Total days
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  {reviewData?.no_of_days}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '400',
                  }}>
                  Fare for 7 days
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  $840.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '3%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '400',
                  }}>
                  Taxes and fee
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  ${reviewData?.taxes_and_fee}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '8%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  Total Fare
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  ${reviewData?.total_price}
                </Text>
              </View>
              <Text style={{fontSize: 14, color: 'gray', fontWeight: '300'}}>
                Includes taxes and charges
              </Text>
            </View>
          </ScrollView>
        ) : currentStep == 1 ? (
          <ScrollView>
            <View style={{flex: 1, backgroundColor: colorConstant.white}}>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <Text
                  style={{
                    marginTop: '5%',
                    fontSize: 22,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  Warehouse details
                </Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: colorConstant.white,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    padding: 15,
                    marginTop: '5%',
                  }}>
                  <Image
                    source={ImageConstant.homeImage}
                    style={{width: 120, height: 105, borderRadius: 8}}
                  />
                  <View style={{width: '60%', marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colorConstant.textCOlor,
                        fontWeight: '500',
                      }}>
                      {reviewData?.warehouse?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '400',
                        marginTop: '3%',
                      }}>
                       {reviewData?.warehouse?.description}

                    </Text>

                    <Text
                      style={{
                        fontSize: 20,
                        color: colorConstant.textCOlor,
                        fontWeight: '400',
                        marginTop: '3%',
                      }}>
                      ${reviewData?.per_day_charge}
                    
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'gray',
                          fontWeight: '400',
                          marginTop: '3%',
                        }}>
                        /night
                      </Text>
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    marginTop: '5%',
                    fontSize: 22,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  Rented period
                </Text>

                <View
                  style={{
                    width: '100%',
                    height: 80,
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    marginTop: '5%',
                    borderRadius: 8,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '300',
                      }}>
                      Check in
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colorConstant.textCOlor,
                        fontWeight: '500',
                      }}>
                      {moment(reviewData?.checkin).format('Do MMM YYYY')}
                    </Text>
                  </View>
                  <Image
                    source={ImageConstant.arrow}
                    style={{width: 40, height: 30, marginLeft: 15}}
                    resizeMode="contain"
                  />
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '300',
                      }}>
                      Check out
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colorConstant.textCOlor,
                        fontWeight: '500',
                      }}>
                      {moment(reviewData?.checkout).format('Do MMM YYYY')}
                      </Text>
                  </View>

                  <Image
                    source={ImageConstant.edit}
                    style={{
                      width: 18,
                      height: 18,
                      marginLeft: 15,
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={{
                    marginTop: '8%',
                    fontSize: 22,
                    color: colorConstant.textCOlor,
                    fontWeight: '500',
                  }}>
                  Price details
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '5%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    Fare/night
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    ${reviewData?.per_day_charge}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '3%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '400',
                    }}>
                    Total days
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    {reviewData?.no_of_days??0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '3%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '400',
                    }}>
                    Fare for 7 days
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    $840.00
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '3%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '400',
                    }}>
                    Taxes and fee
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    ${reviewData?.taxes_and_fee}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '8%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    Total Fare
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colorConstant.textCOlor,
                      fontWeight: '500',
                    }}>
                    ${reviewData?.total_price}
                  </Text>
                </View>
                <Text style={{fontSize: 14, color: 'gray', fontWeight: '300'}}>
                  Includes taxes and charges
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Text>Comming Soon</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: '5%',
        }}>
        <TouchableOpacity
          style={{
            width: 120,
            height: 58,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colorConstant.textCOlor,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
          onPress={movePrevious}>
          <Image
            source={ImageConstant.back}
            style={{width: 15, height: 15}}
            tintColor={colorConstant.textCOlor}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 20,
              color: colorConstant.textCOlor,
              fontWeight: '600',
              marginLeft: 5,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 120,
            height: 58,
            borderRadius: 8,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorConstant.colorPrimary,
            flexDirection: 'row',
          }}
          onPress={moveNext}>
          <Text
            style={{
              fontSize: 20,
              color: colorConstant.white,
              fontWeight: '600',
              marginRight: 5,
            }}>
            {currentStep === steps.length-1 ? 'Confirm':'Next'}
          </Text>
          <Image
            source={ImageConstant.next}
            style={{width: 15, height: 15}}
            tintColor={colorConstant.white}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colorConstant.colorPrimary,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  step: {
    height: 35,
    width: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd', // Default step background color
    position: 'relative', // Needed for positioning the line
  },
  stepConnector: {
    position: 'absolute',
    right: -100, // Extend the line to the next step
    height: 2, // Thickness of the line
    width: 100, // Length of the line
    backgroundColor: '#ddd', // Default connector color
  },
  activeStep: {
    backgroundColor: '#007bff',
  },
  completedStep: {
    backgroundColor: '#28a745',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTitle: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  stepLine: {
    position: 'absolute',
   

    top: 15,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },

  activeStep: {
    backgroundColor: colorConstant.colorPrimary,
    borderWidth: 0,
  },
  completedStep: {
    backgroundColor: colorConstant.colorPrimary,
    borderWidth: 0,
  },
  stepText: {
    fontWeight: 'bold',
  },

  contentContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    width: width * 0.4,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9e9e9e',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default CustomProgressSteps;
