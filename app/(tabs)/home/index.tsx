import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '../../../src/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>Home</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        Your Greek learning dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
