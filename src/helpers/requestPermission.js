import { PermissionsAndroid } from "react-native";

const defaultRationale = {
  title: "lab2SMS Send SMS Permission",
  message: "lab2SMS needs access to send sms permission",
  buttonNegative: "Cancel",
  buttonPositive: "OK"
};

export default async (
  permission = "SEND_SMS",
  rationale = defaultRationale
) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permission],
      rationale
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
};
