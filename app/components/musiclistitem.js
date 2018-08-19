import React from 'react'
import  './musiclistitem.less'
import Pubsub from 'pubsub-js'


class MusicListItem extends React.Component {

  constructor(){
    super();
  }

  playMusic (musicItem){
    Pubsub.publish('PLAY_MUSIC', musicItem);
  }

  deleteMusic (musicItem, e){
    e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC', musicItem);
  }

  render (){
    let musicItem = this.props.musicItem;

    return (
    <li onClick = {(e) => this.playMusic(musicItem)} className = {`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
        <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
        <p onClick = {(e) => this.deleteMusic(musicItem, e)} className = "-col-auto delete"></p>
      </li>
    );
  }
}


export default MusicListItem;
