import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { paintingsApi } from '../api/paintings'

export default function PaintingScreen({ route, navigation }: any) {
  const { urlKey } = route.params

  const { data: painting, isLoading, error } = useQuery({
    queryKey: ['painting', urlKey],
    queryFn: () => paintingsApi.getPaintingByUrlKey(urlKey),
  })

  if (isLoading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>🎨 Loading your painting... ✨</Text>
      </LinearGradient>
    )
  }

  if (error || !painting) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.errorContainer}>
        <Text style={styles.errorText}>😢 Oops! We couldn't find that painting.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Go Back</Text>
        </TouchableOpacity>
      </LinearGradient>
    )
  }

  const colors = painting.colorPalette ? JSON.parse(painting.colorPalette) : []

  const getDifficultyText = (difficulty: number) => {
    if (difficulty === 1) return 'Easy'
    if (difficulty === 2) return 'Medium'
    return 'Hard'
  }

  const getDifficultyColor = (difficulty: number): [string, string] => {
    if (difficulty === 1) return ['#2ecc71', '#27ae60']
    if (difficulty === 2) return ['#f39c12', '#e67e22']
    return ['#e74c3c', '#c0392b']
  }

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: painting.imageUrl || 'https://via.placeholder.com/600x450?text=🎨' }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{painting.title}</Text>
            <View style={styles.badges}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>{painting.category}</Text>
              </LinearGradient>
              <LinearGradient
                colors={getDifficultyColor(painting.difficulty)}
                style={styles.badge}
              >
                <Text style={styles.badgeText}>{getDifficultyText(painting.difficulty)}</Text>
              </LinearGradient>
              <View style={[styles.badge, styles.viewBadge]}>
                <Text style={styles.badgeText}>👁️ {painting.viewCount}</Text>
              </View>
            </View>
            <Text style={styles.description}>{painting.description}</Text>

            {colors.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎨 Colors to Use:</Text>
                <View style={styles.colorPalette}>
                  {colors.map((color: string, index: number) => (
                    <View
                      key={index}
                      style={[styles.colorSwatch, { backgroundColor: color }]}
                    />
                  ))}
                </View>
              </View>
            )}

            {painting.tags && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏷️ Tags:</Text>
                <View style={styles.tags}>
                  {painting.tags.split(',').map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
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
    marginBottom: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  imageContainer: {
    backgroundColor: '#ffeaa7',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 15,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  viewBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.8)',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    color: '#636e72',
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 10,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(118, 75, 162, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
})
