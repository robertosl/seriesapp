import React from 'react';
import { View, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import Row from '../components/Row';
import LongText from '../components/LongText';
import { deleteSerie } from '../actions';

class SerieDetailPage extends React.Component{
    render(){

        const { navigation, dispatchDeleteSerie } = this.props;
        const { serie } = this.props.navigation.state.params;

        return(
            <ScrollView>
                {
                    serie.img64
                        ? <Image
                            source={{
                                uri: `data:image/jpeg;base64,${serie.img64}`
                            }}
                            style={ styles.img }
                        />
                        : null
                }

                <Row label="Gênero: " content={ serie.gender } />
                <Row label="Nota: " content={ serie.rate } />
                <LongText label="Descrição: " content={ serie.description } isDescription last />
                <View style={ styles.buttonWrapper }>
                    <Button
                        title="Editar"
                        onPress={()=>{
                            navigation.replace('SeriesFormPage', {serieToEdit: serie})
                        }}
                    />
                </View>
                <View style={ styles.buttonWrapper }>
                        <Button
                            title="Deletar"
                            color="#ff0004"
                            onPress={async () => {
                                const hasDeleted = await dispatchDeleteSerie( serie );
                                if( hasDeleted ) navigation.goBack();
                            }}
                        />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        aspectRatio: 1,
        width: '100%'
    },
    buttonWrapper: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }
});

const mapStateToProps = null;

const mapDispatchTopProps ={
    dispatchDeleteSerie: deleteSerie,
}

export default connect(mapStateToProps, mapDispatchTopProps)(SerieDetailPage);
