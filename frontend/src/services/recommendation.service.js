class RecommendationService {
  getRecommendations = (
    formData = { selectedPreferences: [], selectedFeatures: [] },
    products
  ) => {
    const productPreferences = new Set(formData.selectedPreferences)
    const productFeatures = new Set(formData.selectedFeatures)

    const productRecommendations = products.filter(product => {
      const preferencesOutput = product.preferences.some(preference =>
        productPreferences.has(preference)
      )
      const featuresOutput = product.features.some(feature =>
        productFeatures.has(feature)
      )
      return preferencesOutput || featuresOutput
    })

    return formData.selectedRecommendationType === 'SingleProduct'
      ? productRecommendations.slice(-1)
      : productRecommendations
  }
}

export default RecommendationService

/**
 * Como há apenas preferências e features, acredito que isso já é o suficiente.
 * Porém, gostaria de ressaltar outras alternativas que pensei:
 * Vamos supor que houvesse mais filtros, como range de valor...
 * Não valeria a pena seguir como foi feito, e sim, talvez unificar tudo em
 * um vetor separando por identificadores, e depois utilizar um switch para
 * validação se baseando neles, tornando assim o código bem mais clean em alta
 * escala.
 * */
