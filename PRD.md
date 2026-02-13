# PRD: Greek Learning Mobile App (HellenicaGo)

## Introduction

A Duolingo-style mobile app for learning Modern Greek, built with React Native / Expo. The app is fully offline with all data stored locally on the device. Users can choose English, Spanish, or French as their reference language. The app covers all levels from complete beginner to advanced, featuring structured lessons, vocabulary with spaced repetition, quizzes, streaks, gamification, audio pronunciation, and progress tracking.

## Goals

- Teach Modern Greek from alphabet to advanced conversation
- Support 3 reference languages: English, Spanish, French
- Provide a gamified, engaging learning experience (streaks, XP, levels)
- Work 100% offline with local data persistence
- Run on both iOS and Android from a single Expo codebase

## User Stories

---

### US-001: Project Scaffolding & Navigation Shell

**Description:** As a developer, I need the Expo project initialized with navigation so that all future screens have a place to live.

**Acceptance Criteria:**
- [x] Expo project created with TypeScript template
- [x] Bottom tab navigation with 4 tabs: Home, Lessons, Review, Profile
- [x] Stack navigator nested inside each tab for drill-down screens
- [x] Placeholder screen for each tab renders with tab name
- [x] App runs on iOS/Android simulator without errors
- [x] Typecheck passes

---

### US-002: Theme, Design System & Shared Components

**Description:** As a developer, I need a consistent design system so all screens share a cohesive look and feel.

**Acceptance Criteria:**
- [x] Color palette defined (primary, secondary, success, error, backgrounds, text)
- [x] Shared `Button`, `Card`, `ProgressBar`, `Badge` components created
- [x] Typography scale (heading, body, caption) with consistent fonts
- [x] Light theme applied globally (dark mode is a non-goal for now)
- [x] Components render correctly in a test/storybook-style screen
- [x] Typecheck passes

---

### US-003: Local Database & Data Models

**Description:** As a developer, I need a local persistence layer so that user progress, settings, and lesson data are stored on-device.

**Acceptance Criteria:**
- [x] SQLite (via `expo-sqlite`) or AsyncStorage set up for local persistence
- [x] Data models defined: `UserProfile`, `LessonProgress`, `VocabularyItem`, `ReviewCard`, `DailyStreak`
- [x] CRUD helper functions for each model (create, read, update, delete)
- [x] Data persists across app restarts (verified manually)
- [x] Typecheck passes

---

### US-004: Reference Language Selection (EN / ES / FR)

**Description:** As a user, I want to choose my reference language (English, Spanish, or French) so that instructions and translations appear in my native language.

**Acceptance Criteria:**
- [x] Language picker screen shown on first launch
- [x] i18n system set up (e.g., `i18next` or custom) with translation files for EN, ES, FR
- [x] All UI strings (tab labels, buttons, headings) load from translation files
- [x] Selected language persisted locally; skips picker on subsequent launches
- [x] Language can be changed later from Profile tab
- [x] Typecheck passes
- [x] Verify changes work on device/simulator

---

### US-005: Lesson Content Data Structure & Seed Data

**Description:** As a developer, I need a structured content format and initial seed data so the app has lessons to display.

**Acceptance Criteria:**
- [x] Content schema defined: `Course > Unit > Lesson > Exercise`
- [x] Each lesson has: id, unit, order, title (in EN/ES/FR), type, exercises[]
- [x] Exercise types defined: `multiple_choice`, `translation`, `fill_blank`, `match_pairs`, `listening`
- [x] Seed data created for Unit 1 "Alphabet & Basics" with at least 5 lessons
- [x] Seed data includes translations in all 3 reference languages
- [x] Seed data loads successfully on app start
- [x] Typecheck passes

---

### US-006: Greek Alphabet Learning Module

**Description:** As a beginner user, I want a dedicated alphabet module so I can learn to read and write the Greek letters.

**Acceptance Criteria:**
- [x] Alphabet screen accessible from Unit 1 or a dedicated section
- [x] All 24 Greek letters displayed with: uppercase, lowercase, name, pronunciation guide, example word
- [x] Tap a letter to see detail card with transliteration and audio placeholder
- [x] Quiz mode: show a letter, user picks correct pronunciation from 4 options
- [x] Progress tracked (letters learned / total)
- [x] Typecheck passes
- [x] Verify changes work on device/simulator

---

### US-007: Lesson List & Unit Map Screen

**Description:** As a user, I want to see a map of all units and lessons so I know my learning path and what to do next.

**Acceptance Criteria:**
- [x] Lessons tab shows a vertical scrollable list of units
- [x] Each unit shows: title, number of lessons, completion percentage
- [x] Lessons within a unit shown as nodes (locked/unlocked/completed states)
- [x] First lesson of first unit unlocked by default; others unlock sequentially
- [x] Tapping an unlocked lesson navigates to the lesson screen
- [x] Locked lessons show a lock icon and are not tappable
- [x] Typecheck passes
- [x] Verify changes work on device/simulator

---

### US-008: Lesson Exercise Engine — Multiple Choice

**Description:** As a user, I want to answer multiple choice questions during a lesson so I can test my knowledge.

**Acceptance Criteria:**
- [ ] Lesson screen displays exercises sequentially with a progress bar at top
- [ ] Multiple choice exercise shows: prompt (Greek or reference language), 4 answer options
- [ ] Correct answer highlights green, wrong answer highlights red with correct shown
- [ ] User cannot proceed without answering
- [ ] After last exercise, show lesson summary (score, XP earned)
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-009: Lesson Exercise Engine — Translation & Fill-in-the-Blank

**Description:** As a user, I want translation and fill-in-the-blank exercises so I practice active recall.

**Acceptance Criteria:**
- [ ] Translation exercise: shows a sentence, user types translation in text input
- [ ] Answer checked with basic fuzzy matching (ignore accents, case)
- [ ] Fill-in-the-blank: sentence with a gap, user picks from word bank or types
- [ ] Both exercise types integrate into the existing lesson flow from US-008
- [ ] Correct/incorrect feedback shown consistently
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-010: Lesson Exercise Engine — Match Pairs

**Description:** As a user, I want a matching exercise where I pair Greek words with their translations.

**Acceptance Criteria:**
- [ ] Two columns displayed: Greek words (left) and translations (right)
- [ ] User taps one from each column to form a pair
- [ ] Correct pairs highlight and fade/lock; incorrect pairs shake and reset
- [ ] Exercise completes when all pairs matched
- [ ] Minimum 4 pairs per exercise, maximum 6
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-011: XP System & Lesson Completion

**Description:** As a user, I want to earn XP for completing lessons so I feel a sense of progression.

**Acceptance Criteria:**
- [ ] XP awarded per lesson: base 10 XP + bonus for accuracy (up to 5 XP for 100%)
- [ ] XP total stored in local user profile
- [ ] Lesson completion updates `LessonProgress` record (completed, score, XP, timestamp)
- [ ] Lesson summary screen shows: XP earned, accuracy %, time spent
- [ ] Completing a lesson unlocks the next one in the unit
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-012: Daily Streak System

**Description:** As a user, I want a daily streak counter so I'm motivated to practice every day.

**Acceptance Criteria:**
- [ ] Streak increments when user completes at least 1 lesson per day
- [ ] Streak resets to 0 if a day is missed
- [ ] Current streak and longest streak stored locally
- [ ] Streak displayed prominently on Home tab (flame icon + number)
- [ ] Streak freeze: user can "bank" 1 freeze per 7-day streak (protects 1 missed day)
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-013: Home Dashboard

**Description:** As a user, I want a home screen that shows my progress at a glance so I know where I stand.

**Acceptance Criteria:**
- [ ] Home tab displays: current streak, total XP, current level, daily goal progress
- [ ] "Continue" button resumes the next uncompleted lesson
- [ ] Shows today's review count (cards due for spaced repetition)
- [ ] Level derived from total XP (e.g., every 100 XP = 1 level)
- [ ] Daily goal: complete N lessons/day (default 1, configurable in Profile)
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-014: Vocabulary Collection & Flashcard View

**Description:** As a user, I want to browse all vocabulary I've encountered so I can review words outside of lessons.

**Acceptance Criteria:**
- [ ] Review tab shows list of all learned vocabulary items
- [ ] Each item shows: Greek word, transliteration, translation in reference language
- [ ] Search/filter bar to find specific words
- [ ] Tap a word to see detail: example sentence, pronunciation guide
- [ ] Words auto-added to vocabulary when encountered in a completed lesson
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-015: Spaced Repetition Review System

**Description:** As a user, I want a spaced repetition system so I review words at optimal intervals for long-term retention.

**Acceptance Criteria:**
- [ ] SM-2 (or simplified Leitner) algorithm implemented
- [ ] Each vocabulary item has: easiness factor, interval, next review date
- [ ] Review tab shows count of cards due today
- [ ] Review session: show Greek word → user self-rates (Again / Hard / Good / Easy)
- [ ] Rating updates interval and next review date per algorithm
- [ ] Session ends when all due cards reviewed; shows summary
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-016: Audio Pronunciation (Text-to-Speech)

**Description:** As a user, I want to hear Greek words and sentences pronounced so I learn correct pronunciation.

**Acceptance Criteria:**
- [ ] `expo-speech` integrated for text-to-speech in Greek (`el-GR` locale)
- [ ] Speaker icon on vocabulary cards, alphabet detail, and exercise prompts
- [ ] Tapping speaker icon plays pronunciation of the Greek text
- [ ] Auto-play pronunciation on new vocabulary introduction in lessons
- [ ] Graceful fallback if TTS not available (icon hidden, no crash)
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-017: Profile Screen & Settings

**Description:** As a user, I want a profile screen to see my stats and adjust settings.

**Acceptance Criteria:**
- [ ] Profile tab shows: username (locally set), level, total XP, streak, lessons completed
- [ ] Settings section: change reference language, daily goal (1/2/3/5 lessons), reset progress
- [ ] Reset progress shows confirmation dialog before wiping data
- [ ] "About" section with app version
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-018: Seed Content — Units 2-4 (Intermediate Lessons)

**Description:** As a developer, I need additional lesson content so the app has enough material beyond the basics.

**Acceptance Criteria:**
- [ ] Unit 2: "Greetings & Introductions" — at least 5 lessons
- [ ] Unit 3: "Numbers, Colors & Days" — at least 5 lessons
- [ ] Unit 4: "Food & Ordering" — at least 5 lessons
- [ ] All lessons include exercises of varied types (MC, translation, fill-blank, match)
- [ ] All content translated in EN, ES, FR
- [ ] Typecheck passes

---

### US-019: Animations & Haptic Feedback

**Description:** As a user, I want subtle animations and haptic feedback so the app feels polished and responsive.

**Acceptance Criteria:**
- [ ] Correct answer: green pulse animation + success haptic
- [ ] Wrong answer: shake animation + error haptic
- [ ] XP earned: count-up animation on summary screen
- [ ] Streak milestone (7, 30, 100 days): celebration animation (confetti or similar)
- [ ] Animations use `react-native-reanimated` or Expo's built-in Animated API
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

### US-020: Onboarding Flow

**Description:** As a new user, I want a brief onboarding so I understand how the app works and can set my preferences.

**Acceptance Criteria:**
- [ ] 3-screen onboarding: Welcome → Pick reference language → Set daily goal → Start
- [ ] Onboarding only shown on first launch (flag stored locally)
- [ ] User can skip to defaults at any point
- [ ] After onboarding, user lands on Home dashboard
- [ ] Typecheck passes
- [ ] Verify changes work on device/simulator

---

## Non-Goals

- **No backend/server** — everything is local, no accounts, no cloud sync
- **No dark mode** — single light theme for v1
- **No user-generated content** — all content is pre-authored
- **No social features** — no leaderboards, no friends, no sharing
- **No in-app purchases or ads**
- **No handwriting/drawing recognition**
- **No speech recognition** (input) — only text-to-speech (output)
- **No offline-to-online sync** — purely offline app
- **No Ancient Greek** — Modern Greek only

## Technical Considerations

- **Framework:** React Native with Expo (managed workflow)
- **Language:** TypeScript
- **Navigation:** `expo-router` (file-based routing)
- **Local Storage:** `expo-sqlite` for structured data, `AsyncStorage` for simple key-value settings
- **i18n:** `i18next` + `react-i18next` for reference language support (EN/ES/FR)
- **Audio:** `expo-speech` for TTS pronunciation
- **Animations:** `react-native-reanimated` for smooth, performant animations
- **State Management:** React Context + `useReducer` (no Redux needed for local-only app)
- **Content:** JSON seed files bundled with the app
- **Testing:** Jest + React Native Testing Library for unit/component tests
