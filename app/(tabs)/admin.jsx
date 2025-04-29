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
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import { ReportService } from '@/services/ReportService';
import Icon from 'react-native-vector-icons/Ionicons'; // You can also use FontAwesome, MaterialIcons, etc.

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
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState(null);

  // ** Map preview state **
  const [modalVisible, setModalVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [location, setLocation] = useState(null);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState("Newest"); // or "Oldest"

  const [mapType, setMapType] = useState('standard');


  const [refreshing, setRefreshing] = useState(false);

  const theme = useColorScheme(); // 'dark' or 'light'

  const colors = {
    text: theme === 'dark' ? '#FFFFFF' : '#000000',
    background: theme === 'dark' ? '#1C1C1E' : '#FFFFFF',
    card: theme === 'dark' ? '#2C2C2E' : '#F2F2F7',
    button: theme === 'dark' ? '#0A84FF' : '#007AFF',
    icon: theme === 'dark' ? '#FFFFFF' : '#000000',
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoading(true);

    try {
      const rawReports = await ReportService.getReports();
      const withAddresses = await Promise.all(
        rawReports.map(async r => ({
          ...r,
          address: await reverseGeocode(r.latitude, r.longitude),
        }))
      );
      setReports(withAddresses);
    } catch (error) {
      console.error('Failed to refresh reports:', error);
      setLoading(false);
      setRefreshing
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
    try {
      await ReportService.updateReportStatus(id, newStatus);
    } catch (e) {
      console.error("Error saving status: " + e);
    }

    setReports(rs =>
      rs.map(r => (r.id === id ? { ...r, reportStatus: newStatus } : r))
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
      <View style={styles.topNav}>
        <Text style={[styles.navTitle, { color: colors.text }]}>Reports</Text>
        <View style={styles.iconContainer}>
          <Icon.Button
            name="filter-outline"
            backgroundColor="transparent"
            underlayColor="transparent"
            color={colors.icon}
            size={26}
            onPress={() => setFilterModalVisible(true)}
          />
          <Icon.Button
            name={sortBy === "Newest" ? "arrow-down" : "arrow-up"}
            backgroundColor="transparent"
            underlayColor="transparent"
            color={colors.icon}
            size={26}
            onPress={() => setSortBy(s => (s === "Newest" ? "Oldest" : "Newest"))}
          />
        </View>
      </View>


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


        {filterStartDate && (
          <Button
            title="Clear Date Filter"
            onPress={() => setFilterStartDate(null)}
          />
        )}


        {reports
          .filter(report => {
            const statusMatches =
              filterStatus === "All" ||
              report.reportStatus?.toLowerCase() === filterStatus.toLowerCase();
            const dateMatches =
              !filterStartDate ||
              (report.timestamp &&
                new Date(report.timestamp._seconds * 1000) >= filterStartDate);
            return statusMatches && dateMatches;
          })
          .sort((a, b) => {
            const timeA = a.timestamp?._seconds || 0;
            const timeB = b.timestamp?._seconds || 0;
            return sortBy === "Newest" ? timeB - timeA : timeA - timeB;
          })
          .map(report => (


            <View key={report.id} style={styles.reportCard}>
              {/* report info, image, etc */}
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
              <Text style={styles.reportText}>
                <Text style={styles.label}>Report Status:</Text> {report.reportStatus}
              </Text>


              <Image
                source={{
                  uri: report.image
                    ? report.image
                    : getReportImageUrl(report.id)
                }}
                style={styles.photo}
              />
              <View style={styles.buttonRowCompact}>
                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: colors.button }]}
                  onPress={() => {
                    setLocation({ latitude: report.latitude, longitude: report.longitude });
                    setMapRegion({
                      latitude: report.latitude,
                      longitude: report.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    });
                    setModalVisible(true);
                  }}
                >
                  <Icon name="map-outline" size={18} color="white" />
                  <Text style={styles.iconButtonText}>Map</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconButton, { backgroundColor: colors.button }]}
                  onPress={() => {
                    setDraftStatus(s => ({ ...s, [report.id]: report.reportStatus }));
                    setEditingReportId(report.id);
                  }}
                >
                  <Icon name="create-outline" size={18} color="white" />
                  <Text style={styles.iconButtonText}>Change Status</Text>
                </TouchableOpacity>
              </View>

              {/* Show edit panel if editing this report */}
              {editingReportId === report.id && (
                <View style={styles.editCard}>
                  <Text style={[styles.label, { marginBottom: 4 }]}>Update Status:</Text>
                  <Picker
                    selectedValue={(draftStatus[report.id] ?? report.reportStatus)?.replace(/\b\w/g, c => c.toUpperCase())}
                    onValueChange={v => handleStatusChange(report.id, v)}
                    style={{
                      color: colors.text,         // Apply text color to Picker
                    }}
                    dropdownIconColor={colors.text}
                  >
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Cleaned Up" value="Cleaned Up" />
                    <Picker.Item label="Not Found" value="Not Found" />
                  </Picker>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.saveBtn]} onPress={() => saveStatus(report.id)}>
                      <Icon name="checkmark-outline" size={16} color="white" />
                      <Text style={styles.iconButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.cancelBtn]} onPress={() => setEditingReportId(null)}>
                      <Icon name="close-outline" size={16} color="white" />
                      <Text style={styles.iconButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}


            </View>
          ))}



      </ScrollView>

      <Modal
        visible={filterModalVisible}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Filters</Text>

          <Text style={styles.filterLabel}>Status</Text>
          <Picker
            selectedValue={filterStatus}
            onValueChange={(v) => setFilterStatus(v)}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Cleaned Up" value="Cleaned Up" />
            <Picker.Item label="Not Found" value="Not Found" />
          </Picker>

          <Button
            title="Clear Filters"
            onPress={() => {
              setFilterStatus("All");
              setFilterStartDate(null);
            }}
          />
          <Button title="Close" onPress={() => setFilterModalVisible(false)} />
        </ScrollView>
      </Modal>

      {/* — Full-screen Map Modal — */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.mapWindow}>
          <View style={[styles.mapTypeContainer, styles.overlay]}>
            {/* Standard icon */}
            <TouchableOpacity
              onPress={() => setMapType('standard')}
              style={[
                styles.mapTypeButton,
                mapType === 'standard' && styles.selectedButton,
                styles.leftButton,
              ]}
            >
              <Ionicons name="map" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Satellite icon */}
            <TouchableOpacity
              onPress={() => setMapType('satellite')}
              style={[
                styles.mapTypeButton,
                mapType === 'satellite' && styles.selectedButton,
                styles.rightButton,
              ]}
            >
              <Ionicons name="earth" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <MapView
            style={styles.mapPreview}
            region={mapRegion}
            mapType={mapType}
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
  overlay: {
    zIndex: 2,
  },
  mapTypeContainer: {
    position: 'absolute',
    top: 56,
    right: 12,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    opacity: 0.7,
  },

  mapTypeButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

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

  buttonRowCompact: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    gap: 8,
  },

  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },

  iconButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  editCard: {
    marginTop: 10,
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
  },

  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#28a745',
    marginRight: 8,
  },

  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#dc3545',
  },

  
  reportCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  reportText: { marginBottom: 4 },
  label: { fontWeight: 'bold' },

  picker: {
    marginVertical: 0,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photo: {
    width: '100%',
    height: 400,
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
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: '#0C489DFF', // ← optionally use colors.background
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  modalContent: {
    padding: 16,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginTop: 12,
  },

});
