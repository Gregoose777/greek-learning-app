import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { colors, typography, spacing } from '../../../src/theme';
import { Button } from '../../../src/components';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>Profile</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        Your stats and settings
      </Text>
      <View style={{ marginTop: spacing.xl }}>
        <Link href="/(tabs)/profile/component-showcase" asChild>
          <Button title="View Design System" variant="outline" onPress={() => {}} />
        </Link>
      </View>
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
