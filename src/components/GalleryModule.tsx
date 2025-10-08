import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArtworksByArtist, getFamousArtists } from '../services/ArtInstituteChicagoGalleryAPI';
import { ArtWork } from './types';
import styles from './GalleryModule.module.scss';
import { useSearchResults } from '../contexts/context';

function GalleryModule() {
  const [selectedArtist, setSelectedArtist] = useState<string>('Monet');
  const [artworks, setArtworks] = useState<ArtWork[]>([]);
  const artists = getFamousArtists();
  const { setSearchResults } = useSearchResults();
  useEffect(() => {
    setSearchResults(artworks);
  }, [artworks, setSearchResults]);
  
  useEffect(() => {
    const abortController = new AbortController();

    const fetchArtworks = async () => {
      try {
        const data = await getArtworksByArtist(
          selectedArtist,
          24,
          abortController.signal
        );
        setArtworks(data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Error loading gallery artworks:', error);
        }
      }
    };

    fetchArtworks();

    return () => {
      abortController.abort();
    };
  }, [selectedArtist]);

  return (
    <div className={styles.galleryModule}>
      <div className={styles.categoryFilters}>
        {artists.map(artist => (
          <button
            key={artist}
            onClick={() => setSelectedArtist(artist)}
            className={`${styles.categoryButton} ${selectedArtist === artist ? styles.active : ''
              }`}
          >
            {artist}
          </button>
        ))}
      </div>

      <div className={styles.artworkGrid}>
        {artworks.map(artwork => (
          <Link
            to={`/details/${artwork.id}`}
            key={artwork.id}
            className={styles.artworkCard}
          >
            {artwork.thumbnailUrl && (
              <div className={styles.imageContainer}>
                <img
                  src={artwork.thumbnailUrl}
                  alt={artwork.title}
                  className={styles.artworkImage}
                />
              </div>
            )}
            <div className={styles.artworkInfo}>
              <h3 className={styles.title}>{artwork.title}</h3>
              <p className={styles.artist}>{artwork.artist}</p>
              <p className={styles.year}>{artwork.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryModule;
