import React, { PureComponent } from 'react';
import { Input } from 'antd';
import cls from './styles.module.scss';

const { Search } = Input;

class MiMoInput extends PureComponent {
    state = {
        value: ''
    }
    onChange = (e) => {
        this.props.onChange(e.target.value);
    }
    render() {
        const { search, onChange, className, value, ...inputProps } = this.props;
        const props = {
            onChange: this.onChange,
            value,
            className: window.classnames(cls.inputContainer, className),
            ...inputProps
        }
        return (
            search ?
                <Search {...props} />
                :
                <Input {...props} />
        );
    }
}

MiMoInput.defaultProps = {
    placeholder: 'Search here...'
}

export default MiMoInput;