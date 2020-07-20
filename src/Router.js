import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreeen';
import SeriesPage from './pages/SeriesPage';
import SerieDetailPage from './pages/SerieDetailPage';
import SeriesFormPage from './pages/SeriesFormPage';

const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Bem-vindo'
    }
  },
  'Main': {
    screen: SeriesPage,
  },
  'SerieDetail':{
    screen: SerieDetailPage,
    navigationOptions: ({navigation}) => {
      const{ serie } = navigation.state.params;
      return {
        title: serie.title,
      }
    }
  },
  'SeriesFormPage':{
    screen: SeriesFormPage,
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      if( params && params.serieToEdit ){
        return { title: params.serieToEdit.title }
      }else{
        return { title: 'Nova série!' }
      }
    }
  }
},{
  defaultNavigationOptions: {
    title: 'Series!',
    headerTintColor: '#5b3ab4',
    headerStyle: {
      backgroundColor: '#ebb927',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5'
    },
    headerTitleStyle: {
      color: '#5b3ab4',
      fontSize: 30
    }
  }
});

const AppContainer = createAppContainer( AppNavigator );

export default AppContainer;
