import React from 'react';
import { connect } from 'react-redux';

import { changeCounter, SearchContext } from '../stores/SearchProvider'
import { changeCounterGlobal, GlobalContext } from '../stores/GlobalProvider'

function Search({counter, counterGlobal,  onChange, onChangeGlobal}) {
    return (
        <>
            <h1>Search</h1>
            <div style={{display: 'flex'}}>
                <button onClick={onChange}>Click Search</button>
                <h5>{counter}</h5>
            </div>
            <div style={{display: 'flex'}}>
                <button onClick={onChangeGlobal}>Click Search</button>
                <h5>Counter: {counterGlobal}</h5>
            </div>
        </>
    );
}

const mapStatesToProps = states => ({
    counter: states.counter,
    counterGlobal: states.counterGlobal, 
});

const mapDispatchToProps = dispatch => ({
    onChange: () => dispatch(changeCounter()),
    onChangeGlobal: () => dispatch(changeCounterGlobal()),
})

export default connect(mapStatesToProps, mapDispatchToProps, null, {context: SearchContext})(Search);