import React, { createContext } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const CHANGE_COUNTER = 'CHANGE_COUNTER_GLOBAL';


function initiateStatus() {
    return {
        counterGlobal: 0,
        label: 'Global Provider'
    }
}

function handleChangeCounter(states) {
    return {
        ...states,
        counterGlobal: states.counterGlobal +1,
    }
}

function reducer(states = initiateStatus(), actions) {
    switch(actions.type) {
        case CHANGE_COUNTER:
            return handleChangeCounter(states);
    default:
        return states;
    }
}

export const GlobalContext = createContext();

export const changeCounterGlobal = () => ({
    type: CHANGE_COUNTER
})

export default function ({children}) {
    const store = createStore(reducer);
    return <Provider context={GlobalContext} store={store}>{children}</Provider>
}