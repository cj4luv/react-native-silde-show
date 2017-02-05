
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

import Button from '../buttons/Button';
import Swiper from '../swiper/Swiper';

class SlideViewer extends Component {

  constructor(props){
    super(props);
    this.state = {
      indexNum: 0,
      selcetTab: 0,
    }
  }

  //Tab button render
  _getTabButton() {
    var list = [];
    for(let i=0;i<this.props.tabIndex;i++){
      list.push(
        <View key={i} style={{flex:1, borderWidth: 1}}>
          <Button key={i}  onPress={()=>{this.setState({currentCtg: i});
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

  render() {
    return(
      <View style={styles.tabs}>
        {this._getTabButton()}
      </View>
    );
  }
}

class ViewerTabs extends Component {

  constructor(props){
    super(props);
    this.state = {
      indexNum: 0,
      tabIndex: 0
    }
  }

  //Tab button render
  _getTabButton() {
    var list = [];
    for(let i=0;i<this.props.tabLength;i++){
      list.push(
        <View key={i} style={{flex:1, borderWidth: 1}}>
          <Button key={i}  onPress={()=>{this.setState({tabIndex: i});
            this.props.getTabIndex(i);
          }}>
            <View style={{height:PIXEL_Y * 36, justifyContent:'center' , alignItems: 'center'}} key={i}>
              <Text  key={i} style={{
                color: '#4a4a4a',
                fontWeight: (this.state.tabIndex === i) ? 'bold': 'normal',
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

  //스와이프 렌더링 부분
  _renderTopSwiper() {
    return(
      <View>
        <Swiper
          loadMinimal={true}
          index={this.props.swiperIndex}
          showsButtons
          loop={false}
          showsPagination={false}
          height={PIXEL_X * 250}
        >
          {this.props.getSwipeImageList}
        </Swiper>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.props.getThumbnailImageList}
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
  }
});

export {
  SlideViewer,
  ViewerTabs
}
