class RecommendationService {
  getRecommendations = (
    formData = { selectedPreferences: [], selectedFeatures: [] },
    products
  ) => {
    const isSingleProduct =
      formData.selectedRecommendationType === 'SingleProduct'

    const productPreferences = new Set(formData.selectedPreferences)
    const productFeatures = new Set(formData.selectedFeatures)

    const productMatches = products
      .map(product => {
        const preferenceMatches = product.preferences.filter(preference =>
          productPreferences.has(preference)
        )
        const featureMatches = product.features.filter(feature =>
          productFeatures.has(feature)
        )

        const matchesTotal = preferenceMatches.length + featureMatches.length
        return { ...product, matchesTotal }
      })
      .filter(product => product.matchesTotal > 0)

    if (!isSingleProduct || productMatches.length < 1) return productMatches

    const singleProductMatch = productMatches.reduce((best, product) => {
      return product.matchesTotal >= best.matchesTotal ? product : best
    }, productMatches[0])

    return [singleProductMatch]
  }
}

export default RecommendationService
