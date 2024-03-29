import React from 'react';
// import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff'
  } = props;

  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{
          backgroundColor: backgroundColorInput,
          borderRadius: 0,
          width: '500px'
        }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && 'none',
          borderRadius: 0, // Loại bỏ border góc cho Button
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}
        textbutton={textbutton}
        styletextbutton={{ color: colorButton }}
      />

    </div>
  );
};

export default ButtonInputSearch;
