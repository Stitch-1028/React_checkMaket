// 格子组件
const Cell = (props)=>{
  /**
   * 在这个地方写点击时间 修改porps的数据会出现问题 因为传递过来的数据是只读的
   * 所以可以在改变数据的地方写好函数 将函数传递过来
   */
  return <div className='cell' onClick={()=>{props.update()}}>{props.text}</div>
}

export default Cell