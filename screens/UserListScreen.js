import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import avatarImage from "../assets/avatar.png";

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const usersList = [];

      querySnapshot.docs.forEach((document) => {
        const { name, email, phone } = document.data();
        usersList.push({
          id: document.id,
          name,
          email,
          phone,
        });
      });

      setUsers(usersList);
    });
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateUserScreen")}
      >
        <Text style={styles.buttonText}>Create user</Text>
      </TouchableOpacity>

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            onPress={() =>
              navigation.navigate("UserDetailScreen", {
                userId: user.id,
              })
            }
            bottomDivider
          >
            <ListItem.Chevron />
            <Avatar source={avatarImage} rounded />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  createButton: {
    alignItems: "center",
    backgroundColor: "#1F93FF",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
});

export default UserListScreen;
