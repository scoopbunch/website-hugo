import React from "react";
import {isEmpty as _} from "lodash";
import {connect} from "react-redux";
import * as PropTypes from 'prop-types';

class FormError extends React.Component {
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        const {errors, form: {setFields, getFieldValue}} = nextProps;
        if (!_(errors)) {
            Object.keys(errors).forEach(k => {
                setFields({
                    [k]: {
                        value: getFieldValue(k),
                        errors: [new Error(errors[k])]
                    }
                });
            });
            nextProps.onClearError();
        }
        return null;
    }


    render() {
        return null;
    }
}

FormError.propTypes = {
    form: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors.errors
});

const mapDispatchToProps = dispatch => ({
    onClearError: () => dispatch({type: 'ERROR_CLEAR'})
});

export default connect(mapStateToProps, mapDispatchToProps)(FormError);