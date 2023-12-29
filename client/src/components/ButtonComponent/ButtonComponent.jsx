import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rest }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#686664' : styleButton.background
            }}
            size={size}
            {...rest}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}

export default ButtonComponent