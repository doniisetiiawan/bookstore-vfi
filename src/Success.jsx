import React from 'react';

export default function Success(props) {
  let numberOfDays = '1 to 2 ';

  if (props.data.deliveryOption === 'Normal') {
    numberOfDays = '3 to 4 ';
  }

  return (
    <div>
      <h2>
        Thank you for shopping with us
        {' '}
        {props.data.fullName}
        .
      </h2>
      <h4>
        You will soon get
        {' '}
        {props.data.selectedBooks.join(', ')}
        at
        {' '}
        {props.data.shippingAddress}
        {' '}
        in
        approrximately
        {' '}
        {numberOfDays}
        days.
      </h4>
    </div>
  );
}
