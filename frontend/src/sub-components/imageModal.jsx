import React from 'react';
import { useTheme, Dialog, Typography, Box, Card, CardHeader, CardMedia, CardActions, IconButton } from '@mui/material';
import { makeStyles } from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FaceIcon from '@mui/icons-material/Face';

const ImageModal = ({ isModalOpen, onHandleModalClose, image }) => {
    const theme = useTheme();
    
    // I use this method in order to set classes to MUI components
    const useStyles = makeStyles({
        card: {
            width: '100%',
            maxWidth: '100%',
            height: '40%'
        },
        iconButton: {
            position: 'absolute',
            right: 8,
            top: 8,
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px',
        },
        actionContainer: {
            display: 'flex',
        },
        actionText: {
            marginInlineStart: '3px',
            color: theme.palette.grayDark
        },
        actionIcon: {
            color: theme.palette.purple
        }
    });

    const classes = useStyles();

    // I manipulate the given string in order to add a #hashtag symbol
    const hashtag = ' #';
    const tags = image.tags && image.tags.split(', ').map(tag => hashtag.concat(tag.split(' ').join(''))).join('');

    return (
        <Dialog open={isModalOpen} sx={{ height: '80%' }}>
            <Card className={classes.card}>
                <IconButton
                    aria-label="close"
                    onClick={onHandleModalClose}
                    className={classes.iconButton}
                >
                    <CloseIcon />
                </IconButton>

                <CardHeader
                    avatar={
                        <FaceIcon className={classes.actionIcon}/>
                    }
                    title={image.user}
                    subheader={tags}
                />

                <CardMedia
                    component="img"
                    height="70%"
                    image={image.webformatURL}
                    alt={image.tags}
                    sx={{maxHeight: '500px'}}
                />
                
                <CardActions className={classes.actions}>
                    <Box className={classes.actionContainer}>
                        <VisibilityIcon className={classes.actionIcon} /><Typography className={classes.actionText}>{image.views}</Typography>
                    </Box>
                    <Box className={classes.actionContainer}>
                        <DownloadIcon className={classes.actionIcon} /><Typography className={classes.actionText}>{image.downloads}</Typography>
                    </Box>
                    <Box className={classes.actionContainer}>
                        <ThumbUpIcon className={classes.actionIcon} /><Typography className={classes.actionText}>{image.likes}</Typography>
                    </Box>
                </CardActions>
            </Card>
        </Dialog>
    );
}

export default ImageModal;