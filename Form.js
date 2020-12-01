import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import axios from "axios";
import { TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
export default function FormScreen() {
  const [profile, setImage] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log(result.name, "Reasult of image picker");
      setImage(result);
    }
  };

  const Submit = () => {
    try {
      setLoader(true);
      let data = new FormData();
      data.append("name", name);
      data.append("title", title);
      data.append("description", description);
      data.append("profile", {
        uri: profile.uri,
        type: profile.type,
        name: profile.fileName,
      });

      axios
        .post("http://192.168.1.101:5000/api/user/create", data)
        .then((res) => {
          if (res.status !== 200) {
            setLoader(false);
            console.log(res.status);
          } else {
            setLoader(false);
            setName(null);
            setTitle(null);
            setDescription(null);
            setImage(null);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(name, title, description, profile);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "80%",
          alignItems: "center",
          marginBottom: "4%",
        }}
      >
        {profile && (
          <Image
            source={{ uri: profile.uri }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        )}
      </View>
      <Button title="Pick An Image" color="lightgray" onPress={pickImage} />

      <TextInput
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 0,
          borderBottomWidth: 1,

          marginTop: "5%",
          width: "80%",
          backgroundColor: "white",
          fontSize: 14,
          paddingLeft: 10,
          borderRadius: 5,
        }}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        placeholderTextColor="silver"
        value={name}
      />
      <TextInput
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 0,
          borderBottomWidth: 1,

          marginTop: "2%",
          width: "80%",
          backgroundColor: "white",
          fontSize: 14,
          paddingLeft: 10,
          borderRadius: 5,
        }}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        placeholderTextColor="silver"
        value={title}
      />
      <TextInput
        style={{
          height: 30,
          borderColor: "gray",
          borderWidth: 0,
          borderBottomWidth: 1,

          marginTop: "2%",
          width: "80%",
          backgroundColor: "white",
          fontSize: 14,
          paddingLeft: 10,
          borderRadius: 5,
        }}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor="silver"
        value={description}
      />

      <View
        style={{
          marginTop: "10%",
          width: "60%",
          backgroundColor: "white",
        }}
      >
        <Button
          title={loader ? "Sending" : "Create"}
          onPress={() => Submit()}
        />
      </View>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "2%",
    backgroundColor: "red",
  },
});
