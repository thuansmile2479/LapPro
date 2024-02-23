import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({ size, styleButton, styletextbutton, textbutton, disabled, ...rest }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#686664' : styleButton.background
            }}
            size={size}
            {...rest}
        >
            <span style={styletextbutton}>{textbutton}</span>
        </Button>
    )
}

export default ButtonComponent