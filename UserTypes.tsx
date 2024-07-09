import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  id: string;
  name: string;
  email: string;
  address: {
    zipcode: string;
  };
}

//  interface for the route props
export type RootStackParamList = {
  "Items List": undefined;
  UserDetail: { user: User };
};

// interface for screen props
export interface UserDetailScreenProps {
  route: RouteProp<RootStackParamList, "UserDetail">;
  navigation: StackNavigationProp<RootStackParamList, "UserDetail">;
}

export type StackNavigatorProps = {
  "Items List": undefined;
  UserDetail: { user: User } | undefined;
};
