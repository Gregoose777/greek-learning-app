import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../src/theme';
import { Button, Card, ProgressBar, Badge } from '../../../src/components';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.swatchContainer}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <Text style={[typography.caption, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

export default function ComponentShowcaseScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Typography */}
      <Section title="Typography">
        <Text style={[typography.heading1, { color: colors.text }]}>Heading 1</Text>
        <Text style={[typography.heading2, { color: colors.text }]}>Heading 2</Text>
        <Text style={[typography.heading3, { color: colors.text }]}>Heading 3</Text>
        <Text style={[typography.body, { color: colors.text }]}>Body text</Text>
        <Text style={[typography.bodyBold, { color: colors.text }]}>Body bold</Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>Caption text</Text>
      </Section>

      {/* Color Palette */}
      <Section title="Colors">
        <View style={styles.colorRow}>
          <ColorSwatch color={colors.primary} label="Primary" />
          <ColorSwatch color={colors.secondary} label="Secondary" />
          <ColorSwatch color={colors.success} label="Success" />
          <ColorSwatch color={colors.error} label="Error" />
        </View>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <View style={styles.buttonRow}>
          <Button title="Primary" onPress={() => {}} />
          <Button title="Secondary" onPress={() => {}} variant="secondary" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Outline" onPress={() => {}} variant="outline" />
          <Button title="Ghost" onPress={() => {}} variant="ghost" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Small" onPress={() => {}} size="sm" />
          <Button title="Medium" onPress={() => {}} size="md" />
          <Button title="Large" onPress={() => {}} size="lg" />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Disabled" onPress={() => {}} disabled />
          <Button title="Loading" onPress={() => {}} loading />
        </View>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <Card>
          <Text style={[typography.bodyBold, { color: colors.text }]}>Elevated Card</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            With shadow elevation
          </Text>
        </Card>
        <View style={{ height: spacing.sm }} />
        <Card variant="outlined">
          <Text style={[typography.bodyBold, { color: colors.text }]}>Outlined Card</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            With border
          </Text>
        </Card>
        <View style={{ height: spacing.sm }} />
        <Card variant="filled">
          <Text style={[typography.bodyBold, { color: colors.text }]}>Filled Card</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            With surface color
          </Text>
        </Card>
      </Section>

      {/* Progress Bars */}
      <Section title="Progress Bars">
        <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.xs }]}>
          25%
        </Text>
        <ProgressBar progress={0.25} />
        <View style={{ height: spacing.sm }} />
        <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.xs }]}>
          60% (Success)
        </Text>
        <ProgressBar progress={0.6} color={colors.success} />
        <View style={{ height: spacing.sm }} />
        <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.xs }]}>
          100% (Gold)
        </Text>
        <ProgressBar progress={1.0} color={colors.secondary} />
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <View style={styles.badgeRow}>
          <Badge label="Primary" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Error" variant="error" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Neutral" variant="neutral" />
        </View>
        <View style={[styles.badgeRow, { marginTop: spacing.sm }]}>
          <Badge label="Small" variant="primary" size="sm" />
          <Badge label="Medium" variant="primary" size="md" />
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.xs,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  swatchContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
});
