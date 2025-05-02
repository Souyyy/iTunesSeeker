//Import des elements essentiels
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Button, FlatList, Text, StyleSheet, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavori } from '../redux/favorisSlice';
import { noterMusique } from '../redux/notationSlice';

export default function HomeScreen({ navigation }) {
  // State pour gerer la recherche, les resultats et le type de recherche
  const [queryDeRecherche, setQueryDeRecherche] = useState('');
  const [results, setResults] = useState([]);
  const [typeDeRecherche, setTypeDeRecherche] = useState('musicTrack');

  // State pour gerer la modal de notation
  const [modalVisible, setModalVisible] = useState(false);
  const [ItemActuel, setItemActuel] = useState(null);
  const [NoteSelectionnee, setNoteSelectionnee] = useState('0');

  // Utilisation de Redux pour reccuperr les favoris et les notations
  const dispatch = useDispatch();
  const notations = useSelector((state) => state.notations);
  const favoris = useSelector((state) => state.favoris);

  // State pour gérer la modal des détails de l'artiste
  const [modalArtisteVisible, setModalArtisteVisible] = useState(false);
  const [artisteDetails, setArtisteDetails] = useState(null);


  // Fonction pour ajouter ou retirer un favoris grace au store Redux
  const toggleFavoris = (item) => {
    dispatch(toggleFavori(item));
  };

  // Fonction qui verifie si un element est deja un favoris
  const estFavoris = (item) => {

    return favoris.some(fav => fav.trackId === item.trackId);
  };

  // Fonction qui permet de recuperer la note d'un element
  const getNote = (trackId) => {
    const entree = notations.find(item => item.trackId === trackId);
    // Si l'element n'est pas note, on retourne 0
    return entree?.note || 0;
  };

  // Fonction qui verifie si un element a deja ete note
  const aEteNotee = (trackId) => {
    // On verifie si l'element est deja note dans le store Redux
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

  // Fonction pour afficher les détails de l'artiste dans la modal
  const afficherDetailsArtiste = async (artiste) => {
    try {
      // Récupérer les informations détaillées de l'artiste via l'API iTunes
      const response = await fetch(`https://itunes.apple.com/lookup?id=${artiste.artistId}&entity=album`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Exclure les résultats inutiles (exemple : l'artiste lui-même)
        const albums = data.results.filter(item => item.wrapperType === 'collection');
        setArtisteDetails({
          ...artiste,
          albums,
          nbAlbums: albums.length,
          // Total des chansons sur tous les albums
          nbChansons: albums.reduce((total, album) => total + album.trackCount, 0), 
        });
        setModalArtisteVisible(true); // Ouvrir la modal
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'artiste:', error);
    }
  };

  // Fonction qui gere la recherche sur l'api iTunes
  const searchiTunes = async () => {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(queryDeRecherche)}&entity=${typeDeRecherche}&limit=25`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', marginTop: 15 }}>Accueil</Text>

      {/* Picker pour choisir le type de recherche ) */}
      <View style={styles.searchBox}>
        <Picker selectedValue={typeDeRecherche} style={styles.picker} onValueChange={(itemValue) => setTypeDeRecherche(itemValue)}>
          <Picker.Item label="Par Chanson" value="musicTrack" />
          <Picker.Item label="Par Artiste" value="musicArtist" />
        </Picker>

        {/* La barre de recherche */}
        <View style={styles.boxRecherche}>
          <TextInput style={styles.input} placeholder="Chanson, artiste" value={queryDeRecherche} onChangeText={setQueryDeRecherche} />
          <TouchableOpacity style={styles.rechercher} onPress={searchiTunes}>
            <Image source={require('../assets/icons/loupe.png')} style={styles.loupe} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Flatlist des resultats de la recherche */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId?.toString() || item.collectionId?.toString() || item.artistId?.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.artworkUrl100 && (<Image source={{ uri: item.artworkUrl100 }} style={styles.image} />)}
            <View style={styles.titre_artiste}>
              <Text style={styles.titreItem}>{item.trackName || item.collectionName || item.artistName}</Text>
              <Text style={styles.SSTitreItem}>{item.artistName}</Text>
            </View>

            <View style={styles.DetailsContainer}>
              <View style={styles.actionsContainer}>
                {/* Si l'élément est une chanson, afficher les boutons Like et Note */}
                {item.trackId ? (
                  <>
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
                  </>
                ) : (
                  // Si l'élément est un artiste, afficher le bouton "Détails"
                  <TouchableOpacity onPress={() => afficherDetailsArtiste(item)}>
                    <Text style={styles.detailsButton}>Détails</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Affichage de la note si l'élément a déjà été noté */}
              {aEteNotee(item.trackId) && (
                <Text style={styles.noteTexte}>{getNote(item.trackId)}/10</Text>
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

      {/* Modal pour afficher les détails de l'artiste */}
      <Modal visible={modalArtisteVisible} transparent={true} animationType="slide">
  <View style={styles.BackgroundModal}>
    <View style={styles.ContenuModal}>
      {artisteDetails ? (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{artisteDetails.artistName}</Text>

          {/* Image de l'album */}
          {artisteDetails.albums.length > 0 && (
            <Image
              source={{ uri: artisteDetails.albums[0].artworkUrl100 }}
              style={styles.image}
            />
          )}

          {/* Informations sur l'artiste */}
          <Text style={{ marginTop: 10, fontSize: 16 }}>Genre: {artisteDetails.primaryGenreName || 'Pas d\'info'}</Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>Pays: {artisteDetails.country || 'Pas d\'info'}</Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>Label: {artisteDetails.recordLabel || 'Pas d\'info'}</Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>Biographie: {artisteDetails.shortDescription || 'Pas d\'info'}</Text>

          {/* Informations sur les albums */}
          <Text style={{ marginTop: 10, fontSize: 16 }}>Nombre d'albums: {artisteDetails.nbAlbums}</Text>
          <Text style={{ marginTop: 10, marginBottom: 15, fontSize: 16 }}>Nombre total de chansons: {artisteDetails.nbChansons}</Text>

          <Button title="Fermer" onPress={() => setModalArtisteVisible(false)} />
        </>
      ) : (
        <Text>Chargement des détails...</Text>
      )}
    </View>
  </View>
</Modal>

    </View>
  );
}

// Styles pour le composant HomeScreen

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 7,
  },

  DetailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  noteTexte: {
    marginTop: 5,
    fontSize: 12,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },

  picker: {
    height: 50,
    width: '100%',
    borderRadius: 15,
  },

  boxRecherche: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  rechercher: {
    flex: 0.5,
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  loupe: {
    width: 20,
    height: 20,
  },

  avis: {
    width: 22,
    height: 22,
    left: 0,
  },

  favoris: {
    width: 22,
    height: 22,
    right: 0,
  },

  input: {
    flex: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 15,
    borderRadius: 15,
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

  titreItem: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  SSTitreItem: {
    color: 'gray',
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
  alignItems: 'center',
  }
});
