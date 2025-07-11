import React from 'react';
import numeral from 'numeral';

const CurrencyFormat = ({ value }) => {
  const formatted = numeral(value).format('$0,0.00');
  return <div>{formatted}</div>;
};

export default CurrencyFormat;
