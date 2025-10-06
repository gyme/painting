import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'

export default function CategoryScreen({ route, navigation }: any) {
  const { category } = route.params

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryPaintings', category],
    queryFn: () => paintingsApi.getPaintingsByCategory(category, 0, 50),
  })

  if (isLoading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>🎨 Loading {category} paintings... ✨</Text>
      </LinearGradient>
    )
  }

  if (error) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.errorContainer}>
        <Text style={styles.errorText}>😢 Oops! Something went wrong.</Text>
      </LinearGradient>
    )
  }

  const getCategoryEmoji = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'animals': return '🐶'
      case 'nature': return '🌳'
      case 'vehicles': return '🚗'
      case 'fantasy': return '🦄'
      default: return '🎨'
    }
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {getCategoryEmoji(category)} {category} Paintings
          </Text>
        </View>

        {data && data.content.length > 0 ? (
          data.content.map((painting) => (
            <PaintingCard
              key={painting.id}
              painting={painting}
              onPress={() => navigation.navigate('Painting', { urlKey: painting.urlKey })}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No paintings found in this category yet. Check back soon! 🎨
          </Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
})
