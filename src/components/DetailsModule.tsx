import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtworkById } from '../services/ArtInstituteChicagoAPIbyID';
import { ArtWorkDetail } from './types';
import styles from './DetailsModule.module.scss';

function DetailsModule() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<ArtWorkDetail | null>(null);

  const currentId = id ? parseInt(id) : 0;
  const nextArtwork = {id: currentId + 1, title: ''}; // Placeholder for next artwork};
  const previousArtwork = {id: currentId - 1 > 0 ? currentId - 1 : null, title: ''}; // Placeholder for previous artwork};

  const handleNext = () => {
    if (nextArtwork) {
      navigate(`/details/${nextArtwork.id}`);
    }
  };

  const handlePrevious = () => {
    if (previousArtwork) {
      navigate(`/details/${previousArtwork.id}`);
    }
  };


  useEffect(() => {
    if (!id) {
      return;
    }

    const abortController = new AbortController();

    const fetchArtwork = async () => {
      try {
        const data = await getArtworkById(id, abortController.signal);
        setArtwork(data);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error('Error loading artwork:', err);
        }
      }
    };

    fetchArtwork();

    return () => {
      abortController.abort();
    };
  }, [id]);

  if (!artwork) {
    return null;
  }

  return (
    <div className={styles.detailsModule}>
      <div className={styles.navigationHeader}>
        <Link to="/" className={styles.backLink}>Back to Search</Link>
        <div className={styles.navigationButtons}>
          <button
            onClick={handlePrevious}
            disabled={!previousArtwork}
            className={styles.navButton}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!nextArtwork}
            className={styles.navButton}
          >
            Next →
          </button>
        </div>
      </div>

      <div className={styles.artworkDetail}>
        {artwork.imageUrl && (
          <div className={styles.imageContainer}>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className={styles.artworkImage}
            />
          </div>
        )}

        <div className={styles.artworkInfo}>
          <h2 className={styles.title}>{artwork.title}</h2>
          <p className={styles.artist}>{artwork.artist}</p>
          <p className={styles.year}>{artwork.year}</p>
          <p className={styles.artworkId}>ID: {artwork.id}</p>

          {artwork.description && (
            <div className={styles.description}>
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: artwork.description }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsModule;
