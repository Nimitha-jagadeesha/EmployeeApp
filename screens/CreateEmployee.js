import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";

const CreateEmployee = () => {
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [pic, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        value={Name}
        style={styles.inputStyle}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <TextInput
        label="Email"
        value={email}
        style={styles.inputStyle}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        label="Phone Number"
        value={phone}
        style={styles.inputStyle}
        theme={theme}
        mode="outlined"
        keyboardType="number-pad"
        onChangeText={(text) => setPhone(text)}
      ></TextInput>
      <TextInput
        label="Salary"
        value={salary}
        style={styles.inputStyle}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setSalary(text)}
      ></TextInput>
      <Button
        icon="upload"
        mode="contained"
        style={styles.inputStyle}
        theme={theme}
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
      icon="content-save"
      mode="contained"
      style={styles.inputStyle}
      theme={theme}
      onPress={() =>console.log("saved")}
    >
      Save
    </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              mode="contained"
              theme={theme}
              onPress={() => setModal(false)}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => setModal(false)}
            >
              Gallary
            </Button>
          </View>
          <Button
            mode="text"
            theme={theme}
            onPress={() => setModal(false)}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default CreateEmployee;
