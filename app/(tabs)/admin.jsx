import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
  StyleSheet,
  Modal,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import { ReportService } from '@/services/ReportService';

// (1) Your reverse-geocode helper (unchanged)
async function reverseGeocode(lat, lng) {
  const apiKey = 'YOUR_GOOGLE_API_KEY';
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );
  const json = await res.json();
  return json.results[0]?.formatted_address ?? `${lat}, ${lng}`;
}

export default function AdminManageReports() {
  const [reports, setReports] = useState([]);
  const [editingReportId, setEditingReportId] = useState(null);
  const [draftStatus, setDraftStatus] = useState({});
  const [loading, setLoading] = useState(false);


  // ** Map preview state **
  const [modalVisible, setModalVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [location, setLocation] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoading(true);

    try {
      const rawReports = await ReportService.getReports();
      console.log(rawReports);
      const withAddresses = await Promise.all(
        rawReports.map(async r => ({
          ...r,
          address: await reverseGeocode(r.latitude, r.longitude),
        }))
      );
      setReports(withAddresses);
      console.log(withAddresses);
    } catch (error) {
      console.error('Failed to refresh reports:', error);
    }

    setRefreshing(false);
    setLoading(false);
  };


  useEffect(() => {
    handleRefresh();
  }, []);

  const handleStatusChange = (id, newValue) => {
    setDraftStatus(s => ({ ...s, [id]: newValue }));
  };

  const saveStatus = async id => {
    setLoading(true);
    const newStatus = draftStatus[id];
    await ReportService.updateReportStatus(id, newStatus);
    setReports(rs =>
      rs.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setEditingReportId(null);
    setLoading(false);
  };

  const cloudName = "dl2m2trsq";
  const cloudinaryBase = `https://res.cloudinary.com/${cloudName}/image/upload`;

  function getReportImageUrl(reportId) {
    return `${cloudinaryBase}/v1745944451/${reportId}.png`;
  }

  function formatTimestamp(firebaseTimestamp) {
    if (!firebaseTimestamp || !firebaseTimestamp._seconds) {
      return "Invalid Timestamp";
    }

    const date = new Date(firebaseTimestamp._seconds * 1000); // Convert seconds to milliseconds

    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        nestedScrollEnabled
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Text style={styles.title}>Admin Manage Reports</Text>

        {reports.map(report => (
          <View key={report.id} style={styles.reportCard}>
            <Text style={styles.reportText}>
              <Text style={styles.label}>Description:</Text>{' '}
              {report.description}
            </Text>
            <Text style={styles.reportText}>
              <Text style={styles.label}>Location:</Text> {report.address}
            </Text>
            <Text style={styles.reportText}>
              <Text style={styles.label}>Date Reported:</Text> {formatTimestamp(report.timestamp)}
            </Text>


            <Image
              source={{
                uri: report.image
                  ? report.image
                  : getReportImageUrl(report.id)
              }}
              style={styles.photo}
            />
            <View style={styles.buttonContainer}>
              {/* — Preview Map button — */}
              <Button
                title="Preview Map"
                onPress={() => {
                  setLocation({
                    latitude: report.latitude,
                    longitude: report.longitude,
                  });
                  setMapRegion({
                    latitude: report.latitude,
                    longitude: report.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  });
                  setModalVisible(true);
                }}
              />

              {/* (3) Edit workflow for status */}
              {editingReportId === report.id ? (
                <>
                  <Text style={styles.label}>Update Status:</Text>
                  <Picker
                    selectedValue={draftStatus[report.id] ?? report.status}
                    onValueChange={v => handleStatusChange(report.id, v)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Cleaned Up" value="Cleaned Up" />
                    <Picker.Item label="Not Found" value="Not Found" />
                  </Picker>
                  <View style={styles.buttonRow}>
                    <Button
                      title="Save"
                      onPress={() => saveStatus(report.id)}
                    />
                    <Button
                      title="Cancel"
                      onPress={() => setEditingReportId(null)}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Button
                    title="Change Status"
                    onPress={() => {
                      setDraftStatus(s => ({
                        ...s,
                        [report.id]: report.status,
                      }));
                      setEditingReportId(report.id);
                    }}
                  />
                </>
              )}
            </View>

          </View>
        ))}
      </ScrollView>

      {/* — Full-screen Map Modal — */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.mapWindow}>
          <MapView
            style={styles.mapPreview}
            region={mapRegion}
            onRegionChangeComplete={newRegion =>
              setMapRegion(newRegion)
            }
          >
            {location && (
              <Marker
                coordinate={location}
                title="Report Location"
              />
            )}
          </MapView>
          <Button
            title="Close Map"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </Modal>
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0C489DFF" />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex: 1 },
  scrollContent: { padding: 16 },
  title: { fontSize: 24, marginBottom: 12 },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // make sure it's on top
  },
  loadingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'flex',
    opacity: 1,
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#0C489DFF',
    borderRadius: 12,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  reportCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  reportText: { marginBottom: 4 },
  label: { fontWeight: 'bold' },
  photo: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
  },
  picker: { marginVertical: 8 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: '#eee',   // placeholder background if it’s still loading
  },
  // — Map Preview styles —
  mapWindow: {
    flex: 1,
  },
  mapPreview: {
    flex: 1,
  },
});
