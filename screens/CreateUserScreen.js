import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleTextChanged = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const createNewUser = async () => {
    if (state.name === "") {
      alert("Please provide name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });

        props.navigation.navigate("UserListScreen");
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Name"
          onChangeText={(value) => handleTextChanged("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          onChangeText={(value) => handleTextChanged("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Phone"
          onChangeText={(value) => handleTextChanged("phone", value)}
        />
      </View>
      <View>
        <Button title="" />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => createNewUser()}
        >
          <Text style={styles.buttonText}>Save user</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#1F93FF",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
});

export default CreateUserScreen;
