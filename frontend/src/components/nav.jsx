import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTheme, styled, Box, Button } from '@mui/material';
import CategoriesModal from '../sub-components/categoriesModal';

const Nav = ({
    pageNum,
    category,
    isPaginationClickDisabled,
    onHandlePageIncrement,
    onHandlePageDecrement }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const theme = useTheme();

    // I use this method in order to set specific styles to MUI button component
    const ButtonStyle = styled(Button)((props) => ({
        "&.Mui-disabled": {
          color: theme.palette.grayMid,
          backgroundColor: theme.palette.gray,
        },
        minWidth: '120px',
        color: theme.palette.grayDark,
        backgroundColor: theme.palette.purpleLight,
        borderRadius: '50px',
        border: 'none',
        "&:hover": {
          backgroundColor: theme.palette.purple,
          color: theme.palette.grayDark,
          border: 'none',
        },
      }));

    const onToggleModalOpen = () => {
        setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    }

    return (
        <Box className="nav">
            <ButtonStyle disabled={pageNum === 1 || isPaginationClickDisabled} variant="outlined" onClick={onHandlePageDecrement}>Previous</ButtonStyle>
            <ButtonStyle disabled={isPaginationClickDisabled} variant="outlined" onClick={onToggleModalOpen}>Choose category</ButtonStyle>
            <ButtonStyle disabled={isPaginationClickDisabled} variant="outlined" onClick={(onHandlePageIncrement)}>Next</ButtonStyle>

            <CategoriesModal isModalOpen={isModalOpen} category={category} onHandleModalClose={onToggleModalOpen} />
        </Box>
    );
}

// connect Redux state and actions
const mapStateToProps = state => {
    return {
        pageNum: state.pageNum,
        category: state.category,
        isPaginationClickDisabled: state.isPaginationClickDisabled
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onHandlePageIncrement: () => dispatch({ type: "increasePageNum" }),
        onHandlePageDecrement: () => dispatch({ type: "decreasePageNum" }),
        setCategory: (selectedValue) => dispatch({ type: "setCategory", payload: selectedValue })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);