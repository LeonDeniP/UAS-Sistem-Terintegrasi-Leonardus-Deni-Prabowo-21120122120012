import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [link, setLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleGenerateQRCode = () => {
    if (link.trim()) {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=150x150`;
      setQrCodeUrl(apiUrl);
      setLink(''); 
    } else {
      Alert.alert('Peringatan', 'Masukkan link terlebih dahulu!');
    }
  };

  const handleDeleteQRCode = () => {
    setQrCodeUrl(''); 
  };

  const handleDownloadQRCode = async () => {
    const fileUri = FileSystem.documentDirectory + 'qrcode.png';
    const response = await FileSystem.downloadAsync(qrCodeUrl, fileUri);
    await Sharing.shareAsync(response.uri);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>UAS SISTEM TERINTEGRASI</Text>
      <Text style={styles.subHeader}>Teknik Komputer - 2024</Text>
      <Text style={styles.info}>Nama: Leonardus Deni Prabowo</Text>
      <Text style={styles.info}>NIM: 21120122120012</Text>

      {/* QR Code Generator */}
      <View style={styles.qrContainer}>
        <TextInput
          style={styles.input}
          placeholder="Masukkan link di sini..."
          value={link}
          onChangeText={setLink}
        />
        <Button title="Generate QR Code" onPress={handleGenerateQRCode} color="#007BFF" />

        {qrCodeUrl ? (
          <View style={styles.qrResult}>
            <Text style={styles.qrText}>Hasil QR Code:</Text>
            <Image source={{ uri: qrCodeUrl }} style={styles.qrImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteQRCode}>
              <Text style={styles.buttonText}>Hapus QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadQRCode}>
              <Text style={styles.buttonText}>Download QR Code</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#4A90E2',
  },
  subHeader: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  qrContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  qrResult: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qrImage: {
    marginTop: 10,
    width: 150,
    height: 150,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D9534F',
    borderRadius: 5,
  },
  downloadButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5CB85C',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
