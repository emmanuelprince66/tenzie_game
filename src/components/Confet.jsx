import React from 'react'
import Confetti from 'react-confetti'

const Confet = (props) => {
  return (
    <div>
       <Confetti
      width={props.width}
      height={props.height}
    />
    </div>
  )
}

export default Confet