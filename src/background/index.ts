import {QdrantClient} from '@qdrant/js-client-rest';

const QDRANT_URL =
  'https://c47ff58f-c091-42cb-9d10-56766316d612.us-east4-0.gcp.cloud.qdrant.io:6333'
const API_KEY = 'oFx8g1WL3jaCLMU8T5Njub8iHbZKvyHPjcUrV7odSvU55sUjsMDQZQ'

const client = new QdrantClient({
  url: QDRANT_URL,
  apiKey: API_KEY,
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'searchProfessors') {
    client
      .scroll('professors', {
      filter: {
        should: [
        {
          key: 'subjects',
          match: { value: request.subject },
        },
        ],
      },
      limit: 10,
      })
      .then((response: { points: any[] }) => {
      sendResponse({ success: true, data: response.points })
      })
      .catch((error: Error) => {
      console.error('Error searching professors:', error)
      sendResponse({ success: false, error: error.message })
      })

    return true
  }
})
