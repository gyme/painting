import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomeScreen from './src/screens/HomeScreen'
import PaintingScreen from './src/screens/PaintingScreen'
import CategoryScreen from './src/screens/CategoryScreen'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: '🎨 Kids Painting Fun!' }}
          />
          <Stack.Screen 
            name="Painting" 
            component={PaintingScreen}
            options={{ title: 'Painting Details' }}
          />
          <Stack.Screen 
            name="Category" 
            component={CategoryScreen}
            options={({ route }: any) => ({ title: `${route.params.category}` })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
