import React from 'react';
import { connect } from 'react-redux';

import { changeCounter, FormContext } from '../stores/FormProvider'
import { changeCounterGlobal, GlobalContext } from '../stores/GlobalProvider'

function Form({counter, counterGlobal,  onChange, onChangeGlobal}) {
    return (
        <>
            <h1>Form</h1>
            <div style={{display: 'flex'}}>
                <button onClick={onChange}>Click Form</button>
                <h5>{counter}</h5>
            </div>
            <div style={{display: 'flex'}}>
                <button onClick={onChangeGlobal}>Click Form</button>
                <h5>{counterGlobal}</h5>
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


const mapStatesToPropsGlobal = states => ({
    counterGlobal: states.counterGlobal, 
});

const mapDispatchToPropsGlobal = dispatch => ({
    onChangeGlobal: () => dispatch(changeCounterGlobal()),
})

export default connect(mapStatesToProps, mapDispatchToProps, null, {context: FormContext})(
    connect(mapStatesToPropsGlobal, mapDispatchToPropsGlobal, null, {context: GlobalContext})(Form)
);