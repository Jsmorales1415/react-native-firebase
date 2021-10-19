import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { withTheme } from "react-native-elements";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const [loading, setLoading] = useState(true);

  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const userData = doc.data();
    setUser({ ...userData, id: doc.id });
    setLoading(false);
  };

  const deleteUserById = async () => {
    try {
      const dbRef = firebase.db
        .collection("users")
        .doc(props.route.params.userId);
      await dbRef.delete();
      props.navigation.navigate("UserListScreen");
    } catch (ex) {
      console.log(ex);
    }
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Remove user",
      `Are you sure to remove the user ${user.name}?`,
      [
        { text: "Yes", onPress: () => deleteUserById() },
        { text: "No", onPress: () => console.log("Not deleted") },
      ]
    );
  };

  const updateUserById = async () => {
    try {
      const dbRef = firebase.db.collection("users").doc(user.id);
      await dbRef.set({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      setUser(initialState);

      props.navigation.navigate("UserListScreen");
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleTextChanged = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Name"
          value={user.name}
          onChangeText={(value) => handleTextChanged("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Email"
          value={user.email}
          onChangeText={(value) => handleTextChanged("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="User Phone"
          value={user.phone}
          onChangeText={(value) => handleTextChanged("phone", value)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => updateUserById()}
        >
          <Text style={styles.buttonTextStyle}>Update user</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => openConfirmationAlert()}
        >
          <Text style={styles.buttonTextStyle}>Delete user</Text>
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
  updateButton: {
    alignItems: "center",
    backgroundColor: "#1F93FF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#EB3842",
    padding: 10,
    borderRadius: 10,
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 17,
  },
});

export default UserDetailScreen;
