import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MapProvider } from '../../utilities/mapContext'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <MapProvider>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={({ route }) => {
          // If no nested route is active, default to 'index'
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'index';
          
          // Hide tab bar ONLY if the nested route is 'map'
          const isMapScreen = (routeName === 'map');
          
          return {
            tabBarLabel: 'Report',
            tabBarStyle: isMapScreen ? { display: 'none' } : {},
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          };
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
        />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
        />
      </Tabs>
    </MapProvider>
    
  );
}
