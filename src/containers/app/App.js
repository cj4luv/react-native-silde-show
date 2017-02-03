
import React, { Component } from 'react';
import {
  StyleSheet,
  AlertIOS,
  NavigatorIOS,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PIXEL_X = WINDOW_WIDTH/375;
const PIXEL_Y = WINDOW_HEIGHT/667;

import Button from '../../components/buttons/Button';
import Swiper from '../../components/swiper/Swiper';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      indexNum: 0,
      imageIndex: 10,
    }
  }

  //tab 버튼의 index 값을 받아온다.
  _getCurrnetCtg(index) {
    this.setState({currentCtg: index})
    switch (index) {
      case 0:
        this.setState({imageIndex:10});
        break;
      case 1:
        this.setState({imageIndex:3});
        break;
      case 2:
        this.setState({imageIndex:5});
        break;
      default:
        this.setState({imageIndex:10})
    }
  }

  //Tab button render
  _getTabButton(){
    var list = [];
    for(let i=0;i<3;i++){
      list.push(
        <View key={i} style={{flex:1, borderWidth: 1}}>
          <Button key={i}  onPress={()=>{this.setState({currentCtg: i});
            this._getCurrnetCtg(i);
          }}>
            <View style={{height:PIXEL_Y * 36, justifyContent:'center' , alignItems: 'center'}} key={i}>
              <Text  key={i} style={{
                color: '#4a4a4a',
                fontWeight: (this.state.currentCtg === i) ? 'bold': 'normal',
                fontSize: PIXEL_X * 15
              }}>{i}</Text>
            </View>
          </Button>
        </View>
      );
    }
    return list.valueOf();
  }

  //랜더 탭버튼
  _renderTabs() {
    return(
      <View style={styles.tabs}>
        {this._getTabButton()}
      </View>
    );
  }

  //썸네일 리스트 생성
  _getThumbnailImageList() {
    var list = [];
    for(let i=0 ; i<this.state.imageIndex; i++) {
      let j = i + 1;
      list.push(
        <View key={i}>
          <Button onPress={()=>{this.setState({indexNum: i, isThumb: true})}}>
            <Image style={styles.thumnail} source={{url: '/Users/laon/WorkSpace/react_native_silde_show/images/'+j+'.png'}}>
              {this._renderLayer(i)}
            </Image>
          </Button>
        </View>
      );
    }
    return list.valueOf();
  }

  //선택된 썸네일 이미지에 투명 레이어 추가
  _renderLayer(index) {
    if(this.state.isThumb === true && this.state.indexNum === index) {
      return(
        <View style={{
          height: PIXEL_Y * 70,
          width: PIXEL_X * 70,
          backgroundColor:'#fff',
          opacity: 0.6}} />
      );
    }
  }

  //Swipe 이미지 리스트 생성
  _getSwipeImageList() {
    var list = [];
    for(let i=0 ; i<this.state.imageIndex; i++){
      let j = i + 1;
      list.push(<Image key={i} style={styles.slide}
      source={ {url : '/Users/laon/WorkSpace/react_native_silde_show/images/'+j+'.png'}}/>);
    }
    return list.valueOf();
  }

  //스와이프 렌더링 부분
  _renderTopSwiper() {
    return(
      <View>
        <Swiper
          loadMinimal={true}
          index={this.state.indexNum}
          showsButtons
          loop={false}
          showsPagination={false}
          height={PIXEL_X * 250}
        >
          {this._getSwipeImageList()}
        </Swiper>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this._getThumbnailImageList()}
        </ScrollView>

      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        {this._renderTabs()}
        {this._renderTopSwiper()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8fc',
  },
  tabs:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:PIXEL_Y * 36,
    backgroundColor: '#f8f8fc',
    marginTop: PIXEL_Y * 20,
  },
  slide: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom:PIXEL_X * 2,
    width: WINDOW_WIDTH,
    flex: 1
  },
  thumnail: {
    height: PIXEL_Y * 70,
    width: PIXEL_X * 70,
    marginRight:PIXEL_X * 2,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
});

module.exports = App;
