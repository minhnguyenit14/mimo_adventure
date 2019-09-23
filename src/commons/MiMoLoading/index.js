import React, { PureComponent } from 'react';
import { ClipLoader } from 'react-spinners';
import { textMainColor, fontSizeHeader } from 'app-config/app_vars.scss';
import { css } from '@emotion/core';
import { marginContainer } from 'app-config/app_vars.scss';

const override = css`
    display: block;
    margin: ${marginContainer} auto;
    margin-bottom: ${Number.parseInt(marginContainer)*2}px
`;

class MiMoLoading extends PureComponent {
    state = {}
    render() {
        const {
            sizeUnit,
            size,
            color,
            loading
        } = this.props;
        return (
            <ClipLoader
                css={override}
                sizeUnit={sizeUnit}
                size={size}
                color={color}
                loading={loading}
            />
        );
    }
}

MiMoLoading.defaultProps = {
    sizeUnit: "px",
    size: Number.parseInt(fontSizeHeader),
    color: textMainColor,
    loading: true
}

export default MiMoLoading;