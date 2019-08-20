import React, { Component } from 'react';
import { View, ActivityIndicator } from "react-native";
import { Container, Content, Text } from 'native-base';
import Nearby from "../../Discover/Nearby/Nearby";
import { connect } from "react-redux";
import { doGetCriteria } from '../../../redux/reducers/restaurantReducer';

class SearchResult extends Component {

  static navigationOptions = {
    title: "Find Restaurant"
  }

  state = {
    restaurants: [],
    onLoad: false
  }

  componentWillMount() {
    console.log('props loading willMount', this.props.stateLoading);
  }

  componentDidMount() {
    console.log('props loading didMount', this.props.stateLoading);
    this.findRestaurant();
  }

  findRestaurant = () => {
    this.setState({ onLoad: true }, () => {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('cccc', JSON.parse(this.props.navigation.getParam('data', null)));
        if (position) {
          this.props.dispatch(doGetCriteria({ lat: position.coords.latitude, lng: position.coords.longitude, body: this.props.navigation.state.params.params ? JSON.parse(this.props.navigation.state.params.params) : {} }, response => {
            console.log('res', response);
            this.setState({
              restaurants: response,
              onLoad: false
            });
          }, err => {
            console.log('err response', err);
            this.setState({ onLoad: false })
          }))
        }
      }, err => {
        console.log('err location', err);
        this.setState({ onLoad: false })
      });
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
          {
            (!this.state.onLoad && this.state.restaurants.length === 0) ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>There is no Restaurant within you Criteria.</Text>
              </View>
            ) : null
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantsList: state.restaurantReducer.restaurants,
    stateLoading: state.restaurantReducer.isLoading,
    criteria: state.restaurantReducer.criteria
  }
}

export default connect(mapStateToProps)(SearchResult);