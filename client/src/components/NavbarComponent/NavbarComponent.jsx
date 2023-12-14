import React from 'react'
import { WrapperContent, WrapperTextValue, WrapprtLableText } from '../style'
import { Checkbox } from 'antd';

const NavbarComponent = () => {
  const onChange = () => { }
  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <WrapperTextValue>{option}</WrapperTextValue>
          )
        })
      case 'checkbox':
        return (
          <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
            {options.map((option) => {
              return (
                <Checkbox value={option.value}>{option.label}</Checkbox>
              )
            })}
          </Checkbox.Group>
        )
      default:
        return {}
    }
  }
  return (
    <div>
      <WrapprtLableText>NavbarComponent</WrapprtLableText>
      <WrapperContent>
        {renderContent('text', ['Tu lanh', 'TV', 'May giat'])}
      </WrapperContent>
      <WrapperContent>
        {renderContent('checkbox', [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ])}
      </WrapperContent>
    </div>
  )
}

export default NavbarComponent