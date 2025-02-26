import axios from 'axios'

const local = 'localhost:32768'

export const getScrapes = async (hashtags, resultsLimit = 9, searchType = 'top') => {
    try {
      const response = await axios.post(`https://${local}/api/Scraper/Hashtags`, {
        hashtags: hashtags,
        resultsLimit: resultsLimit,
        searchType: searchType
      })
      return response.data
    } catch (error) {
      console.error('Error fetching scrapes:', error)
      throw error 
    }
  }