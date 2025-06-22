import {View, Text, TextInput, Switch} from 'react-native';
import React from 'react';
import {DefaultColors} from '../../Utils/Theme';

const LabTimingsComponent = ({
  day,
  timing,
  editable,
  setEditable,
  handleTimeChange,
  toggleDayOpenStatus,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{width: '30%'}}> {day}</Text>

        <View
          style={{
            flexDirection: 'row',
            // marginLeft: 'auto',
            alignItems: 'center',
          }}>
          <TextInput
            value={timing.opening_time}
            editable={editable}
            placeholder="HH:MM"
            style={{
              backgroundColor: DefaultColors.white,
              marginHorizontal: 5,
              marginVertical: 3,
              padding: 4,
              width: 60,
            }}
            onChangeText={text => handleTimeChange(day, 'opening_time', text)}
          />
          <Text> - </Text>
          <TextInput
            value={timing.closing_time}
            placeholder="HH:MM"
            editable={editable}
            style={{
              backgroundColor: DefaultColors.white,
              marginHorizontal: 5,
              marginVertical: 3,
              padding: 4,
              width: 60,
            }}
            onChangeText={text => handleTimeChange(day, 'closing_time', text)}
          />
          <Switch
            value={timing.is_open}
            // onValueChange={() => toggleDayOpenStatus(day)}
            disabled={!editable}
            onValueChange={() => toggleDayOpenStatus(day)}
          />
          <Text
            style={{
              width: '18%',

              textAlignVertical: 'center',
            }}>
            {timing.is_open ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>

      {/* <Text>{day}</Text>
      {timing.is_open ? (
        <>
          <Text>from {timing.opening_time}</Text>
          <Text> to {timing.closing_time} </Text>
        </>
      ) : (
        <Text> Closed </Text>
      )} */}
    </View>
  );
};

export default LabTimingsComponent;
