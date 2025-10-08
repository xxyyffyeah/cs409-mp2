// src/services/ArtInstituteChicagoGalleryAPI.ts
import axios from 'axios';
import { ArtWork } from '../components/types';
import axiosInstance from './ArtInstitueChicagoInstance';

interface ApiArtWork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  image_id: string | null;
}

interface ApiResponse {
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
  data: ApiArtWork[];
}

export const getArtworksByArtist = async (
  artist?: string,
  limit: number = 20,
  signal?: AbortSignal
): Promise<ArtWork[]> => {
  try {
    let response: any;

    if (!artist || artist === 'All') {
      response = await axiosInstance.get<ApiResponse>('/artworks', {
        params: {
          fields: 'id,title,artist_display,date_display,image_id',
          limit: limit,
        },
        signal,
      });
    } else {
      response = await axiosInstance.get<ApiResponse>('/artworks/search', {
        params: {
          q: artist,
          fields: 'id,title,artist_display,date_display,image_id',
          limit: limit,
        },
        signal,
      });
    }


    const formattedData: ArtWork[] = response.data.data
      .filter((item: ApiArtWork) => item.image_id)
      .map((item: ApiArtWork) => ({
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
      console.error('Error fetching gallery artworks:', error);
    }
    throw error;
  }
};

export const getFamousArtists = (): string[] => {
  return [
    'Monet',
    'Van Gogh',
    'Picasso',
    'Rembrandt',
    'Renoir',
    'Cézanne',
    'Matisse',
    'Degas',
    'Gauguin',
    'Toulouse-Lautrec',
    'Manet',
  ];
};
