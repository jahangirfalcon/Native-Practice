import Axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    name: "ja1",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    name: "ja2",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    name: "ja3",
  },
];
let AllData;
export default function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    try {
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const getData = async () => {
    await axios.get("http://192.168.1.101:5000/api/user/users").then((res) => {
      setData(res.data);
      AllData = res.data;
    });
  };
  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "20%", alignSelf: "flex-end", marginRight: "10%" }}>
        <Button title="Add" />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const renderItem = ({ item }) => (
  <Item
    title={item.title}
    name={item.name}
    profile={item.profile}
    description={item.description}
  />
);

const Item = ({ title, profile, name, description }) => (
  <View style={styles.item}>
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Image
          source={{
            uri: profile
              ? `http://192.168.1.101:5000/${profile}`
              : "https://image.shutterstock.com/image-photo/karachi-karachipakistan-july-24-2015-260nw-1460360153.jpg",
          }}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
      </View>
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text
          style={{
            marginTop: "10%",
            fontSize: 18,
            marginLeft: "30%",
          }}
        >
          {title}
        </Text>
      </View>
    </View>
    <Text style={{ marginLeft: "10%" }}>{description}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    backgroundColor: "white",
    paddingTop: "10%",
    // justifyContent: "center",
  },
  item: {
    backgroundColor: "lightgray",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginLeft: "30%",
  },
});
