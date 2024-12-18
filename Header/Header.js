import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UAS SISTEM TERINTEGRASI</Text>
      <Text style={styles.subtitle}>Teknik Komputer - 2024</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40, // Space from the top
    marginBottom: 20, // Space below the header
    backgroundColor: '#4A90E2', // Background color for header
    paddingVertical: 20,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#fff', // White text color for subtitle
    marginTop: 10,
  },
});

export default Header;
