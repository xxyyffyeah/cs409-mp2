// src/services/ArtInstituteChicagoAPIbyID.ts
import axios from 'axios';
import { ArtWorkDetail } from '../components/types';
import axiosInstance from './ArtInstitueChicagoInstance';

interface ApiArtWorkDetail {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  description: string;
  image_id: string;
}

interface ApiResponse {
  data: ApiArtWorkDetail;
}

export const getArtworkById = async (
  id: number | string,
  signal?: AbortSignal
): Promise<ArtWorkDetail> => {
  try {
    const response = await axiosInstance.get<ApiResponse>(`/artworks/${id}`, {
      params: {
        fields: 'id,title,artist_display,date_display,description,image_id'
      },
      signal,
    });

    const item = response.data.data;
    const artworkDetail: ArtWorkDetail = {
      id: item.id,
      title: item.title,
      artist: item.artist_display || 'Unknown Artist',
      year: parseInt(item.date_display) || 0,
      description: item.description || null,
      imageUrl: item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg` : undefined,
    };

    return artworkDetail;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching artwork by ID:', error);
    }
    throw error;
  }
};