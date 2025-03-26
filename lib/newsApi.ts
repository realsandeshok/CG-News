// lib/newsApi.ts
const NEWS_API_URL = "https://eventregistry.org/api/v1/article/getArticles";
const NEWSAPI_AI_KEY = "df3c55bf-9c8c-4f29-8ec6-3c935491c842";
const NEWS_LANG = "hin";
const NEWS_RESULT_TYPE = "articles";
const NEWS_LOCATION = "http://en.wikipedia.org/wiki/Chhattisgarh"

export async function fetchNews(category: string) {
  try {
    const response = await fetch(`${NEWS_API_URL}?lang=${NEWS_LANG}&resultType=${NEWS_RESULT_TYPE}${category ? `&categoryUri=news/${category}` : ''}&locationUri=${NEWS_LOCATION}&apiKey=${NEWSAPI_AI_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Adjust based on API response format
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}


// const newsCategories = []

