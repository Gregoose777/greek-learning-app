import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '../../../src/theme';

export default function LessonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>Lessons</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        Browse units and lessons
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
