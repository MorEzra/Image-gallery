import React from 'react';
import { connect } from 'react-redux';

import { useTheme, Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const CategoriesModal = ({ isModalOpen, onHandleModalClose, setCategory }) => {
    const theme = useTheme();

    // taken from Pixabay docs
    const categories = [
        'backgrounds'
        , 'fashion'
        , 'nature'
        , 'science'
        , 'education'
        , 'feelings'
        , 'health'
        , 'people'
        , 'religion'
        , 'places'
        , 'animals'
        , 'industry'
        , 'computer'
        , 'food'
        , 'sports'
        , 'transportation'
        , 'travel'
        , 'buildings'
        , 'business'
        , 'music'
    ];

    const onHandleCategorySelected = (category) => {
        setCategory(category);
        onHandleModalClose();
    };

    return (
        <Dialog open={isModalOpen} sx={{ height: '80%' }}>
            <DialogTitle>Choose category</DialogTitle>
            <List sx={{ pt: 0 }}>
                {categories.map((category) => (
                    <ListItem button onClick={() => onHandleCategorySelected(category)} key={category}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: theme.palette.grayLight, color: theme.palette.purpleLight }}>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return { ...state }
}

const mapDispatchToProps = dispatch => {
    return {
        setCategory: (selectedCategory) => dispatch({ type: "setCategory", payload: selectedCategory })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesModal);