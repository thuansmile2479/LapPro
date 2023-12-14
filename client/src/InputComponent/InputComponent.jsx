import React from 'react'
import { Input } from 'antd' 

const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
    return (
        <div>
            <Input
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={style}
                {...rests}
            />
        </div>
    )
}

export default InputComponent