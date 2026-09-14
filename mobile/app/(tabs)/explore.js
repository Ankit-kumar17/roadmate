import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

const FEATURED_PLACES = [
  {
    id: "1",
    title: "Manali Mountain Pass",
    category: "Mountains",
    distance: "540 km",
    duration: "11 hrs",
    emoji: "🏔️",
    desc: "Scenic hairpin bends and Himalayan views.",
  },
  {
    id: "2",
    title: "Goa Coastal Highway",
    category: "Beach",
    distance: "590 km",
    duration: "10 hrs",
    emoji: "🏖️",
    desc: "Sunsets, palm trees and coastal breezes.",
  },
  {
    id: "3",
    title: "Jaipur Heritage Route",
    category: "Heritage",
    distance: "280 km",
    duration: "5 hrs",
    emoji: "🏰",
    desc: "Royal palaces and desert horizons.",
  },
  {
    id: "4",
    title: "Munnar Tea Trails",
    category: "Nature",
    distance: "130 km",
    duration: "3.5 hrs",
    emoji: "🌿",
    desc: "Lush green hills and foggy tea estates.",
  },
];

const CATEGORIES = ["All", "Mountains", "Beach", "Heritage", "Nature"];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = FEATURED_PLACES.filter((place) => {
    const matchesCategory =
      selectedCategory === "All" || place.category === selectedCategory;
    const matchesSearch =
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover incredible routes & places</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search scenic routes, hills, beaches..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.activeCategoryChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Popular Routes */}
        <Text style={styles.sectionHeader}>Featured Road Trips</Text>

        {filteredPlaces.map((place) => (
          <View key={place.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{place.emoji}</Text>
              <View style={styles.cardTitleContainer}>
                <Text style={styles.cardTitle}>{place.title}</Text>
                <Text style={styles.cardCategory}>{place.category}</Text>
              </View>
            </View>

            <Text style={styles.cardDesc}>{place.desc}</Text>

            <View style={styles.cardFooter}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Distance</Text>
                <Text style={styles.metaValue}>{place.distance}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Est. Time</Text>
                <Text style={styles.metaValue}>{place.duration}</Text>
              </View>

              <Pressable
                style={styles.planButton}
                onPress={() => router.push("/create-trip")}
              >
                <Text style={styles.planButtonText}>Plan Trip</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: "#4F46E5",
    borderColor: "#4F46E5",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
    marginTop: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  metaItem: {
    alignItems: "flex-start",
  },
  metaLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginTop: 2,
  },
  planButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  planButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
