import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card, FAB } from "react-native-paper";
export class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("https://employeeapp.glitch.me")
      .then((res) => res.json())
      .then((results) => {
        this.setState({ data: results, loading: false });
      })
      .catch((err) => {
        Alert.alert("Something went wrong!");
      });
  };
  render() {
    const renderList = (item) => {
      return (
        <Card
          style={styles.card}
          key={item._id}
          onPress={() => this.props.navigation.navigate("Profile", { item })}
        >
          <View style={styles.cardView}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{
                uri: item.pic,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.position}</Text>
            </View>
          </View>
        </Card>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => `${item._id}`}
          onRefresh={() => this.fetchData()}
          refreshing={this.state.loading}
        />
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          theme={{ colors: { accent: "#00a6ff" } }}
          onPress={() => this.props.navigation.navigate("create")}
        />
      </View>
    );
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
