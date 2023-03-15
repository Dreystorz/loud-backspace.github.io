import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-navigation";
import React, { useState, useContext } from "react";
import InputField from "../components/V2Components/InputField";
import { AuthContext } from "../../context";
import theme from '.././../styles/theme.style'

export default function FinderScreen({ navigation }) {
  const { myIp } = useContext(AuthContext).ip;
  const [zipCode, getZipCode] = useState("");
  const [pageNum, getPageNum] = useState("1");
  const [data, setData] = useState([]);
  const SearchListings = async () => {
    try {
      const response = await fetch("http://" + myIp + ":3000/listings/search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page_num: pageNum,
          zip_code: zipCode,
        }),

        https: false, // Set the https option to true
      });
      const result = await response.json();
      if (response.status == 200) {
        console.log(result.listing);
        setData(result.listing);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePress = (item) => {
    console.log(`Clicked item ${item._id}`);
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.title}>Roommate Finder</Text>
            <Text style={{fontSize: 12, marginLeft: 60}}>Find roomates according to your interests</Text>
          </View>
          <InputField
            style={styles.TextInput}
            placeholder="Search By Zipcode"
            value={zipCode}
            onChangeText={getZipCode}
            onSubmitEditing={SearchListings}
            startDisabled={true}
            rounded
            startButton={<Ionicons
              name={"search"}
              size={25}
              color={'grey'}
            />}
          />
          <TouchableOpacity
            style={styles.createListingButton}
            onPress={() => navigation.navigate("ListingCreation")}>
            <Text style={{fontWeight: 'bold'}}>Create Listing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}>
            <Text style={{fontWeight: 'bold'}}>Filter Search Results</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("My Listings")}
          >
            <Text>View my listings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Box}>
          {data.map((item) => (
            <TouchableOpacity
              style={styles.ContentModule}
              key={item._id}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.text}>{`${item.city}, ${item.zip_code}`}</Text>
              <Text style={styles.text}>{item.street_name}</Text>
              <Text style={styles.text}>{item.rent}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center'
  },
  input: {
    marginBottom: 10,
  },
  button: {
    height: 20,
    width: 120,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 0,
    fontSize: 15,
    marginLeft: 30
  },
  ContentModule: {
    flexBasis: '24.1%',
    marginHorizontal: 4.4,
    marginVertical: 4.4,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: "wrap",
    width: '100%',
    backgroundColor: theme.CONTAINER_COLOR,
    marginTop: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 60,
    marginRight: 30
  },
  createListingButton: {
    height: 40,
    width: 230,
    backgroundColor: "#92EBFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  filterButton: {
    height: 40,
    width: 220,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  }
});
