import React, { Component } from "react";
import SendSMS from "react-native-sms-x";
import {
  Textarea,
  Form,
  Item,
  Input,
  Button,
  Container,
  Content,
  Text
} from "native-base";
import shortid from "shortid";
import Spinner from "react-native-loading-spinner-overlay";
import requestPermission from "../helpers/requestPermission";
import realm from "../db/realm";

class SendMessage extends Component {
  state = {
    number: "",
    message: "",
    spinner: false
  };

  sendMessageHandler = async (number, message) => {
    if (await requestPermission("SEND_SMS")) {
      SendSMS.send(Math.random(), number, message, () => {
        this.setState({
          spinner: true
        });
        realm.write(() => {
          realm.create("messages", {
            id: shortid.generate(),
            phone: number,
            message,
            time: new Date()
          });
          this.setState({
            spinner: false
          });
          this.props.navigation.pop();
        });
      });
    }
  };

  render() {
    const { number, message } = this.state;
    return (
      <Container>
        <Content padder>
          <Form>
            <Item regular>
              <Input
                keyboardType="numeric"
                onChangeText={number => this.setState({ number })}
                style={{ fontSize: 16 }}
                placeholder="Phone number"
                maxLength={13}
              />
            </Item>
            <Textarea
              style={{ fontSize: 16 }}
              rowSpan={5}
              bordered
              placeholder="Message"
              onChangeText={message => this.setState({ message })}
            />
            <Button
              style={{ marginTop: 10 }}
              onPress={() => this.sendMessageHandler(number, message)}
              block
              success
            >
              <Text>Send</Text>
            </Button>
          </Form>
        </Content>
        <Spinner visible={this.state.spinner} />
      </Container>
    );
  }
}

export default SendMessage;
