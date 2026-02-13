import { useState, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card } from '../../../src/components';
import {
  getLearnedVocabularyItems,
  searchVocabularyItems,
} from '../../../src/database';
import type { VocabularyItem } from '../../../src/database';

function getTranslation(item: VocabularyItem, lang: string): string {
  switch (lang) {
    case 'es': return item.translationEs;
    case 'fr': return item.translationFr;
    default: return item.translationEn;
  }
}

export default function ReviewScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'es' | 'fr';

  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadVocabulary();
    }, [])
  );

  const loadVocabulary = useCallback(() => {
    const items = getLearnedVocabularyItems();
    setVocabulary(items);
  }, []);

  const filteredVocabulary = useMemo(() => {
    if (!searchQuery.trim()) return vocabulary;
    const items = searchVocabularyItems(searchQuery.trim(), lang);
    return items;
  }, [searchQuery, vocabulary, lang]);

  const renderItem = useCallback(({ item }: { item: VocabularyItem }) => (
    <Pressable onPress={() => setSelectedWord(item)}>
      <Card variant="outlined" style={styles.wordCard}>
        <View style={styles.wordRow}>
          <View style={styles.wordInfo}>
            <Text style={styles.greekText}>{item.greek}</Text>
            <Text style={styles.transliteration}>{item.transliteration}</Text>
          </View>
          <View style={styles.translationCol}>
            <Text style={styles.translationText}>{getTranslation(item, lang)}</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textDisabled} />
          </View>
        </View>
      </Card>
    </Pressable>
  ), [lang]);

  const keyExtractor = useCallback((item: VocabularyItem) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('vocabulary.searchPlaceholder')}
          placeholderTextColor={colors.textDisabled}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
            <Ionicons name="close-circle" size={20} color={colors.textDisabled} />
          </Pressable>
        )}
      </View>

      {/* Word count */}
      <Text style={styles.countText}>
        {t('vocabulary.wordCount', { count: filteredVocabulary.length })}
      </Text>

      {/* Vocabulary list */}
      {filteredVocabulary.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name={searchQuery ? 'search' : 'book-outline'}
            size={48}
            color={colors.textDisabled}
          />
          <Text style={styles.emptyTitle}>
            {searchQuery ? t('vocabulary.noResults') : t('vocabulary.emptyTitle')}
          </Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery ? t('vocabulary.tryDifferentSearch') : t('vocabulary.emptySubtitle')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredVocabulary}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Word detail modal */}
      <Modal
        visible={selectedWord !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedWord(null)}
      >
        {selectedWord && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={[typography.heading3, { color: colors.text }]}>
                {t('vocabulary.wordDetail')}
              </Text>
              <Pressable onPress={() => setSelectedWord(null)} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>

            <View style={styles.modalContent}>
              {/* Greek word large */}
              <Text style={styles.detailGreek}>{selectedWord.greek}</Text>
              <Text style={styles.detailTransliteration}>{selectedWord.transliteration}</Text>

              {/* Translation */}
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>{t('vocabulary.translation')}</Text>
                <Text style={styles.detailValue}>{getTranslation(selectedWord, lang)}</Text>
              </View>

              {/* Category */}
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>{t('vocabulary.category')}</Text>
                <Text style={styles.detailValue}>{selectedWord.category}</Text>
              </View>

              {/* Example sentence */}
              {selectedWord.exampleSentence && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>{t('vocabulary.exampleSentence')}</Text>
                  <Text style={styles.detailValue}>{selectedWord.exampleSentence}</Text>
                </View>
              )}

              {/* Pronunciation guide */}
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>{t('vocabulary.pronunciationGuide')}</Text>
                <View style={styles.pronunciationRow}>
                  <Ionicons name="volume-medium" size={24} color={colors.primary} />
                  <Text style={styles.pronunciationText}>/{selectedWord.transliteration}/</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.sm + 2,
  },
  countText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  // Word list
  listContent: {
    paddingBottom: spacing.xxl,
  },
  wordCard: {
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordInfo: {
    flex: 1,
  },
  greekText: {
    ...typography.heading3,
    color: colors.text,
  },
  transliteration: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  translationCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  translationText: {
    ...typography.body,
    color: colors.primary,
  },
  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyTitle: {
    ...typography.heading3,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textDisabled,
    textAlign: 'center',
    maxWidth: 280,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalContent: {
    padding: spacing.lg,
  },
  detailGreek: {
    ...typography.heading1,
    color: colors.text,
    fontSize: 36,
    textAlign: 'center',
  },
  detailTransliteration: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  detailSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
  },
  pronunciationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  pronunciationText: {
    ...typography.body,
    color: colors.text,
    fontStyle: 'italic',
  },
});
