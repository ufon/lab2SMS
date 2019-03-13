import React, { Component } from "react";
import {
  Container,
  List,
  ListItem,
  Body,
  Right,
  Text,
  Title,
  Fab,
  Icon,
  Button,
  Card,
  CardItem,
  Content,
  Left,
  Header
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";

import { ScrollView, View, Modal } from "react-native";
import { format } from "date-fns";

import realm from "../db/realm";

const Item = ({ phone = "123", text = "123", time = "123", onPress }) => (
  <ListItem onPress={onPress}>
    <Body>
      <Text>{phone}</Text>
      <Text note>{text}</Text>
    </Body>
    <Right>
      <Text note>{time}</Text>
    </Right>
  </ListItem>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.messages = realm.objects("messages").sorted("time", true);
    this.messages.addListener(() => {
      this.forceUpdate();
    });

    this.state = {
      messages: this.messages,
      messageModal: {
        visible: false
      },
      spinner: false
    };
  }

  listener(puppies) {
    this.setState({ messages: puppies });
  }

  deleteMessage = id => {
    this.setState({
      spinner: true
    });
    const message = realm.objectForPrimaryKey("messages", id);
    this.setState({ messageModal: { visible: false } }, () =>
      realm.write(() => {
        realm.delete(message);
        this.setState({
          spinner: false
        });
      })
    );
  };

  hideMessageModal = () =>
    this.setState({
      messageModal: {
        message: { number: "111", message: "111", time: "111" },
        visible: false
      }
    });

  showMessageModal = id => {
    const message = realm.objectForPrimaryKey("messages", id);
    console.log(message);
    return this.setState({
      messageModal: {
        message,
        visible: true
      }
    });
  };

  componentDidMount() {
    console.log(this.props.navigation);
  }

  render() {
    const { navigation } = this.props;
    const {
      messageModal: { visible, message }
    } = this.state;
    return (
      <Container>
        <ScrollView>
          <View>
            <List>
              {this.messages.map(({ id, phone, message, time }) => (
                <Item
                  key={id}
                  phone={phone}
                  text={`${message.substring(0, 35)}...`}
                  time={format(time, "H:mm")}
                  onPress={() => {
                    this.showMessageModal(id);
                  }}
                />
              ))}
            </List>
          </View>
        </ScrollView>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            navigation.navigate("SendMessage");
          }}
        >
          <Icon name="add" />
        </Fab>
        <Modal animationType="slide" transparent={false} visible={visible}>
          <Header>
            <Left>
              <Button transparent onPress={this.hideMessageModal}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <Content padder>
            {message && (
              <Card>
                <CardItem header bordered>
                  <Text>{message.phone}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{message.message}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Left>
                    <Text>{format(message.time, "H:mm")}</Text>
                  </Left>
                  <Body />
                  <Right>
                    <Button onPress={() => this.deleteMessage(message.id)}>
                      <Icon name="trash" />
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
          </Content>
        </Modal>
        <Spinner visible={this.state.spinner} />
      </Container>
    );
  }
}
