import React from 'react'

import { BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import {MUSIC_LIST} from './config/musiclist'
import Pubsub from 'pubsub-js'


class Root extends React.Component{
  constructor (){
    super();
    this.state = {
      currentMusicItem : MUSIC_LIST[0], //默认的初始化歌曲
      musicList : MUSIC_LIST
    }
  }

  playMusic (musicItem){
    $("#player").jPlayer ('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');

    this.setState ({
      currentMusicItem: musicItem
    })
  }

  playNext(type = 'next'){
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length

    if (type === 'next'){
      newIndex = (index + 1) % musicListLength;
    }else { //prev song
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }

    this.playMusic (this.state.musicList[newIndex]);
  }

  findMusicIndex (musicItem){
    return this.state.musicList.indexOf(musicItem);
  }

  componentDidMount() {
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window"
		});
    this.playMusic(this.state.currentMusicItem);

    //监听当前音乐是否结束
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    })

    //订阅事件
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      });
    });
    //订阅事件
    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    });
    //订阅事件
    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev');
    });
    //订阅事件
    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext();
    });

	}

  componentWillUnmount (){
    //解绑事件
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended());
  }

  render (){
    let This = this;
    const Players = () => (
      <Player currentMusicItem = {This.state.currentMusicItem} />
    );
    const MusicLists = () => (
      <MusicList currentMusicItem = {This.state.currentMusicItem} musicList = {this.state.musicList} />
    );
    return (
      <Router>
        <section>
          <Header />

          <Route exact path = "/" component = {Players} />
          <Route path = "/list" component = {MusicLists} />
        </section>
      </Router>
    )
  }
}


export default Root;
