import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DetailRows from "./DetailRows";

function Floors({ floorNo, bua, updateBua }) {
  const [data, setData] = useState([{ purpose: "", sqft: "" }]);
  const [total, setTotal] = useState(0);

  function updateTotal(data) {
    function getSum(total, num) {
      return +total + +num.sqft;
    }
    const res = data.reduce(getSum, 0);
    setTotal(res);
    updateBua(floorNo, res);
  }

  function updateData(count, purpose, sqft, remove = false) {
    let tempData = [...data];
    remove
      ? tempData.splice(count, 1)
      : tempData.splice(count, 1, { purpose: purpose, sqft: sqft });
    setData(tempData);
    updateTotal(tempData);
  }

  function addRow() {
    let tempData = data;
    setData([...tempData, { purpose: "", sqft: "" }]);
  }

  const sqftErr = () => (total > bua ? "red" : "black");

  return (
    <View style={styles.containerBg}>
      <Text style={{ marginBottom: 8, fontWeight: 700 }}>
        Floor No. {floorNo}, with {bua} Sq.ft. BUA
      </Text>
      {data.map((det, index) => (
        <DetailRows count={index} updateData={updateData} data={det} />
      ))}
      <TouchableOpacity style={styles.nextBtn} onPress={() => addRow()}>
        <Text>+ Add More</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10, color: sqftErr() }}>
        Total BUA for floor no. {floorNo} = {total} Sq.ft.
      </Text>
    </View>
  );
}

export default Floors;

const styles = StyleSheet.create({
  labelTxt: {},
  buaEntry: {
    borderWidth: 1,
  },
  containerBg: {
    maxWidth: 375,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 25,
    backgroundColor: "#f5f5f5",
    borderStyle: "dashed",
    borderColor: 'lightgrey'
  },
  nextBtn: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#faeab4",
    borderRadius: 5,
    // maxWidth: 100,
    // alignSelf: "flex-end",
  },
});
