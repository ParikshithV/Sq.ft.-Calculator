import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Floors from "./Floors";

function MainScreen() {
  const [bua, setBua] = useState(0);
  const [noOfFlors, setNoOfFlors] = useState(0);
  const [dummyFloors, setDummyFloors] = useState([]);
  const [showFloors, setShowFloors] = useState(false);
  const [overallBua, setOverallBua] = useState([]);
  const [floorsTotal, setFloorsTotal] = useState([]);

  useEffect(() => {
    let resArr = [];
    let zeroArr = [];
    for (let index = 0; index < +noOfFlors; index++) {
      resArr.push(index);
      zeroArr.push(0);
    }
    setDummyFloors(resArr);
    setFloorsTotal(zeroArr);
  }, [noOfFlors]);

  function updateOverall(count, val) {
    let tempData = floorsTotal;
    tempData[count] = val;
    setFloorsTotal(tempData);

    function getSum(total, num) {
      return +total + +num;
    }

    const res = tempData.reduce(getSum, 0);
    setOverallBua(res);
  }

  const sqftErr = () => (overallBua > bua * noOfFlors ? "red" : "black");

  return (
    <View>
      {showFloors ? (
        <Text
          style={[styles.totalTxt, { color: sqftErr(), marginBottom: -10 }]}
        >
          Overall BUA: {overallBua} Sq.ft.
        </Text>
      ) : (
        <Text
          style={{
            marginTop: 25,
            marginBottom: -15,
            fontWeight: 800,
            fontSize: 25,
            textAlign: "center",
          }}
        >
          Sq.ft. Calculator
        </Text>
      )}
      {!showFloors ? (
        <View style={styles.containerBg}>
          <View style={styles.containerVue}>
            <View style={{ width: "45%" }}>
              <Text style={styles.labelTxt}>Total BUA</Text>
              <TextInput
                onChangeText={(val) => setBua(val)}
                style={styles.buaEntry}
                keyboardType={"numeric"}
                placeholder='ex. "1200"'
                placeholderTextColor={"#c9c9c9"}
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text style={styles.labelTxt}>Number of floors</Text>
              <TextInput
                onChangeText={(val) => setNoOfFlors(val)}
                style={styles.buaEntry}
                keyboardType={"numeric"}
                placeholder='ex. "2"'
                placeholderTextColor={"#c9c9c9"}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => bua && noOfFlors && setShowFloors(true)}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {dummyFloors.map((floor) => (
            <Floors floorNo={floor} bua={bua} updateBua={updateOverall} />
          ))}
        </View>
      )}
      {showFloors && (
        <Text style={[styles.totalTxt, { color: sqftErr() }]}>
          Overall BUA: {overallBua} Sq.ft.
        </Text>
      )}
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  labelTxt: {},
  buaEntry: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 5,
    marginTop: 2,
    borderRadius: 2,
  },
  containerVue: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  nextBtn: {
    alignSelf: "center",
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#faeab4",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#969696",
  },
  containerBg: {
    maxWidth: 375,
    // borderWidth: 1,
    borderRadius: 5,
    padding: 25,
    marginTop: 50,
    backgroundColor: "#f0f0f0",
  },
  totalTxt: {
    marginVertical: 15,
  },
});
