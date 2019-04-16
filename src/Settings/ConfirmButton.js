import React, {useContext} from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";
import {fontSize1, greenBoxShadow, color3} from "../Shared/Styles";


const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`;

const ConfirmedButtonStyled = styled.div`
    margin: 20px;
    color: ${color3};
    ${fontSize1};
    padding: 5px;
    cursor: pointer;
    &:hover {
        ${greenBoxShadow}
    }
`;


export default function() {
    const {confirmedFavorites} = useContext(AppContext);
    return (
        <CenterDiv>
            <ConfirmedButtonStyled onClick={confirmedFavorites}>
                Confirm Favorites
            </ConfirmedButtonStyled>
        </CenterDiv>
    );
}
