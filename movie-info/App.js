import React from 'react';
import { Text, View } from 'react-native';
import SearchPage from './components/SearchPage';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <SearchPage />
      </View>
    );
  }
}
