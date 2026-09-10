import { useState } from 'react';
import './VideoPromo.css';

const VideoPromo = () => {
    const [isVideoReady, setIsVideoReady] = useState(false);

    return (
        <section className="video-promo" aria-label="Промо-видео">
            {!isVideoReady && (
                <div
                    className="video-promo__loading"
                    aria-label="Загрузка видео"
                >
                    <img
                        className="video-promo__preview"
                        src="/images/push-me-preview.png"
                        alt=""
                    />
                    <div className="video-promo__overlay">
                        <span className="video-promo__spinner" />
                    </div>
                </div>
            )}
            <video
                className={`video-promo__video ${isVideoReady ? 'is-ready' : ''}`}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                onLoadedData={() => setIsVideoReady(true)}
            >
                <source src="/videos/push_me.mp4" type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
            </video>
        </section>
    );
};

export default VideoPromo;
