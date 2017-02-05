
import React, { Component } from 'react';
import {
  StyleSheet,
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
import {
  SlideViewer,
  ViewerTabs
} from '../../components/slideViewer/SlideViewer';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      tabLength: 3,
      tabIndex:0,
      swiperIndex: 0
    }
  }

  getTabIndex(tabIndex) {
    this.setState({
      tabIndex: tabIndex,
    })
  }

  setImageLength(tabIndex) {
    switch (tabIndex) {
      case 0:
        return 10;
        break;
      case 1:
        return 4;
        break;
      case 2:
        return 8;
        break;
      default:
        return 1;
    }
  }

  //Swipe 이미지 리스트 생성
  _getSwipeImageList(imageLength) {
    var list = [];
    for(let i=0 ; i<imageLength; i++){
      let j = i + 1;
      list.push(
        <Image key={i} style={styles.slide}
          source={ {url : '/Users/laon/WorkSpace/react_native_silde_show/images/'+j+'.png'}}/>
      );
    }
    console.log(list.valueOf());
    return list.valueOf();
  }

  //썸네일 리스트 생성
  _getThumbnailImageList(imageLength) {
    var list = [];
    for(let i=0 ; i<imageLength; i++) {
      let j = i + 1;
      list.push(
        <View key={i}>
          <Button onPress={()=>{this.setState({swiperIndex: i, isThumb: true})}}>
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
    if(this.state.isThumb === true && this.state.swiperIndex === index) {
      return(
        <View style={{
          height: PIXEL_Y * 70,
          width: PIXEL_X * 70,
          backgroundColor:'#fff',
          opacity: 0.6}} />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ViewerTabs swiperIndex={this.state.swiperIndex}
          tabLength={this.state.tabLength}
          getTabIndex={this.getTabIndex.bind(this)}
          getSwipeImageList={this._getSwipeImageList(this.setImageLength(this.state.tabIndex))}
          getThumbnailImageList={this._getThumbnailImageList(this.setImageLength(this.state.tabIndex))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8fc',
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
