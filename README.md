# MoveMate

MoveMate is a mobile application built with React Native that offers logistics and shipping services, allowing users to track, calculate, and manage their shipments with ease.

## 📱 Features

- **Home Dashboard**: Overview of recent shipments and quick access to services
- **Shipment Tracking**: Real-time tracking of packages and deliveries
- **Cost Calculator**: Calculate shipping costs based on various parameters
- **Search Functionality**: Find shipments and services easily
- **User Profiles**: Manage user information and preferences

## 🛠️ Tech Stack

- React Native
- React Navigation (v6)
- TypeScript
- Custom UI Components
- React Native Animated API
- Expo Vector Icons

## 🏗️ Project Structure

```
movemate/
├── components/         # Reusable UI components
├── screens/            # Screen components
│   ├── Home/           # Home screen and related components
│   ├── Calculate/      # Shipping cost calculator screens
│   ├── Shipments/      # Shipment tracking screens
│   ├── Profile/        # User profile screens
│   └── Search/         # Search functionality
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx    # Main app navigation container
│   └── MainNavigator.tsx   # Tab navigation structure
├── assets/             # Images, fonts, and other static assets
├── utils/              # Utility functions and constants
└── App.tsx             # Entry point for the application
```

## 📋 Navigation Structure

The app uses a combination of stack and tab navigation:

- **AppNavigator**: Top-level navigation container with stack navigation
  - MainTabs (Tab Navigator)
  - Search Screen
  - Calculate Result Screen
- **MainNavigator**: Bottom tab navigation with the following tabs:
  - Home
  - Calculate
  - Shipment
  - Profile

## ✨ Animations

MoveMate uses React Native's Animated API extensively to create a polished user experience:

### Animation Types

- **Entrance Animations**: Components fade in, slide, or scale when screens load
- **Interaction Feedback**: Elements respond to user interactions with subtle animations
- **Staggered Animations**: List items animate sequentially for a cascading effect
- **Scroll-based Animations**: Elements animate based on scroll position
- **Tab Transitions**: Custom tab indicator animations for smooth navigation

### Animation Implementation

```tsx
// Example of staggered animation for list items
cardAnimations.forEach((anim, index) => {
  Animated.parallel([
    Animated.timing(anim.translateY, {
      toValue: 0,****
      duration: 800,
      delay: 700 + index * 100, // Stagger effect
      useNativeDriver: true,****
      easing: Easing.out(Easing.back(1.5)),
    }),
    Animated.timing(anim.opacity, {
      toValue: 1,
      duration: 800,
      delay: 700 + index * 100,
      useNativeDriver: true,
    }),
  ]).start();
});
```

### Animation Optimization

- **useNativeDriver: true**: Offloads animations to the native thread for better performance
- **Composite Animations**: Combines multiple animations for complex effects
- **Easing Functions**: Custom easing curves for natural motion
- **Animation Cleanup**: Properly managed animation lifecycles to prevent memory leaks

## 🧩 Shared Components

The app utilizes a robust shared component architecture for consistency and code reusability:

### Core Components

- **Icon**: Unified icon system supporting multiple icon libraries

  ```tsx
  <Icon name="arrowLeft" size={28} color={colors.white} />
  ```

- **PulseIndicator**: Custom loading indicator with animated pulsing effect

  ```tsx
  <PulseIndicator color={colors.primaryColor} size={40} />
  ```

- **CustomTabBar**: Animated bottom tab navigation with custom transitions

  ```tsx
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} />
  ```

- **DashboardHeader**: Collapsible header with integrated search functionality
  ```tsx
  <DashboardHeader
    onSearchResults={handleSearchResults}
    searchData={searchData}
  />
  ```

### Card Components

- **ShipmentCard**: Displays shipment information with scroll-based animations
- **TrackingCard**: Shows detailed tracking information for active shipments
- **VehicleCard**: Presents available vehicle options with staggered reveal animations

### Design System

- **Colors**: Centralized color palette in `utils/colors.ts`
- **Typography**: Consistent font families and sizes in `utils/fonts.ts`
- **Images**: Organized image references in `utils/images.ts`

### Component Communication

- **Props**: Standard property passing for component configuration
- **Callbacks**: Event handlers for component interactions
- **Refs**: Direct component manipulation for complex animations
- **Context (where needed)**: Shared state for deeply nested components

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- React Native development environment set up

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/covenantcodes/movemate.git
   cd movemate
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. Run the application:

   ```
   # For iOS
   npx react-native run-ios

   # For Android
   npx react-native run-android
   ```

## 🔧 Development

### Adding New Screens

1. Create a new screen component in the appropriate directory under `screens/`
2. Add the screen to the navigation in either `AppNavigator.tsx` or `MainNavigator.tsx` depending on where it belongs

### Adding Animations

1. Import required components:

   ```tsx
   import { Animated, Easing } from "react-native";
   ```

2. Create animation values:

   ```tsx
   const fadeAnim = useRef(new Animated.Value(0)).current;
   ```

3. Configure and start the animation:

   ```tsx
   Animated.timing(fadeAnim, {
     toValue: 1,
     duration: 500,
     useNativeDriver: true,
   }).start();
   ```

4. Apply to components:
   ```tsx
   <Animated.View style={{ opacity: fadeAnim }}>{/* Content */}</Animated.View>
   ```

### Styling Guidelines

- Use the app's color scheme consistently
- Follow the component structure for consistent UI experience
- Ensure all screens are responsive for different device sizes
- Apply animations thoughtfully to enhance UX without overwhelming users

## 📝 License

[MIT License](LICENSE)

## 👥 Contributors

- Covenant Popoola - [covenantcodes](https://github.com/covenantcodes)

## 🙏 Acknowledgments

- I appreciate MoniePoint Group for the opportunity to participate in this interview design challenge
- Design inspiration from Musemind on Dribbble (https://dribbble.com/shots/21617837-Movemate-Shipments-Mobile-App)
- Inspiration from MoveMate mobile
- React Native community for excellent libraries and tools
