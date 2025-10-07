// src/services/artApiService.ts
import axios from 'axios';
import { ArtWork } from '../components/types';
import axiosInstance from './ArtInstitueChicagoInstance';

interface ApiArtWork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string;
}

interface ApiResponse {
  data: ApiArtWork[];
}

export const searchArtworks = async (
  query: string,
  signal?: AbortSignal
): Promise<ArtWork[]> => {
  if (!query.trim()) {
    return [];
  }

  // let coreQuery = `(title:"${query}" OR artist_display:"${query}")`;

  // if (!isNaN(parseInt(query))) {
  //   coreQuery += ` OR id:${query} OR date_display:${query.toString()}`;
  // }


  try {
    const response = await axiosInstance.get<ApiResponse>('/artworks/search', {
      params: {
        q: query,
        fields: 'id,title,artist_display,date_display,image_id'
      },
      signal,
    });
    console.log('Search query:', query);
    console.log('API response data:', response.data); // Debugging line
    const formattedData: ArtWork[] = response.data.data.map(item => ({
      id: item.id,
      title: item.title,
      artist: item.artist_display || 'Unknown Artist',
      year: parseInt(item.date_display) || 0,
      thumbnailUrl: item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg` : undefined,
    }));
    
    return formattedData;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('There was a problem with the Axios operation:', error);
    }
    throw error;
  }
};