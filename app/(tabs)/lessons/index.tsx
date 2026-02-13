import { StyleSheet, Text, View } from 'react-native';

export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lessons</Text>
      <Text style={styles.subtitle}>Browse units and lessons</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5f6368',
  },
});
