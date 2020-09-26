import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = (props) => {
  const { navigation } = props;
  const { params } = props.route;
  console.log(props);
  const [name, setName] = useState(params ? params.name : "");
  const [phone, setPhone] = useState(params ? params.phone : "");
  const [email, setEmail] = useState(params ? params.email : "");
  const [salary, setSalary] = useState(params ? params.salary : "");
  const [modal, setModal] = useState(false);
  const [pic, setPicture] = useState(params ? params.pic : "");
  const [position, setPosition] = useState(params ? params.position : "");

  const submitData = () => {
    if (!params) {
      fetch("https://employeeapp.glitch.me/send-data", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          pic,
          phone,
          salary,
          email,
          position,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          Alert.alert(`saved sucessfully`);
          navigation.navigate("Home");
        });
    } else {
      fetch("https://employeeapp.glitch.me/update", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params._id,
          name,
          pic,
          phone,
          salary,
          email,
          position,
        }),
      })
        .then((res) => res.json)
        .then((data) => {
          Alert.alert(`Updated sucessfully`);
          navigation.navigate("Home");
        });
    }
  };

  const picFromGallary = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
        setModal(false);
      }
    } else {
      Alert.alert("You need to give us permission to work");
    }
  };

  const picFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!data.cancelled) {
        let newFile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
        setModal(false);
      }
    } else {
      Alert.alert("You need to give us permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "EmployeeApp");
    data.append("cloud_name", "nimitha");
    fetch("https://api.cloudinary.com/v1_1/nimitha/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
      })
      .catch((err) => {
        Alert.alert("Something went wrong!");
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="Name"
        value={name}
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
      <TextInput
        label="Position"
        value={position}
        style={styles.inputStyle}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setPosition(text)}
      ></TextInput>
      <Button
        icon={pic == "" ? "upload" : "check"}
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
        onPress={() => submitData()}
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
              onPress={() => picFromCamera()}
            >
              Camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => picFromGallary()}
            >
              Gallary
            </Button>
          </View>
          <Button mode="text" theme={theme} onPress={() => setModal(false)}>
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
