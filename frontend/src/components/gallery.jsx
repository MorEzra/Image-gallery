import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Box, Alert, CircularProgress } from '@mui/material';

import ImageModal from '../sub-components/imageModal';

const Gallery = ({
    URL,
    pageNum,
    category,
    toggleIsPaginationClickDisabled,
    toggleIsShowSnacknar,
    setSnackbarMessage,
    setSnackbarSeverity }) => {

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState({});

    useEffect(() => {
        getImages();
    }, [pageNum, category]);

    const getImages = async () => {
        // disable pagination click in order to prevent multiple requests
        toggleIsPaginationClickDisabled();
        setIsLoading(prevIsLoading => !prevIsLoading);

        /* I ask for all the images,
        and if there is a chosen category then I attach it as a param */
        let requestURL = `${URL}/images/${pageNum}`;

        if (category) {
            requestURL = `${URL}/images/${category}/${pageNum}`;
        }

        await axios.get(requestURL)
            .then(res => {
                setImages(res.data);
            }).catch(error => {
                let errorMsg = 'Error...';

                if (error.response) {
                    errorMsg = `${error.response.statusText} (${error.response.status})`;
                } else {
                    errorMsg = error.message;
                }

                console.log("Error: ", errorMsg);
                displaySnackbar(errorMsg, 'error');
                setTimeout(() => {
                    initSnackbar();
                }, 2500);
            }).finally(() => {
                // enable pagination click after API response returned
                toggleIsPaginationClickDisabled();
                setIsLoading(prevIsLoading => !prevIsLoading);
            })
    }

    const onHandleModalOpen = (image) => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
        setCurrentImage(image);
    }

    const onHandleModalClose = () => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    };

    const displaySnackbar = (message, severity) => {
        toggleIsShowSnacknar();
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }

    const initSnackbar = () => {
        toggleIsShowSnacknar();
        setSnackbarMessage('');
        setSnackbarSeverity('error');
    }

    return (
        <div>
            {isLoading ?
                <Box className="preloader">
                    <CircularProgress />
                    <Alert severity="info" sx={{ marginTop: '20px' }}>Wonderful images are on their way to you...</Alert>
                </Box>
                :
                <Box className="galleryContainer">
                    {images.map((item) => {
                        return (
                            <Box key={item.id} className="zoomInContainer">
                                <figure>
                                    <img src={item.webformatURL} alt={item.tags} onClick={() => onHandleModalOpen(item)} />
                                </figure>
                            </Box>)
                    })}
                    <ImageModal isModalOpen={isModalOpen} onHandleModalClose={onHandleModalClose} image={currentImage} />
                </Box>
            }
        </div>
    );
}

// Redux state and actions
const mapStateToProps = state => {
    return {
        pageNum: state.pageNum,
        category: state.category
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleIsPaginationClickDisabled: () => dispatch({ type: "toggleIsPaginationClickDisabled" }),
        toggleIsShowSnacknar: () => dispatch({ type: "toggleIsShowSnackbar" }),
        setSnackbarMessage: (error) => dispatch({ type: "setSnackbarMessage", payload: error }),
        setSnackbarSeverity: (severity) => dispatch({ type: "setSnackbarSeverity", payload: severity }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);