import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      data: [],
      emptyFlag: true
    };
  }

  addItem = item => {
    if (item !== "") {
      let data = this.state.data;
      const listItem = {
        key: item
      };
      data.push(listItem);
      this.setState({
        data: data,
        item: "",
        emptyFlag: false
      });
    }
  };

  removeItem = index => {
    let data = this.state.data;
    data.splice(index, 1);
    data.length === 0
      ? this.setState({ data: data, emptyFlag: true })
      : this.setState({ data: data });
  };

  editText = (item, index) => {
    const listItem = {
      key: item
    };
    let data = this.state.data;
    data.splice(index, 1, listItem);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="What's on your mind today?"
            defaultValue={this.state.item}
            onChangeText={item => this.setState({ item })}
            style={styles.input}
          />
          <Button
            title="Add Item"
            onPress={() => this.addItem(this.state.item)}
          />
        </View>
        {this.state.emptyFlag ? (
          <Text>Nothing left to do!</Text>
        ) : (
          <FlatList
            style={{ width: 300 }}
            data={this.state.data}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.row,
                  index === 0 ? styles.altListItem : styles.listItem
                ]}
              >
                {/* <Text style={styles.item}>{item.key}</Text> */}
                <TextInput
                  defaultValue={item.key}
                  onChangeText={item => this.editText(item, index)}
                />
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => this.removeItem(index)}
                >
                  <Image
                    style={styles.img}
                    source={require("./assets/icons8-delete-100.png")}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 40
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  img: {
    width: 20,
    height: 20
  },
  input: {
    padding: 20
  },
  altListItem: {
    width: 300,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#CCCCCC",
    borderStyle: "solid"
  },
  listItem: {
    width: 300,
    padding: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#CCCCCC",
    borderStyle: "solid"
  },
  close: {
    flex: 1,
    width: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    flex: 1,
    alignItems: "center",
    width: 290
  }
});
