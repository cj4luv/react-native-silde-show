
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
      tabIndex:0
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

  render() {
    return (
      <View style={styles.container}>
        <ViewerTabs tabLength={this.state.tabLength}
          getTabIndex={this.getTabIndex.bind(this)}
          imageLength={this.setImageLength(this.state.tabIndex)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8fc',
  },
});

module.exports = App;
