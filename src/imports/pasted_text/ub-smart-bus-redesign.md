# UB Smart Bus Redesign — Figma-ready UI/UX Spec

## 1. Product direction

**Project type:** Mobile app redesign / high-fidelity prototype
**Reference:** UB Smart Bus style app, redesigned for cleaner UX, better hierarchy, and modern visual language
**Primary goal:** Help users find buses, routes, stops, and fare info faster with less visual noise

### Core UX principles

* Fast to scan
* One primary action per screen
* Transit info first, decoration second
* Large tap targets
* Clear status color logic
* Consistent cards, chips, and icons
* Minimal cognitive load for commuters in a hurry

### Target users

* Daily bus commuters
* Students
* Office workers
* Visitors unfamiliar with routes
* Users checking nearby stops and real-time bus arrival

---

## 2. Visual concept

### Style keywords

* clean
* modern
* transit-focused
* trustworthy
* compact but breathable
* local/public-service friendly

### Design vibe

Use a **bright utility-first UI** with strong orange as the brand/action color, balanced with dark text, soft gray surfaces, and blue/green status accents. The app should feel more polished than the old screenshots, but still practical and easy to use.

---

## 3. Color system

### Primary

* **Primary / Transit Orange:** `#F47C20`
* **Primary Hover / Pressed:** `#DD6D17`
* **Primary Soft:** `#FFF1E7`

### Neutral

* **Background:** `#F7F8FA`
* **Surface:** `#FFFFFF`
* **Surface 2:** `#F1F3F6`
* **Border:** `#E2E8F0`
* **Divider:** `#E9EDF3`
* **Text Primary:** `#111827`
* **Text Secondary:** `#6B7280`
* **Text Muted:** `#9CA3AF`

### Functional

* **Info Blue:** `#2563EB`
* **Info Blue Soft:** `#EAF2FF`
* **Success Green:** `#16A34A`
* **Success Green Soft:** `#EAF8EF`
* **Warning Amber:** `#D97706`
* **Warning Soft:** `#FFF7E8`
* **Danger Red:** `#DC2626`
* **Danger Soft:** `#FDECEC`

### Map / transit accents

* **Route Purple:** `#7C3AED`
* **Route Teal:** `#0F766E`
* **Route Pink:** `#DB2777`
* **Bus Dot Blue:** `#2563EB`
* **Stop Dot Orange:** `#F47C20`

### Usage rules

* Orange = primary action, selected tab, important CTA
* Blue = live info / interactive map / location-related status
* Green = arriving soon / success / active vehicle status
* Red = delay / error / unavailable
* Avoid using more than 1 strong accent inside the same component unless it is map-related

---

## 4. Typography

### Font recommendation

Use **Inter** in Figma.

### Type scale

* **Display / Screen title:** 28 / 34 / SemiBold
* **H1:** 24 / 30 / SemiBold
* **H2:** 20 / 26 / SemiBold
* **H3:** 18 / 24 / SemiBold
* **Body Large:** 16 / 24 / Regular
* **Body:** 14 / 22 / Regular
* **Body Small:** 12 / 18 / Regular
* **Label:** 13 / 18 / Medium
* **Button:** 14 / 20 / SemiBold
* **Caption:** 11 / 16 / Medium

### Hierarchy rules

* Screen titles: 20–24px depending on density
* Route number / arrival time: bold and highly visible
* Secondary explanations: always gray text, never black
* Avoid more than 3 text sizes in one component

---

## 5. Grid, spacing, radius, shadows

### Mobile frame

* **Frame size:** 390 × 844 (iPhone 14 / modern baseline)
* Also fine: 360 × 800 if your class requires Android-style width

### Layout grid

* Margin: **16 px**
* Column count: **4**
* Gutter: **12 px**

### Spacing scale

* 4, 8, 12, 16, 20, 24, 32

### Radius

* Small: 10
* Medium: 14
* Large cards / bottom sheets: 20
* Pills / chips / buttons: 999

### Shadow

Use soft shadow only on floating elements:

* Y: 8
* Blur: 24
* Color: `#111827` at 8%

---

## 6. Icon style

Use simple rounded outline icons.
Recommended set in Figma: Material Symbols Rounded / Phosphor / Hugeicons.

### Core icons

* Home
* Search
* Bus
* Route
* Location / Pin
* Map
* Favorite / Star
* Bell
* Card / Wallet
* Settings
* Arrow left
* Filter
* Clock
* Navigation
* Info

---

## 7. Component system

## 7.1 App bar

**Variants:**

* Default with title
* Back + title
* Search field embedded
* Map top bar with floating controls

**Specs:**

* Height: 56
* Horizontal padding: 16
* Title: 18 / 24 / SemiBold
* Icon touch area: 40 × 40

---

## 7.2 Search field

**Specs:**

* Height: 44
* Radius: 12
* Background: `#FFFFFF`
* Border: `#E2E8F0`
* Left icon: search
* Optional right icon: filter / QR / clear
* Placeholder: `Чиглэл, буудал, автобус № хайх`

**States:**

* Default
* Focused
* Filled
* Error

---

## 7.3 Bottom navigation

**Tabs:**

* Home
* Search
* Map
* Favorites
* More

**Specs:**

* Height: 76 including safe area feel
* Active color: orange
* Inactive color: gray
* Label size: 11 / 16 / Medium

---

## 7.4 Quick action card

Used on home screen.

**Specs:**

* Height: 88–96
* Radius: 16
* Left icon inside soft circle
* Title + small subtitle
* Chevron right on end

**Examples:**

* Чиглэл хайх
* Автобусны буудал хайх
* Газрын зураг
* Төлбөрийн мэдээлэл

---

## 7.5 Route result row

Used in search results.

**Layout:**

* Route badge left
* Start/end stop names center
* Chevron or favorite on right

**Specs:**

* Min height: 68
* Divider between rows
* Route badge = rounded rectangle, orange soft bg or blue soft depending on type

---

## 7.6 Arrival card / stop card

**Content:**

* Stop name
* Route number
* Destination
* ETA in minutes
* Optional bus occupancy or live status

**ETA chips:**

* 1–3 min = green
* 4–8 min = orange
* 9+ min = gray/blue

---

## 7.7 Bus route timeline

For route details screen.

**Structure:**

* Vertical line
* Stop dots
* Highlight current bus position
* Arrival time right aligned

**Specs:**

* Dot default: 10
* Active dot: 14 with outer ring
* Line: 2 px neutral gray
* Passed stop: muted
* Upcoming stop: primary text

---

## 7.8 Fare info table card

Instead of a raw table, use cleaner stacked cards.

**Option A:** segmented tabs + list cards
**Option B:** simple table inside card with sticky header

Recommended fields:

* Passenger type
* Card type
* Price
* Notes

---

## 7.9 Map pin set

* Stop pin = orange pin
* Live bus = blue circular badge with bus icon
* Selected point = larger pin with white ring
* User location = blue filled dot + soft ring

---

## 7.10 Chips / filters

Examples:

* All
* Nearby
* Arriving soon
* Express
* Favorite routes

**Specs:**

* Height: 32
* Horizontal padding: 12
* Selected = orange soft bg + orange text
* Default = white bg + gray border

---

## 7.11 Floating CTA

For map and route screens.

Examples:

* `Надад ойр буудал`
* `Чиглэл эхлүүлэх`
* `Live автобусаар шүүх`

---

## 8. Screen list

Create these high-fidelity screens in Figma.

### 1. Splash / Welcome

**Purpose:** branding + fast entry

**Content:**

* Logo / app mark
* App name: UB Smart Bus
* Tagline: `Хот дотор зорчих хамгийн хялбар арга`
* Primary CTA: `Эхлэх`
* Secondary text: `Байршлаа ашиглан ойролцоох буудлыг хараарай`

**Visual:**

* White base
* Orange accent wave / top illustration
* Minimal transit icon pattern in background

---

### 2. Home Dashboard

**Purpose:** main hub for all common actions

**Sections:**

* Greeting / location summary
* Search bar
* 4 quick action cards
* Nearby stops preview
* Favorite routes preview
* Fare info shortcut banner

**Recommended layout:**

* App bar with location selector
* Search field
* 2x2 grid quick actions
* Section: `Ойролцоох буудлууд`
* Section: `Дуртай чиглэлүүд`

---

### 3. Search Routes

**Purpose:** search by route number or destination

**Content:**

* Search app bar
* Search field active
* Recent searches chips
* Route result list

**Example items:**

* `XO:112 (Хонхор - Офицеруудын ордон)`
* `XO:12 (Мал бордох - 5 шар)`
* `XO:13 (Баруун 4 зам - 10 хороо)`

**Interaction:**
Tap result → Route Detail

---

### 4. Route Detail / Live Stops Timeline

**Purpose:** show all stops and live bus progress

**Header:**

* Route number badge
* Full route name
* Favorite icon

**Segment control:**

* `Эхлэх чиг`
* `Эцсийн чиг`

**Body:**

* Route summary card
* Live buses small chips
* Stop timeline with ETA
* Current selected bus highlighted

**Bottom CTA:**

* `Газрын зураг дээр харах`

---

### 5. Search Stops

**Purpose:** search bus stop by number/name

**Content:**

* Search field with stop number example
* Result list as simple rows/cards
* Each row shows stop name + icon + distance if available

**Examples:**

* `10 буудал`
* `10 ШАР БАЙР`
* `10-р хороолол`

Tap result → Stop Detail / Arrivals

---

### 6. Stop Detail / Arrivals

**Purpose:** show buses arriving at a selected stop

**Header card:**

* Stop name
* Stop ID
* Favorite toggle
* Distance from user

**List items:**

* Route number
* Destination
* Next arrival time
* Stops away count
* Optional occupancy icon

**Visual logic:**

* ETA biggest element in each row
* Use color-coded minute pill

---

### 7. Map / Nearby Transit

**Purpose:** map-first discovery screen

**Content:**

* Full-screen map
* Top floating search field
* Filter chips below search
* Live bus markers
* Stop markers
* Floating locate-me button
* Bottom sheet preview when a stop/pin is selected

**Bottom sheet mini card:**

* Stop name
* 2 upcoming buses
* CTA: `Дэлгэрэнгүй`

---

### 8. Fare Information

**Purpose:** modern version of fee info screen

**Content:**

* Tabs: `Карт`, `Бэлэн`, `Хөнгөлөлт`, `Нөхцөл`
* Fare cards or table card
* Info notice box

**Cards example:**

* Adult card
* Student card
* Senior / special category
* Transfer rules

---

### 9. Favorites

**Purpose:** save frequent routes and stops

**Sections:**

* Favorite routes
* Favorite stops
* Recent viewed

**Empty state:**

* Star illustration
* `Одоохондоо хадгалсан зүйл алга`
* CTA: `Чиглэл хайх`

---

### 10. More / Settings

**Purpose:** utilities and preferences

**Items:**

* Notifications
* Language
* Dark mode placeholder
* Help / FAQ
* About app
* Contact / feedback

---

## 9. Prototype flow

### Main flow

1. Splash → Home
2. Home → Search Routes
3. Search Routes → Route Detail
4. Home → Search Stops
5. Search Stops → Stop Detail
6. Home → Map
7. Map pin tap → Stop bottom sheet → Stop Detail
8. Home → Fare Information
9. Bottom Nav → Favorites / More

### Suggested clickable prototype logic in Figma

* Quick action cards on Home should navigate to the corresponding main screens
* Bottom nav should work on all core screens
* Route result row should open Route Detail
* Stop result row should open Stop Detail
* Map selected stop should open bottom sheet overlay
* Bottom sheet CTA should open full stop detail screen

---

## 10. Suggested Figma pages

### Page 1 — Foundations

* Colors
* Typography
* Grid / spacing
* Radius / elevation
* Icons

### Page 2 — Components

* App bar
* Buttons
* Search field
* Chips
* Quick action cards
* Route rows
* Arrival cards
* Timeline items
* Bottom nav
* Bottom sheet
* Empty states

### Page 3 — Screens

* 10 high-fidelity screens in order

### Page 4 — Prototype

* Same screens duplicated or linked cleanly with annotations

---

## 11. Auto layout rules for Figma

### Screen container

* Vertical auto layout
* Width: fill frame
* Padding: 16 left/right, 16 top, 24 bottom
* Gap: 16

### Cards

* Vertical auto layout
* Padding: 14–16
* Gap: 8 or 12
* Radius: 16

### Rows

* Horizontal auto layout
* Align center
* Gap: 12
* Height: hug or fixed 56–72

### Lists

* Vertical auto layout
* Gap: 0 if using dividers
* Gap: 12 if using separate cards

---

## 12. Microinteractions

### Suggested interactions

* Search field focus glow in soft orange
* Favorite icon fill/unfill
* ETA chip updates by state
* Selected route row gets soft orange background
* Map pin selected grows slightly
* Bottom sheet slides up
* Tabs/chips animate 150–200 ms ease out

---

## 13. Accessibility notes

* Minimum touch target: 44 × 44
* Do not rely on color only for arrival status; pair with text like `2 мин`
* Keep body text at 14+ px minimum
* Maintain high contrast on orange buttons using white text only on strong orange background
* Use icons with labels in bottom nav

---

## 14. Sample screen copy

### Home

* Title: `Сайн байна уу`
* Subtitle: `Таны ойролцоох автобусны мэдээлэл`
* Search placeholder: `Чиглэл, буудал, автобус № хайх`
* Section: `Ойролцоох буудлууд`
* Section: `Дуртай чиглэлүүд`

### Route detail

* CTA: `Газрын зураг дээр харах`
* Tabs: `Явах чиглэл`, `Буцах чиглэл`
* Card label: `Дараагийн автобус`

### Fare info

* Header: `Төлбөрийн мэдээлэл`
* Notice title: `Анхаарах зүйл`
* Notice body: `Төлбөрийн нөхцөл, хөнгөлөлтийн ангилал нь картын төрлөөс хамаарч өөр байна.`

---

## 15. What to present in class

### Show these clearly

* Before/after difference from old UB Smart Bus screenshots
* Better information hierarchy
* Unified component system
* Easier navigation
* Modernized visual identity
* Realistic commuter use flow

### Nice one-line defense

`Энэ прототип нь хуучин интерфэйсийн мэдээллийн бөөгнөрөл, сул hierarchy, хуучирсан visual language-ийг засаж, илүү ойлгомжтой, хурдан ашиглах боломжтой transit-first mobile UX болгон шинэчилсэн.`

---

## 16. Fast build order in Figma

1. Make color + text styles
2. Create 8-point spacing tokens
3. Build app bar, search, chips, cards, bottom nav
4. Build home screen first
5. Reuse components for route, stop, fare, map screens
6. Add prototype links last

---

## 17. Optional extra polish

* Add a dark mode exploration page
* Add onboarding permission modal for location access
* Add live bus occupancy badges: Low / Medium / Full
* Add service alert banner for route disruptions

---

## 18. Final deliverable checklist

* [ ] Color styles created
* [ ] Text styles created
* [ ] Core components built as variants
* [ ] 8–10 mobile screens finished
* [ ] Prototype links added
* [ ] Consistent spacing and radius
* [ ] Presentation-ready file organization

If needed, next step is to turn this into a **screen-by-screen wireframe list with exact element order** so it becomes even faster to draw in Figma.
