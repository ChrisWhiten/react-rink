import React from 'react';
import './PrepayDiscount.css';

function renderCurrency(c) {
  let dollarAmount = c / 100;

  // if (c % 100 === 0) {
  //   return parseInt(dollarAmount, 10).toString();
  // }

  return dollarAmount.toFixed(2);
}

const PrepayDiscount = (props) => {
  const booking = props.booking;
  const originalCost = booking.bookingCost * booking.slotCount;
  const discountedCost = originalCost * .9;
  return (
    <div className='prepay-discount'>
      <div className='old-price'>
        ${ renderCurrency(originalCost) }
      </div>
      <div className='discounted-price'>
        ${ renderCurrency(discountedCost) }
      </div>
    </div>
  );
};

export default PrepayDiscount;
