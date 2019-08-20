import React, { Component } from 'react';
import { View, Alert } from "react-native";
import { Container, Content, Picker, Form, Button, Text, Item, Label, Input } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { connect } from "react-redux";
import Axios from "axios";


class CreateReservation extends Component {

  static navigationOptions = {
    title: 'Reservation'
  }

  state = {
    bookDate: null,
    session: null,
    timeSet: false,
    isDateTimePickerVisible: false,
    isTimePickerVisible: false,
    onReservation: false,
    numberGuest: 1
  }

  showDateTimePicker = picker => {
    if (picker === 'date') {
      this.setState({ isDateTimePickerVisible: true });
    } else {
      this.setState({ isTimePickerVisible: true });
    }
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ bookDate: new Date(date) });
    this.hideDateTimePicker();
  }

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  handleTimePicked = time => {
    console.log("A time has been picked: ", time);
    let timePicked = new Date(time);
    let bookDate = new Date(this.state.bookDate);
    bookDate.setHours(timePicked.getHours());
    bookDate.setMinutes(timePicked.getMinutes());
    this.setState({ timeSet: true, bookDate: bookDate });
    this.hideTimePicker();
  }

  onSessionChange = value => {
    console.log('value', value);
    this.setState({
      session: value
    }, () => {
      console.log('state', this.state);
    });
  }

  onReserve = () => {
    Alert.alert(
      'Reservasi',
      'Apakah kamu yakin ingin Mereservasi Restaurant ini ?',
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
            let body = {
              bookDate: this.state.bookDate,
              session: this.state.session,
              timeSlot: this.state.bookDate,
              guest: {
                firstName: this.props.guest.name,
                lastName: '',
                user: this.props.guest.user._id,
                guest: this.props.guest._id
              },
              status: "new",
              numberGuest: this.state.numberGuest,
              restaurant: this.props.navigation.getParam('id', '-1')
              // restaurant: this.state.restaurant._id
            };
            console.log('body', body);
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
                      onPress: () => this.props.navigation.goBack()
                    }
                  ]
                )
              })
              .catch(err => {
                this.setState({
                  onReservation: false
                });
                console.log('err', err.response);
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

  handleChange = e => {
    this.setState({
      numberGuest: Number(e)
    });
  }

  render() {
    return (
      <Container style={{ flex: 1, marginTop: 2 }}>
        <Content>
          <View style={{ flex: 1, marginVertical: 15 }}>
            <Button color="secondary" title="Show DatePicker" rounded block onPress={() => this.showDateTimePicker('date')} style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Pilih Tanggal Booking</Text>
            </Button>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <Text>Tanggal Booking: {this.state.bookDate ? moment(this.state.bookDate).format("DD-MM-YYYY") : '-'}</Text>
            </View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              is24Hour={true}
              minimumDate={new Date()}
            />
          </View>
          <View style={{ flex: 1, marginVertical: 15 }}>
            <Button color="secondary" title="Show DatePicker" rounded block onPress={() => this.showDateTimePicker('time')} style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Pilih Waktu Booking</Text>
            </Button>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <Text>Waktu Booking: {this.state.timeSet ? moment(this.state.bookDate).format("HH:mm") : '-'}</Text>
            </View>
            <DateTimePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this.handleTimePicked}
              onCancel={this.hideTimePicker}
              is24Hour={true}
              mode={"time"}
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 30 }}>
            <Picker
              note
              mode="dropdown"
              style={{ flex: 1 }}
              selectedValue={this.state.session}
              onValueChange={this.onSessionChange}
              style={{ color: 'black' }}
            >
              <Picker.Item value={null} label="Pilih Sesi Reservasi" />
              <Picker.Item value="dinner" label="Dinner" />
              <Picker.Item value="lunch" label="Lunch" />
              <Picker.Item value="breakfast" label="Breakfast" />
            </Picker>
          </View>
          <View style={{ flex: 1, marginHorizontal: 35 }}>
            <Item inlineLabel>
              <Label>Number of Guest</Label>
              <Input keyboardType="numeric" onChangeText={this.handleChange} />
            </Item>
          </View>
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
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ GuestReducer }) => {
  return {
    guest: GuestReducer.guest
  };
}

export default connect(mapStateToProps)(CreateReservation);