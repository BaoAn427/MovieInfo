import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  NavigatorIOS
} from 'react-native';

import _Styles from './_Styles';
import MoviesPage from './MoviesPage';


class SearchPage extends React.Component {
  render () {
    return (
        <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
            component: SearchBox,
            title: 'Search'
          }}/>
    )
  }
}


class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    _getListGenres();
    this._searchMovie = this._searchMovie.bind(this);
    this._updateGenre = this._updateGenre.bind(this);
    this.state = {
      _Genre: ''
    };
  }
  _updateGenre(content) {
    this.setState({
      _Genre: content
    });
  }
  _searchMovie() {
    console.log('Searching...');
    let genre = this.state._Genre;
    if (genre === '') {
      alert('Please type genre');
    } else {
      let id = _findIdOfGenres(this.state._Genre);
      _findMoviesByGenre(id);
      this.props.navigator.push({
          title: 'From TouchableHighlight',
          component: MoviesPage
      });
    }
  }
  render() {
    return (
      <View style={_Styles.container}>
        <Text style={_Styles.description}>
          Search for movies to watch!
        </Text>
        <Text style={_Styles.description}>
          Search by genre.
        </Text>
        <View style={_Styles.flowRight}>
          <TextInput
            style={_Styles.searchInput}
            placeholder='Type genre here'
            onChangeText={(content) => this._updateGenre(content)}/>
          <Button
            onPress={this._searchMovie}
            color='#48BBEC'
            title='Go'/>
        </View>
      </View>
    );
  }
};


var TMDB = 'https://api.themoviedb.org/3/';
var TMDB_API_KEY = 'api_key=cf2720fa7cc6644d191925d15ccf0180';
var QUERIES = {
  list_genres: TMDB + 'genre/movie/list?' + TMDB_API_KEY,
  movies_with_genre: TMDB + 'discover/movie?' + TMDB_API_KEY + '&with_genres='
}
var LIST_GENRE = [];


_getListGenres = () => {
  // console.log(QUERIES.list_genres);
  fetch(QUERIES.list_genres)
    .then((response) => response.json())
    .then((json) => {
      LIST_GENRE = json.genres;
      // console.log(LIST_GENRE);
    })
    .catch(error => {
      console.log('Error', error);
    });
};

_capitalize = (str) => {
  firstChar = str.substring(0, 1);
  firstChar.toUpperCase();
  theRest = str.substring(1);
  return (firstChar + theRest);
}

_findIdOfGenres = (genreInput) => {
  genre = _capitalize(genreInput);
  // console.log('Genre =', genre);
  let obj = LIST_GENRE.filter((genre_obj) => {
    // console.log(genre_obj.name);
    if (genre_obj.name == genre) {
      return genre_obj;
    }
  });
  // console.log("OBJ =", obj[0]);
  return obj[0].id;
};

_findMoviesByGenre = (genreId) => {
  let query = QUERIES.movies_with_genre + genreId;
  console.log(query);
  fetch(query)
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
    })
    .catch((error) => {
      console.log('ERROR\n', error);
    });
};






export default SearchPage;
