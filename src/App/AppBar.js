import React, {useContext} from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from './AppProvider';

// Component Level Styling
const Logo = styled.div`
    font-size: 1.5em;
`;
const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
    cursor: pointer;
    margin-bottom: 40px;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03;
    `}
`;

const ControlButton = ({name}) => {
    const {page, setPage} = useContext(AppContext);
    return (
        <ControlButtonElem
            active={page === name}
            onClick={() => setPage(name)}>
            {toProperCase(name)}
        </ControlButtonElem>
    )
};

// Component Level Methods
const toProperCase = (lower) => {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
};

export default function() {
    return (
        <Bar>
            <Logo>CryptoDash</Logo>
            <div/>
            <ControlButton active name="dashboard"/>
            <ControlButton name="settings"/>
        </Bar>
    )
};
