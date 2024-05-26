import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (base, state) => {
    return {
      ...base,
      width: '125px',
      height: '38px',
      display: 'flex',
      justifyContent: 'center',
      background: state.isDisabled ? '#f7f7f7' : 'white',
      borderRadius: '36px',
      boxShadow: 'none',
      border: state.isDisabled
        ? '1px solid #E3E3E3'
        : state.hasValue
        ? '1px solid #00b9ae'
        : '1px solid #E3E3E3',
      '&:hover': {
        border: '1px solid #d1d1d1',
      },
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    };
  },
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'gray' : state.hasValue ? '#00b9ae' : '#646464',
  }),
  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
  valueContainer: (provided, state) => {
    return {
      ...provided,
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: '8px',
      fontWeight: '700',
      fontSize: '16px',
      letterSpacing: '0.03em',
      color: state.hasValue ? '#00b9ae' : '#646464',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    };
  },
  placeholder: (provided, state) => {
    return {
      ...provided,
      color: '#646464',
      fontWeight: 500,
    };
  },
  menu: (provided, state) => ({
    ...provided,
    minWidth: '125px',
    background: '#FFFFFF',
    border: '1.5px solid #E3E3E3',
    borderRadius: '25px',
    boxShadow: null,
    padding: '10px',
    zIndex: 9999,
  }),
  option: (provided, state) => {
    return {
      ...provided,
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '26px',
      letterSpacing: '-0.03em',
      color: state.isSelected ? '#00b9ae' : '#646464',
      backgroundColor: 'null',
      cursor: 'pointer',
    };
  },
  menuList: (base) => ({
    ...base,
    overflow: 'scroll',
  }),
};

const CommonSelect = ({ value, options, placeholder, onChange, isDisabled = false }) => {
  return (
    <div>
      <Select
        placeholder={placeholder}
        value={value}
        styles={customStyles}
        isSearchable={false}
        options={options}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default CommonSelect;
