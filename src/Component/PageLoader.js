import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import colorConstant from '../constant/colorConstant';

const PageLoader = ({ visible, color = '#0000ff', size = 'large', backgroundColor = '#fff' }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator size={size} color={colorConstant.colorPrimary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageLoader;
