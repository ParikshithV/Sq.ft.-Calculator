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
      {showFloors && (
        <Text
          style={[styles.totalTxt, { color: sqftErr(), marginBottom: -10 }]}
        >
          Overall BUA: {overallBua} Sq.ft.
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
              />
            </View>
            <View style={{ width: "45%" }}>
              <Text style={styles.labelTxt}>Number of floors</Text>
              <TextInput
                onChangeText={(val) => setNoOfFlors(val)}
                style={styles.buaEntry}
                keyboardType={"numeric"}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => bua && noOfFlors && setShowFloors(true)}
          >
            <Text style={{ color: "white" }}>Next</Text>
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
    paddingLeft: 5,
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
    backgroundColor: "grey",
    borderRadius: 5,
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
