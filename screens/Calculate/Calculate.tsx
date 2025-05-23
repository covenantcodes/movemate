import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Modal,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../utils/colors";
import { FONTFAMILY, FONTSIZE } from "../../utils/fonts";
import Icon from "../../components/common/Icon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import images from "../../utils/images";

const packageOptions = [
  { id: "1", label: "Box" },
  { id: "2", label: "Envelope" },
  { id: "3", label: "Pallet" },
  { id: "4", label: "Crate" },
  { id: "5", label: "Tube" },
];

const categoryOptions = [
  { id: "1", label: "Documents" },
  { id: "2", label: "Glass" },
  { id: "3", label: "Liquid" },
  { id: "4", label: "Food" },
  { id: "5", label: "Electronic" },
  { id: "6", label: "Product" },
  { id: "7", label: "Others" },
];

const CalculateScreen = () => {
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState("Box");
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const backButtonX = useRef(new Animated.Value(-50)).current;
  const titleY = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      // Reset animation values to their starting positions
      backButtonX.setValue(-50);
      titleY.setValue(30);
      fadeAnim.setValue(0);

      Animated.parallel([
        // Animate back button sliding in from left
        Animated.timing(backButtonX, {
          toValue: 0,
          duration: 600,
          delay: 100,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        // Animate title sliding up
        Animated.timing(titleY, {
          toValue: 0,
          duration: 600,
          delay: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        }),
        // Fade in both elements
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {};
    }, [])
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePackageSelect = (packageType: string) => {
    setSelectedPackage(packageType);
    setIsPackageDropdownOpen(false);
  };

  const togglePackageDropdown = () => {
    setIsPackageDropdownOpen(!isPackageDropdownOpen);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const renderPackageOption = ({
    item,
  }: {
    item: { id: string; label: string };
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.dropdownItem,
          selectedPackage === item.label && styles.dropdownItemSelected,
        ]}
        onPress={() => handlePackageSelect(item.label)}
      >
        <Text
          style={[
            styles.dropdownItemText,
            selectedPackage === item.label && styles.dropdownItemTextSelected,
          ]}
        >
          {item.label}
        </Text>
        {selectedPackage === item.label && (
          <Icon name="checkMark" size={18} color={colors.primaryColor} />
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({
    item,
  }: {
    item: { id: string; label: string };
  }) => {
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected
            ? styles.selectedCategoryButton
            : styles.unselectedCategoryButton,
        ]}
        onPress={() => handleCategorySelect(item.id)}
        activeOpacity={0.7}
      >
        {isSelected && (
          <Icon
            name="checkMark"
            size={16}
            color={colors.white}
            style={styles.categoryIcon}
          />
        )}
        <Text
          style={[
            styles.categoryButtonText,
            isSelected
              ? styles.selectedCategoryText
              : styles.unselectedCategoryText,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateX: backButtonX }],
            }}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Icon name="arrowLeft" size={28} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text
            style={[
              styles.headerTitle,
              {
                opacity: fadeAnim,
                transform: [{ translateY: titleY }],
              },
            ]}
          >
            Calculate
          </Animated.Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Destination Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination</Text>

          <View style={styles.inputsContainer}>
            {/* First Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="inboxArrowUp"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Sender location"
                placeholderTextColor={colors.gray}
              />
            </View>

            {/* Second Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="inboxArrowDown"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Receiver location"
                placeholderTextColor={colors.gray}
              />
            </View>

            {/* Third Input */}
            <View style={styles.inputBox}>
              <View style={styles.iconContainer}>
                <Icon
                  name="scale"
                  size={27}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Approx weight"
                placeholderTextColor={colors.gray}
              />
            </View>
          </View>
        </View>

        {/* Packaging Section */}
        <View style={styles.packagingSection}>
          <Text style={styles.sectionTitle}>Packaging</Text>
          <Text style={styles.sectionDescription}>What are you sending?</Text>

          <View style={styles.inputsContainer}>
            {/* Dropdown Input */}
            <TouchableOpacity
              style={styles.inputBox}
              onPress={togglePackageDropdown}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={images.box}
                  style={styles.packageIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.dropdownText}>{selectedPackage}</Text>
              <Icon
                name={isPackageDropdownOpen ? "chevronUp" : "chevronDown"}
                size={18}
                color={colors.gray}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionDescription}>What are you sending?</Text>

          <View style={styles.categoriesContainer}>
            <FlatList
              data={categoryOptions}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal={false}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
        </View>
      </View>

      {/* Package Options Modal */}
      <Modal
        visible={isPackageDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPackageDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPackageDropdownOpen(false)}
        >
          <View style={styles.dropdownContainer}>
            <FlatList
              data={packageOptions}
              renderItem={renderPackageOption}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.lg,
    fontFamily: FONTFAMILY.semibold,
    color: colors.white,
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  section: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  sectionDescription: {
    fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.md,
    color: colors.gray,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.specialMedium,
    fontSize: FONTSIZE.lg,
    color: colors.blue,
    marginBottom: 10,
  },
  packagingSection: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  categorySection: {},
  inputsContainer: {
    width: "100%",
    backgroundColor: colors.white,
    shadowColor: colors.gray6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  inputBox: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: colors.grayBg2,
    marginVertical: 6,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: colors.gray6,
  },
  packageIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    color: colors.black,
    marginLeft: 4,
  },
  text: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
  },
  dropdownText: {
    flex: 1,
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.lg,
    color: colors.black,
    marginLeft: 4,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 10,
    maxHeight: 300,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBg2,
  },
  dropdownItemSelected: {
    backgroundColor: colors.grayBg2,
  },
  dropdownItemText: {
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
    color: colors.black,
  },
  dropdownItemTextSelected: {
    color: colors.primaryColor,
  },
  categoriesContainer: {
    borderRadius: 16,
    // padding: 10,
  },
  categoriesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 9,
    marginRight: 8,
    marginBottom: 10,
    minWidth: 90,
  },
  selectedCategoryButton: {
    backgroundColor: colors.blue,
  },
  unselectedCategoryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray5,
  },
  categoryButtonText: {
    // textAlign: "center",
    fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.md,
  },
  selectedCategoryText: {
    color: colors.white,
  },
  unselectedCategoryText: {
    color: colors.blue,
  },
  categoryIcon: {
    marginRight: 6,
  },
});

export default CalculateScreen;
