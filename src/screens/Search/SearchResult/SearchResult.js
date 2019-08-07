import React, { Component } from 'react';
import { View, ActivityIndicator } from "react-native";
import { Container, Content, Text } from 'native-base';
import Nearby from "../../Discover/Nearby/Nearby";
import { connect } from "react-redux";
import { doGetNearby } from '../../../redux/reducers/restaurantReducer';

class SearchResult extends Component {

  static navigationOptions = {
    title: "Find Restaurant"
  }

  state = {
    restaurants: []
  }

  componentWillMount() {
    console.log('props loading willMount', this.props.stateLoading);
  }

  componentDidMount() {
    console.log('props loading didMount', this.props.stateLoading);
    this.findRestaurant();
  }

  findRestaurant = () => {
    navigator.geolocation.getCurrentPosition(position => {
      if (position) {
        this.props.dispatch(doGetNearby({ page: this.state.page, limit: 10, lat: position.coords.latitude, lng: position.coords.longitude, search: '' }, response => {
          console.log('response nearby', response);
          this.setState({
            restaurants: response.restaurant
          });
        }, err => {
          console.log('err response', err);
        }))
      }
    }, err => {
      console.log('err location', err);
    });
  }

  componentDidUpdate() {
    console.log('props loading didUpdate', this.props.stateLoading);
  }

  componentWillReceiveProps(prevProps, nextProps) {
    console.log('props loading willReceiveProps', this.props.stateLoading, prevProps, nextProps);
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 20, marginBottom: 40 }}>
            {this.props.stateLoading ? (<View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#000" />
            </View>) : <Nearby restaurants={this.state.restaurants} navigate={(path, params) => this.props.navigation.navigate(path, params)} />}
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ restaurantReducer }) => {
  console.log('mapStateToProps', restaurantReducer);
  return {
    restaurantsList: restaurantReducer.restaurants,
    stateLoading: restaurantReducer.isLoading
  }
}

export default connect(mapStateToProps)(SearchResult);