import React from 'react'
import '../style/Charts.css'
const Charts = () => {
  return (
   <>
    <div className='chartsbox'>
      <div className='Totalamount'>Totalamount</div>
      <div className='AmountDue'>AmountDue</div>
      <div className='AvgAmount'>Avg.Amount</div>
    </div>
    <div className='chartsdisp'>
        <div className='barGraph'>Bargraph</div>
        <div className='pieChart'>Piechart</div>
    </div>
    </>
  )
}

export default Charts