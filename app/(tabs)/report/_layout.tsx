// app/report/_layout.tsx
import { Stack } from 'expo-router';

export default function ReportLayout() {
  return (
    <Stack>
      {/* 
        By default, 'index' means the file 'index.jsx' in this folder.
        We'll leave the default header for the "report" page alone.
      */}
      <Stack.Screen 
        name="index"
        options={{
        title: 'Duluth Sharp Spot',
         headerTitleStyle: {
            fontFamily: 'Roboto_Condensed-Bold',
            fontWeight: 'bold',
         },
         }}
      />

      {/*
        For the "map" route, we rename the top title and set a custom
        back button label to "Report" (instead of the default).
      */}
      <Stack.Screen
        name="map"
        options={{
          title: 'Pick a Location',
          headerBackTitle: 'Report',
        }}
      />
    </Stack>
  );
}
