import React from 'react'

const Die = (props) => {


const styles = {
   backgroundColor: props.held ? '#59E391' : 'white'
}
  
  return (
    <div className='die-face' style={styles} >
        <h2 onClick={() => props.holdDice(props.id)} className='die-num'>{props.value}</h2>
    </div>
  )
}

export default Die