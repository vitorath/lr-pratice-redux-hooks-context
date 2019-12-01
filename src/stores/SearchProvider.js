import React, { createContext } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const CHANGE_COUNTER = 'CHANGE_COUNTER';

function initiateStatus() {
    return {
        counter: 0,
        label: 'Search Provider'
    }
}

function handleChangeCounter(states) {
    return {
        ...states,
        counter: states.counter +1,
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

export const SearchContext = createContext();

export const changeCounter = () => ({
    type: CHANGE_COUNTER
})

export default function ({children}) {
    const store = createStore(reducer);
    return <Provider context={SearchContext} store={store}>{children}</Provider>
}