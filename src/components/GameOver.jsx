
const GameOver = (props)=>{
  return (
      <div className='gameOver'>
        <p>胜方:{props.winner}</p>
         <button onClick={()=>{props.resetGame()}}>重新开始</button> 
      </div>
  )
}

export default GameOver