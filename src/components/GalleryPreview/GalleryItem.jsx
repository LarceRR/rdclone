import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { dataMain } from '../../data/dataMain.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GalleryItem.css';
import RatingRow from '../RatingRow/RatingRow.jsx';

const GalleryItem = ({ blocks }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const path = useParams();
    const data = dataMain.find((elem) => elem.id === path.productId);

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    return (
        <div className="gallery">
            {data.innerBlocks.map((item, itemIndex) => (
                <div className="gallery__container" key={itemIndex}>
                    <div className="gallery__media">
                        {item.map((block, index) => (
                            <div className="gallery-item" key={index}>
                                {block.image && (
                                    <img
                                        src={block.image}
                                        alt="Gallery"
                                        className="gallery-image"
                                        onClick={() =>
                                            openModal({
                                                type: 'image',
                                                src: block.image,
                                            })
                                        }
                                    />
                                )}
                                {block.video && (
                                    <div
                                        className="gallery-video"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent propagation to Modal.Body
                                            openModal({
                                                type: 'video',
                                                src: block.video,
                                            });
                                        }}
                                    >
                                        <img
                                            src={block.prewiev}
                                            alt="Video preview"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="gallery__line"></div>
                    <RatingRow />
                    <p className="gallery-description">{item[0].description}</p>
                </div>
            ))}

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Body className="position-relative">
                    {modalContent && modalContent.type === 'image' && (
                        <img
                            src={modalContent.src}
                            alt="Modal Content"
                            className="w-100"
                        />
                    )}
                    {modalContent && modalContent.type === 'video' && (
                        <video
                            className="w-100"
                            autoPlay
                            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when interacting with the video
                        >
                            <source src={modalContent.src} type="video/mp4" />
                        </video>
                    )}
                    <Button
                        variant="secondary"
                        onClick={closeModal}
                        className="position-absolute top-0 end-0 m-3"
                        aria-label="Close"
                    >
                        &times;
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GalleryItem;
