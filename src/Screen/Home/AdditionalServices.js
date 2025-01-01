import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import colorConstant from '../../constant/colorConstant';
import ImageConstant from '../../constant/ImageConstant';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import CustomProgressSteps from '../../Component/CustomProgressSteps';
import {convertTypeAcquisitionFromJson} from 'typescript';

const AdditionalServices = ({navigation,route}) => {
  const steps = ['Additional services', 'Review'];
  const buttonTextStyle = {
    color: '#393939',
  };
const cartid = route.params?.cartid

  return (
    <SafeAreaView style={styles.container}>
      <CustomProgressSteps steps={steps} navigation={navigation} cartid={cartid} />
    </SafeAreaView>
  );
};

export default AdditionalServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
});
