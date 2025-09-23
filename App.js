import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpensesOverview() {
  return <BottomTab.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      tabBarInactiveTintColor: GlobalStyles.colors.primary50,
      headerRight: ({ tintColor }) => <IconButton icon="add" size={28} color={tintColor} onPress={() => { navigation.navigate('ManageExpense'); }} />
    })}>
    <BottomTab.Screen
      name='All'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All',
        tabBarIcon: ({ color, size }) => <FontAwesome name="list-alt" size={size} color={color} />
      }}
    />
    <BottomTab.Screen
      name='Recent'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <FontAwesome6 name="clock-four" size={size} color={color} />
      }}
    />
  </BottomTab.Navigator>
};

export default function App() {
  return (
    <>
      <StatusBar barStyle='default' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
