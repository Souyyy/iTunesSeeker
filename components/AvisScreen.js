//Import des elements essentiels
import React, { useState } from 'react';
import { View, FlatList, Text, Image, Button, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { noterMusique } from '../redux/notationSlice';

export default function AvisScreen() {
    // State pour gerer la modal de notation
    const [modalVisible, setModalVisible] = useState(false);
    const [ItemActuel, setItemActuel] = useState(null);
    const [NoteSelectionnee, setNoteSelectionnee] = useState('0');

    // Utilisation de Redux pour recuperer les notations
    const dispatch = useDispatch();
    const notations = useSelector(state => state.notations);

    // Fonction qui permet de recuperer la note d'un element
    const getNote = (trackId) => {
        const entree = notations.find(item => item.trackId === trackId);
        return entree?.note || 0;
    };

    // Fonction qui verifie si un element a deja ete note
    const aEteNotee = (trackId) => {
        return notations.some(item => item.trackId === trackId);
    };

    // Fonction qui ouvre le picker de notation
    const ouvrirPicker = (item) => {
        // Vérifier si l'élément sélectionné est une chanson (track)
        if (item.trackId) {
            setItemActuel(item);
            setNoteSelectionnee(getNote(item.trackId).toString());
            setModalVisible(true);
        }
    };

    // Fonction qui gere la notation de l'element selectionne
    const gestionNote = () => {
        // Si l'element est selectionne et on lui passe la note
        if (ItemActuel) {
            dispatch(noterMusique({ trackId: ItemActuel.trackId, item: ItemActuel, note: parseInt(NoteSelectionnee) }));
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 15 }}>Mes Notes</Text>

            {/* Flatlist des resultats de la recherche */}
            <FlatList
                data={notations}
                keyExtractor={(item) => item.trackId.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {item.artworkUrl100 && (
                            <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
                        )}

                        <View style={styles.info}>
                            <Text style={styles.titreText}>{item.trackName || item.collectionName}</Text>
                            <Text style={styles.soustitre}>{item.artistName}</Text>
                        </View>

                        <View style={styles.avisContainer}>
                            <TouchableOpacity onPress={() => ouvrirPicker(item)}>
                                <Image
                                    source={
                                        aEteNotee(item.trackId)
                                            ? require('../assets/icons/avis_on.png')
                                            : require('../assets/icons/avis_off.png')
                                    }
                                    style={styles.avis}
                                />
                            </TouchableOpacity>
                            {aEteNotee(item.trackId) && (
                                <Text style={styles.noteTexte}>Note : {getNote(item.trackId)}/10</Text>
                            )}
                        </View>
                    </View>
                )}
            />
            {/* Modal pour la notation */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.BackgroundModal}>
                    <View style={styles.ContenuModal}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Note cette musique</Text>
                        <Picker
                            selectedValue={NoteSelectionnee}
                            onValueChange={(itemValue) => setNoteSelectionnee(itemValue)}
                            style={{ width: '100%' }}
                        >
                            {[...Array(11).keys()].map((n) => (
                                <Picker.Item label={`${n} / 10`} value={n.toString()} key={n} />
                            ))}
                        </Picker>
                        <Button title="Valider" onPress={gestionNote} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Styles pour le composant AvisScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    titreText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    soustitre: {
        color: 'gray',
    },
    avisContainer: {
        alignItems: 'center',
        marginLeft: 10,
    },
    avis: {
        width: 22,
        height: 22,
    },
    noteTexte: {
        fontSize: 12,
        color: 'gray',
        marginTop: 2,
    },
    BackgroundModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa',
    },
    ContenuModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    }
});
