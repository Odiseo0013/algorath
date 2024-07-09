import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, Icon, PaperProvider } from "react-native-paper";

import StackNavigator from "./components/StackNavigator";
import MainScreen from "./components/MainScreen";

interface User {
  id: string;
  name: string;
  email: string;
  address: {
    zipcode: string;
  };
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => {
            const { key, ...rest } = state;
            return (
              <BottomNavigation.Bar
                {...rest}
                navigationState={state}
                safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (event.defaultPrevented) {
                    preventDefault();
                  } else {
                    navigation.dispatch({
                      ...CommonActions.navigate(route.name, route.params),
                      target: state.key,
                    });
                  }
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }

                  return null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : route.name;

                  return typeof label === "string" ? label : undefined;
                }}
              />
            );
          }}
        >
          <Tab.Screen
            name="Main Page"
            component={MainScreen}
            options={{
              tabBarLabel: "Main Screen",
              tabBarIcon: ({ color, size }) => {
                return <Icon source="home" size={size} color={color} />;
              },
            }}
          />
          <Tab.Screen
            name="Users List"
            component={StackNavigator}
            options={{
              tabBarLabel: "Users List",
              tabBarIcon: ({ color, size }) => {
                return <Icon source="text-account" size={size} color={color} />;
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
