import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '../../../src/theme';

export default function ReviewScreen() {
  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>Review</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        Practice vocabulary with spaced repetition
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
