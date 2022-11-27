import {useState} from 'react';
import Cell from './components/Cell';
import GameOver from './components/GameOver';

const clone = (obj)=>{
  return JSON.parse(JSON.stringify(obj))
}

const Chessboard = ()=>{
  //棋盘
  const [maps,setMaps] = useState([
    ['','',''],
    ['','',''],
    ['','','']
  ])
  // status:游戏是否结束
  const [finish,SetFinish] = useState(false)
  // status：步数
  const [n,setN] = useState(0)
  // fn：判断是否获胜
  const isSuccess = (maps,winner)=>{
    // 判断横向是否一直
    for( let i = 0; i<maps.length;i++){
      if(maps[i][0] === maps[i][1] && maps[i][1] === maps[i][2] && maps[i][0] !== ''){
        setWinner(winner)
        SetFinish(true)
        break
      }
    }
    //判断纵向是否一致
    for( let i = 0; i<maps.length;i++){
      if(maps[0][i] === maps[1][i] && maps[1][i] === maps[2][i] && maps[0][i] !== ''){
        setWinner(winner)
        SetFinish(true)
        break
      }
    }
    //判断斜向是否一致
    if(maps[0][0] === maps[1][1] && maps[1][1] === maps[2][2] && maps[0][0] !== ''){
      setWinner(winner)
      SetFinish(true)
    }else 
    if(maps[0][2] === maps[1][1] && maps[1][1] === maps[2][0] && maps[2][0] !== ''){
      setWinner(winner)
      SetFinish(true)
    }
  }
  // 记录获胜的最后一步的位置(获胜者 x ? o)
  const [winner,setWinner] = useState('')
  //点击时间
  const update = (row,col)=>{
    //如果游戏结束 点击时间关闭
    if(finish) return
    if(maps[row][col]) return
    // 每次点击 切换符号
    setN(n+1)
    const newMaps = clone(maps)
    newMaps[row][col] = n % 2 === 0 ? 'x':'o'
    setMaps(newMaps)

    //每次点击完成后 判断棋盘是否有成功的情况
    /**
     *  Tip: 如果只是单纯的运行isSuccess的话会出现异步的情况
     *  React的setStatus的函数是异步函数 所以setMaps会最后执行
     *  所以单独调用isSuccess的话 里面所获取的maps是之前没有修改状态的数据
     *   
     *  解决方法：newMaps在SetMaps之前已经改变 只需要将改变的newMaps传给isSuccess
     *  让isSuccess函数判断最新的数据即可
     * 
     *  如果你细心的话 你就会发现 当你获胜的时候 alert函数已经调用 此刻页面的决胜的那一步却并没有出现 这就是异步函数
     */
    isSuccess(newMaps,newMaps[row][col])
  }

  const reset = ()=>{
    // 重置游戏
    // 清空数组
    setMaps([
      ['','',''],
      ['','',''],
      ['','','']
    ])
    SetFinish(false)
    setN(0)
  }
  /**
   * 
   * 这里的map遍历需要根据该函数内部的状态渲染
   * 如果使用外部的变量来渲染的话 函数组件内部是无法侦听到数据的变化的
   * 
   */
  return <div>
      <h2>当前步骤:{n}</h2>
      {maps.map((map,row)=> <div className='cells' key={row}>
          {
          map.map((item,col)=>
            <Cell text={item} update={()=>{update(row,col)}} key={col}></Cell>
          )
          }
        </div>
      )}
      {finish && <GameOver winner={winner} resetGame={reset} />}
    </div>
}

export default Chessboard