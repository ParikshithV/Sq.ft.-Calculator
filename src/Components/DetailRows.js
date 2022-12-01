import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function DetailRows({ count, updateData, data }) {
  const [purpose, setPurpose] = useState("");
  const [sqft, setSqft] = useState(0);

  useEffect(() => {
    updateData(count, purpose, sqft);
  }, [purpose, sqft]);

  return (
    <View style={styles.containerVue}>
      <View style={{ width: "60%" }}>
        <Text style={styles.labelTxt}>Purpose</Text>
        <TextInput
          value={data.purpose}
          onChangeText={setPurpose}
          style={styles.buaEntry}
          placeholder='ex. "Kitchen"'
          placeholderTextColor={"#c9c9c9"}
        />
      </View>
      <View style={{ width: "30%" }}>
        <Text style={styles.labelTxt}>Sq.ft.</Text>
        <TextInput
          value={data.sqft}
          onChangeText={setSqft}
          style={styles.buaEntry}
          keyboardType={"numeric"}
        />
      </View>
      {count > 0 ? (
        <Text
          style={{ marginTop: 25, color: "red" }}
          onPress={() => updateData(count, purpose, sqft, true)}
        >
          X
        </Text>
      ) : (
        <Text
          style={{ marginTop: 25 }}
          onPress={() => updateData(count, purpose, sqft, true)}
        >
          {"   "}
        </Text>
      )}
    </View>
  );
}

export default DetailRows;

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
    justifyContent: "space-between",
    marginTop: 10,
  },
});
