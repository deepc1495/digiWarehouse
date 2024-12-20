import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

const FilterLanding = (
    isModalVisible,
    onFilterData,
    toggleModal
) => {
//   const [isModalVisible, setModalVisible] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 20, max: 89 });
  const [spaceRange, setSpaceRange] = useState({ min: 900, max: 10900 });
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const restrictions = [
    "Temperature Sensitive",
    "Weight Limit",
    "Hazardous Materials",
    "Fragile",
    "High Security",
  ];

  const handleRestrictionPress = (restriction) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((item) => item !== restriction)
        : [...prev, restriction]
    );
  };

  console.log('isModalVisible',isModalVisible)

  return (
    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
    //     <Text style={styles.buttonText}>Open Filters</Text>
    //   </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.rangeContainer}>
              <TextInput
                style={styles.input}
                value={`AED ${priceRange.min}`}
                editable={false}
              />
              <Text style={styles.rangeText}>-</Text>
              <TextInput
                style={styles.input}
                value={`AED ${priceRange.max}`}
                editable={false}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={20}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#002855"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#002855"
              onValueChange={(value) =>
                setPriceRange((prev) => ({ ...prev, max: Math.round(value) }))
              }
              value={priceRange.max}
            />

            <Text style={styles.sectionTitle}>Available Space Range</Text>
            <View style={styles.rangeContainer}>
              <TextInput
                style={styles.input}
                value={`${spaceRange.min} Sq ft`}
                editable={false}
              />
              <Text style={styles.rangeText}>-</Text>
              <TextInput
                style={styles.input}
                value={`${spaceRange.max} Sq ft`}
                editable={false}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={900}
              maximumValue={20000}
              step={100}
              minimumTrackTintColor="#002855"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#002855"
              onValueChange={(value) =>
                setSpaceRange((prev) => ({ ...prev, max: Math.round(value) }))
              }
              value={spaceRange.max}
            />

            <Text style={styles.sectionTitle}>Storage Restrictions</Text>
            <View style={styles.restrictionsContainer}>
              {restrictions.map((restriction) => (
                <TouchableOpacity
                  key={restriction}
                  style={[
                    styles.restrictionButton,
                    selectedRestrictions.includes(restriction) &&
                      styles.selectedRestriction,
                  ]}
                  onPress={() => handleRestrictionPress(restriction)}
                >
                  <Text
                    style={[
                      styles.restrictionText,
                      selectedRestrictions.includes(restriction) &&
                        styles.selectedRestrictionText,
                    ]}
                  >
                    {restriction}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              setPriceRange({ min: 20, max: 89 });
              setSpaceRange({ min: 900, max: 10900 });
              setSelectedRestrictions([]);
            }}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onFilterData}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#002855",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    maxHeight: Dimensions.get("window").height * 0.8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
  },
  rangeText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  restrictionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  restrictionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedRestriction: {
    backgroundColor: "#002855",
    borderColor: "#002855",
  },
  restrictionText: {
    color: "#000",
  },
  selectedRestrictionText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#d3d3d3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  clearText: {
    color: "#000",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#002855",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default FilterLanding;
