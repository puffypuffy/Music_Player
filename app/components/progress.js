import React from 'react'
import './progress.less'

class Progress extends React.Component{
  constructor (){
    super();
    this.changeProgress = this.changeProgress.bind(this);
  }
  
  changeProgress (event){
    let progressBar = this.refs.progressBar; //获取真实的Dom节点，利用refs来获取
    let progress = (event.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;

    this.props.onProgressChange && this.props.onProgressChange(progress);
  }


  render (){
    return (
      <div className = "components-progress" ref = "progressBar" onClick = {this.changeProgress}>
        <div className = "progress" style = {{width: `${this.props.progress}%`, background: this.props.barColor }}>
        </div>
      </div>
    );
  }
}

export default Progress;
