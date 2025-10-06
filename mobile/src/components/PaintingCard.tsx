import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Painting } from '../api/paintings'

interface PaintingCardProps {
  painting: Painting
  onPress: () => void
}

export default function PaintingCard({ painting, onPress }: PaintingCardProps) {
  const getDifficultyText = (difficulty: number) => {
    if (difficulty === 1) return '⭐ Easy'
    if (difficulty === 2) return '⭐⭐ Medium'
    return '⭐⭐⭐ Hard'
  }

  const getDifficultyColor = (difficulty: number): [string, string] => {
    if (difficulty === 1) return ['#2ecc71', '#27ae60']
    if (difficulty === 2) return ['#f39c12', '#e67e22']
    return ['#e74c3c', '#c0392b']
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: painting.thumbnailUrl || 'https://via.placeholder.com/400x300?text=🎨' }}
          style={styles.image}
          resizeMode="cover"
        />
        {painting.featured && (
          <LinearGradient
            colors={['#f093fb', '#f5576c']}
            style={styles.featuredBadge}
          >
            <Text style={styles.badgeText}>⭐ Featured!</Text>
          </LinearGradient>
        )}
        <LinearGradient
          colors={getDifficultyColor(painting.difficulty)}
          style={styles.difficultyBadge}
        >
          <Text style={styles.badgeText}>{getDifficultyText(painting.difficulty)}</Text>
        </LinearGradient>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{painting.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{painting.description}</Text>
        <View style={styles.footer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.categoryBadge}
          >
            <Text style={styles.categoryText}>{painting.category}</Text>
          </LinearGradient>
          <Text style={styles.views}>👁️ {painting.viewCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: '#ffeaa7',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#f0f0f0',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  views: {
    color: '#b2bec3',
    fontWeight: '600',
    fontSize: 12,
  },
})
