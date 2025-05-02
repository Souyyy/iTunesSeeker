//Import des elements essentiels
import React from 'react';
import { View, TouchableOpacity, FlatList, Text, Image, StyleSheet } from 'react-native';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavori } from '../redux/favorisSlice';

export default function FavorisScreen() {
    // Utilisation de Redux pour recuperer les favoris
    const dispatch = useDispatch();
    const favoris = useSelector((state) => state.favoris);

    // Fonction pour ajouter ou retirer un favoris grace au store de Redux
    const toggleFavoris = (item) => {
        dispatch(toggleFavori(item));
    };

    // Fonction qui verifie si un element est deja un favoris
    const estFavoris = (item) => {
        return favoris.some(fav => fav.trackId === item.trackId);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 15 }}>Mes Favoris</Text>
            <FlatList
                data={favoris}
                keyExtractor={(item) => item.trackId?.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {item.artworkUrl100 && (
                            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
                        )}
                        <View style={styles.titre_artiste}>
                            <Text style={styles.Titre}>{item.trackName || item.collectionName}</Text>
                            <Text style={styles.itemSousTitre}>{item.artistName}</Text>
                        </View>
                        {/* Affichage de l'icone de notation */}
                        <TouchableOpacity onPress={() => toggleFavoris(item)}>
                            <Image
                                source={
                                    estFavoris(item)
                                        ? require('../assets/icons/favoris_on.png')
                                        : require('../assets/icons/favoris_off.png')
                                }
                                style={styles.favoris}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

// Styles pour le composant FavorisScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    Titre: {
        fontWeight: 'bold'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    titre_artiste: {
        flex: 1,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 5,
    },
    itemTitre: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    itemSousTitre: {
        color: 'gray',
    },
    favoris: {
        width: 22,
        height: 22,
        right: 10,
    },
    avis: {
        width: 22,
        height: 22,
        left: 0,
    },
});
