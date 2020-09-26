import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
const openDial = (phone) => {
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${phone}`);
  } else {
    Linking.openURL(`telprompt:${phone}`);
  }
};
const Profile = (props) => {
  const {
    pic,
    name,
    position,
    email,
    phone,
    salary,
    _id,
  } = props.route.params.item;
  const { navigation } = props;
  const deleteEmployee = () => {
    fetch("https://employeeapp.glitch.me/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        Alert.alert(`Deleted sucessfully`);
        navigation.navigate("Home");
      });
  };

  const editEmployee = () => {
    navigation.navigate("create", {
      pic,
      name,
      position,
      email,
      phone,
      salary,
      _id,
    });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "20%" }}
      />
      <View style={{ alignItems: "center", marginTop: -50 }}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70 }}
          source={{
            uri: pic,
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Title>{name}</Title>
        <Text style={{ fontSize: 18 }}>{position}</Text>
      </View>
      <Card
        style={styles.mycard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#006aff" />
          <Text style={styles.myText}>{email}</Text>
        </View>
      </Card>
      <Card
        style={styles.mycard}
        onPress={() => {
          openDial(phone);
        }}
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" size={32} color="#006aff" />
          <Text style={styles.myText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" size={32} color="#006aff" />
          <Text style={styles.myText}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => editEmployee()}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => deleteEmployee()}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

export default Profile;
const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  myText: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
