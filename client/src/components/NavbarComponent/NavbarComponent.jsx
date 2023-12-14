import React from 'react'
import { LapProContent, LapProTextValue, LapProLableText } from '../style'
import { Checkbox } from 'antd';

const NavbarComponent = () => {
  const onChange = () => { }
  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option) => {
          return (
            <LapProTextValue>{option}</LapProTextValue>
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
      <LapProLableText>NavbarComponent</LapProLableText>
      <LapProContent>
        {renderContent('text', ['Tu lanh', 'TV', 'May giat'])}
      </LapProContent>
      <LapProContent>
        {renderContent('checkbox', [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' }
        ])}
      </LapProContent>
    </div>
  )
}

export default NavbarComponent