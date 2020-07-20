import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

import FormRow from '../components/FormRow';
import { tryLogin } from '../actions';

class LoginScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyAPCsvb8EdQMC2IWOHfr0sElhr4M03uIZM",
            authDomain: "series-d4b13.firebaseapp.com",
            databaseURL: "https://series-d4b13.firebaseio.com",
            projectId: "series-d4b13",
            storageBucket: "series-d4b13.appspot.com",
            messagingSenderId: "921623409732",
            appId: "1:921623409732:web:54f24362297a42ba243811",
            measurementId: "G-G5CSRSL7FL"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    }

    onChangeHandler(field, value){
        this.setState({
            [field]: value
        });
    }

    tryLogin(){
        this.setState({
            isLoading: true,
            message: ''
        });

        const {mail: email, password} = this.state;
        this.props.dispatchTryLogin({ email, password })
            .then(user => {
                if( user ) return this.props.navigation.replace('Main');
                this.setState({
                    isLoading: false,
                    message: ''
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: this.getErrorMessage( error.code )
                });
            });
    }

    getErrorMessage( message ){
        switch(message){
            case 'auth/invalid-email':
                return 'E-mail inválido';
            case 'auth/user-disabled':
            case 'auth/operation-not-allowed':
                return 'Usuário foi desabilitado';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/email-already-in-use':
                return 'Já existe um usuário com este e-mail'
            case 'auth/weak-password':
                return 'Senha muito fraca, tente outra mais forte';
            default:
                return 'Ops! Erro desconhecido.';
        }
    }

    renderMessage(){
        const { message } = this.state;
        if( !message ) return null;
        return(
            <View>
                <Text>{ message }</Text>
            </View>
        );
    }

    renderButton(){
        if( this.state.isLoading ) return <ActivityIndicator />;
        return(
            <Button
                title="ENTRAR"
                color="#6eff7a"
                onPress={ () => this.tryLogin() }
            />
        );
    }

    render(){
        return(
            <View style={ styles.container }>
                <FormRow first>
                    <TextInput
                        style={ styles.input }
                        placeholder="Insira seu e-mail aqui!"
                        value={ this.state.mail }
                        onChangeText={ value => this.onChangeHandler( 'mail', value ) }
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        style={ styles.input }
                        placeholder="Insira seua senha aqui!"
                        secureTextEntry
                        value={ this.state.password }
                        onChangeText={ value => this.onChangeHandler( 'password', value ) }
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 15,
        marginRight: 15
    },
    input: {
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ebb927',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});

const mapStateToProps = null;

const mapDispatchToProps = {
    dispatchTryLogin: tryLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
