import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";

export class Home extends Component {
  render() {
    const data = [
      { id: 1, name: "mukesh", position: "web dev" },
      { id: 2, name: "suresh", position: "android dev" },
      { id: 3, name: "ramesh", position: "ML expert" },
      { id: 4, name: "hitesh", position: "web dev" },
    ];

    const renderList = data.map((item) => {
      return (
        <Card style={styles.card} key={item.id}>
          <View style={styles.cardView}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{
                uri: "https://www.holidify.com/images/bgImages/PAHALGAM.jpg",
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.position}</Text>
            </View>
          </View>
        </Card>
      );
    });
    return <View>{renderList}</View>;
  }
}

export default Home;
const styles = StyleSheet.create({
  card: {
    margin: 5,
  },
  cardView: {
    flexDirection: "row",
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
});
