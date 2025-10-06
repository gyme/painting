import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'

export default function HomeScreen({ navigation }: any) {
  const { data: featuredData, isLoading: featuredLoading } = useQuery({
    queryKey: ['featuredPaintings'],
    queryFn: () => paintingsApi.getFeaturedPaintings(0, 6),
  })

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ['popularPaintings'],
    queryFn: () => paintingsApi.getPopularPaintings(0, 6),
  })

  const { data: allData, isLoading: allLoading } = useQuery({
    queryKey: ['allPaintings'],
    queryFn: () => paintingsApi.getAllPaintings(0, 12),
  })

  if (featuredLoading || popularLoading || allLoading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>🎨 Loading amazing paintings... ✨</Text>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>🎨 Welcome! 🌈</Text>
          <Text style={styles.heroSubtitle}>Color amazing animals, nature, and more!</Text>
        </View>

        <View style={styles.categoryButtons}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Category', { category: 'Animals' })}
          >
            <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.categoryGradient}>
              <Text style={styles.categoryButtonText}>🐶 Animals</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Category', { category: 'Nature' })}
          >
            <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.categoryGradient}>
              <Text style={styles.categoryButtonText}>🌳 Nature</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('Category', { category: 'Vehicles' })}
          >
            <LinearGradient colors={['#fa709a', '#fee140']} style={styles.categoryGradient}>
              <Text style={styles.categoryButtonText}>🚗 Vehicles</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {featuredData && featuredData.content.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ Featured Paintings</Text>
            {featuredData.content.map((painting) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                onPress={() => navigation.navigate('Painting', { urlKey: painting.urlKey })}
              />
            ))}
          </View>
        )}

        {popularData && popularData.content.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔥 Most Popular</Text>
            {popularData.content.map((painting) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                onPress={() => navigation.navigate('Painting', { urlKey: painting.urlKey })}
              />
            ))}
          </View>
        )}

        {allData && allData.content.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎨 All Paintings</Text>
            {allData.content.map((painting) => (
              <PaintingCard
                key={painting.id}
                painting={painting}
                onPress={() => navigation.navigate('Painting', { urlKey: painting.urlKey })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  hero: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  categoryButton: {
    flex: 1,
    minWidth: 100,
  },
  categoryGradient: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },
})
