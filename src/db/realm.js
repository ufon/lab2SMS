import Realm from "realm";

const Messages = {
  name: "messages",
  primaryKey: "id",
  properties: {
    id: "string",
    time: "date",
    phone: "string",
    message: "string"
  }
};

const realmInstance = new Realm({
  schema: [Messages]
});

export default realmInstance;
