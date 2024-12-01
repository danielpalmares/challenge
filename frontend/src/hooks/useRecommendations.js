import { useState } from 'react'
import RecommendationService from '../services/recommendation.service'

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([])
  const recommendationService = new RecommendationService()

  const getRecommendations = formData => {
    return recommendationService.getRecommendations(formData, products)
  }

  return { recommendations, getRecommendations, setRecommendations }
}

export default useRecommendations
