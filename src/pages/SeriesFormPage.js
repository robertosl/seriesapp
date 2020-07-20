import React from 'react';
import { View, Text, TextInput, StyleSheet, Picker, Slider, Button, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import FormRow from '../components/FormRow';
import { setField, saveSerie, setWholeSerie, resetForm } from '../actions';

class SeriesFormPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount(){
        const { navigation, dispatchSetWholeSerie, dispatchResetForm } = this.props;
        const { params } = navigation.state;
        if( params && params.serieToEdit ) {
            return dispatchSetWholeSerie( params.serieToEdit );
        }
        return dispatchResetForm();
    }

    async pickImage(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if( status !== 'granted' ){
            Alert.alert('OPS!!!', "Assim fica dificil. Você deve permitir o acesso a sua câmera");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.2,
            base64: true,
            allowsEditing: true,
            aspect: [1,1],
        });

        if( !result.cacelled ) this.props.dispatchSetField('img64', result.base64);

    };

    render(){
        const { serieForm, dispatchSetField, dispatchSaveSerie, navigation } = this.props;

        return(
            <KeyboardAvoidingView>
                <ScrollView style={ styles.container }>
                    <FormRow first>
                        <TextInput
                            style={ styles.input }
                            placeholder="Título"
                            value={ serieForm.title }
                            onChangeText={ value => dispatchSetField('title', value) }
                        />
                    </FormRow>
                    <FormRow>
                        {
                            serieForm.img64
                                ? <Image
                                     style={ styles.img }
                                     source={{
                                         uri: `data:image/jpeg;base64,${serieForm.img64}`
                                     }}
                                />
                                : null
                        }
                        <Button
                            title="Selecione uma imagem"
                            onPress={ () => this.pickImage() }
                        />
                    </FormRow>
                    <FormRow>
                        <Picker
                            style={ styles.picker }
                            selectedValue={ serieForm.gender }
                            onValueChange={ itemValue => dispatchSetField( 'gender', itemValue ) }
                        >
                            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                            <Picker.Item label="Comédia" value="Comédia" />
                            <Picker.Item label="Ação" value="Ação" />
                        </Picker>
                    </FormRow>
                    <FormRow>
                        <View style={ styles.sameRow }>
                            <Text style={ styles.sameRowText }>Nota:</Text>
                            <Text style={ styles.sameRowText }>{ serieForm.rate }</Text>
                        </View>
                        <Slider
                            step={ 5 }
                            minimumValue={ 0 }
                            maximumValue={ 100 }
                            value={ serieForm.rate }
                            onValueChange={ value => dispatchSetField('rate', value) }
                        />
                    </FormRow>
                    <FormRow last>
                        <TextInput
                            style={ styles.textarea }
                            placeholder="Descrição"
                            value={ serieForm.description }
                            onChangeText={ value => dispatchSetField('description', value) }
                            numberOfLines={ 6 }
                            multiline={ true }
                        />
                    </FormRow>
                    {
                        this.state.isLoading
                            ? <ActivityIndicator />
                            : <Button
                                title="Salvar"
                                color="#6eff7a"
                                onPress={ async () =>  {
                                    this.setState({ isLoading: true });
                                    try{
                                        await dispatchSaveSerie( serieForm );
                                        navigation.goBack();
                                    }catch(error){
                                        Alert.alert('Erro', error.message);
                                    }finally{
                                        this.setState({ isLoading: false });
                                    }
                                }}
                            />
                    }
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    picker: {
        color: '#fff'
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    sameRowText: {
        color: '#fff'
    },
    textarea: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#ebb927',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    img: {
        aspectRatio: 1,
        width: '100%',
    },

});

const mapStateToProps = state => ({
    serieForm: state.serieForm
});

const mapDispatchToProps = {
    dispatchSetField: setField,
    dispatchSaveSerie: saveSerie,
    dispatchSetWholeSerie: setWholeSerie,
    dispatchResetForm: resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesFormPage);
