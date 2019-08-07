import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, AsyncStorage, Alert } from "react-native";
import { connect } from "react-redux";
import { doGetRestaurant } from '../../redux/reducers/restaurantReducer';
import { Container, Content, List, ListItem, Button } from 'native-base';
import moment from "moment";
import { doGetGuest } from '../../redux/reducers/guestReducer';
import { showMessage } from 'react-native-flash-message';
import Axios from 'axios';

class Restaurant extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Restaurant Name'),
    }
  }

  state = {
    restaurant: {},
    onReservation: false,
    openHours: {
      open: new Date(),
      close: new Date()
    },
    day: [
      {
        name: 'Senin',
        value: 1
      },
      {
        name: 'Selasa',
        value: 2
      },
      {
        name: 'Rabu',
        value: 3
      },
      {
        name: 'Kamis',
        value: 4
      },
      {
        name: 'Jumat',
        value: 5
      },
      {
        name: 'Sabtu',
        value: 6
      },
      {
        name: 'Minggu',
        value: 0
      }
    ]
  }

  componentDidMount() {
    this.getRestaurant();
    AsyncStorage.getItem('userData', (err, result) => {
      let user = result ? JSON.parse(result) : {};
      this.props.dispatch(doGetGuest(user._id, err => {
        console.log('error response guest', err.response);
        if (err && err.response && err.response.data) {
          showMessage({
            message: "Error",
            description: err.response.data.message || 'Terjadi sebuah kesalahan saat melakukan pengambilan data',
            type: "danger",
            icon: "danger",
            duration: 3000
          });
        }
      }));
    });
  }

  getRestaurant() {
    const { navigation } = this.props;
    this.props.dispatch(doGetRestaurant(navigation.getParam('id', '-1'), response => {
      console.log('response', response);
      this.setState({
        restaurant: response
      });
    }, err => {
      console.log('err', err);
    }))
  }

  filterOpenHours = hours => {
    if (hours && hours.length > 0) {
      let days = [...this.state.day];
      let thisDay = days.findIndex(day => day.value === new Date().getDay());
      let daysOpen = hours.map(hour => hour.day);
      if (daysOpen.indexOf(days[thisDay].name) > -1) {
        let findDay = hours.findIndex(hour => hour.day.toLowerCase() === days[thisDay].name);
        if (findDay > -1) {
          this.setState({
            openHours: {
              open: hours[findDay].startHours,
              close: hours[findDay].endHours
            }
          })
        }
      }
      return daysOpen.indexOf(days[thisDay].name) > -1 ? 'open' : 'closed';
    } else {
      return "-";
    }
  }

  onReserve = () => {
    Alert.alert(
      'Reservasi',
      'Apakah kamu yakin ingin Mereservasi Restaurant ini ? (Restaurant ini hanya tersedia untuk reservasi pada Jam 7 Malam)',
      [
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Pesan Sekarang!', onPress: () => {
            this.setState({
              onReservation: true
            });
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(19, 0, 0, 0);
            let body = {
              bookDate: tomorrow,
              session: "dinner",
              timeSlot: tomorrow,
              guest: {
                firstName: this.props.guest.name,
                lastName: '',
                user: this.props.guest.user._id,
                guest: this.props.guest._id
              },
              status: "new"
            };

            Axios.post("http://eatbana.herokuapp.com/api/reservations", body)
              .then(res => {
                console.log('res', res);
                this.setState({
                  onReservation: false
                });
                Alert.alert(
                  'Berhasil',
                  'Kamu berhasil melakukan reservasi',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('ok')
                    }
                  ]
                )
              })
              .catch(err => {
                this.setState({
                  onReservation: false
                });
                console.log('err', err);
                Alert.alert(
                  'Gagal',
                  'Kamu gagal melakukan reservasi',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('ok')
                    }
                  ]
                )
              });
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    console.log('this loading', this.props.isLoading);
    return (
      <Container style={{ flex: 1, marginTop: 2 }}>
        <Content>
          {this.props.onLoading ? <ActivityIndicator size="large" color="#000" /> : (
            <React.Fragment>
              <View style={{ minHeight: 200, height: 200, width: '100%' }}>
                <Image style={{ alignSelf: 'center', height: 200, width: '100%' }} resizeMode="cover" source={require("../../../assets/no-image.png")} />
              </View>
              <View style={{ flex: 1, marginHorizontal: 15, marginTop: 15, marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }}>
                <Text style={{ fontSize: 24 }}>{this.state.restaurant.name}</Text>
                <Text>{this.state.restaurant.cuisines ? this.state.restaurant.cuisines.join(",") : null} Food</Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Averages Cost</Text>
                <Text>Starting from {this.state.restaurant.lowCost ? this.state.restaurant.lowCost : 0} - {this.state.restaurant.highestCost ? this.state.restaurant.highestCost : 0}</Text>
              </View>
              <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Menu</Text>
                {
                  (this.state.restaurant.menuImage && this.state.restaurant.menuImage[0]) ? (
                    <Image source={{ uri: this.state.restaurant.menuImage[0] }} style={{ width: '100%', height: 400, marginVertical: 20 }} />
                  ) : (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>There is no Menu Image uploaded by owner.</Text>
                      </View>
                    )
                }
              </View>
              <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 }}>
                <Text>{this.state.restaurant.address}</Text>
                {this.state.restaurant ? (this.filterOpenHours(this.state.restaurant.openingHours) === 'open' ? (
                  <Text>Open: {this.state.restaurant.openingHours ? moment(this.state.openHours.open).format("HH:mm") : null} - {this.state.restaurant.openingHours ? moment(this.state.openHours.close).format("HH:mm") : null}</Text>
                ) : (
                    <Text style={{ color: 'red' }}>Sorry, the restaurant is closed today</Text>
                  )) : "-"}
              </View>
              <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 10, paddingBottom: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Facilities</Text>
                <List>
                  {
                    this.state.restaurant.facilities ? this.state.restaurant.facilities.filter(fac => fac.selected === true).map(fac => (
                      <ListItem key={fac._id}><Text>{fac.name}</Text></ListItem>
                    )) : null
                  }
                </List>
              </View>
              {
                this.state.restaurant.bookAvailable ? (
                  <View style={{ flex: 1, marginHorizontal: 15, marginVertical: 10 }}>
                    <Button block rounded danger onPress={this.onReserve} disabled={this.state.onReservation}>
                      {
                        this.state.onReservation ? (
                          <Text style={{ color: 'white' }}>Sedang Melakukan Reservasi ...</Text>
                        ) : (
                            <Text style={{ color: 'white' }}>Reservasi</Text>
                          )
                      }
                    </Button>
                  </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text>This Restaurant not Available for Book Table.</Text>
                    </View>
                  )
              }
            </React.Fragment>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ restaurantReducer, GuestReducer }) => {
  return {
    restaurantProp: restaurantReducer.restaurant,
    onLoading: restaurantReducer.isLoading,
    guest: GuestReducer.guest
  }
}

export default connect(mapStateToProps)(Restaurant);