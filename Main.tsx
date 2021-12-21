import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import PageIndividual from './src/pages/PageIndividual';
import PageMultiple from './src/pages/PageMultiple';

import Footer from './src/components/Footer';
import HeaderComponent from './src/components/HeaderComponent';

const image = { uri: "https://iili.io/7yJVa4.jpgttps://reactjs.org/logo-og.png" };

interface IMain {
   pokemon: null | any;
}

const Main = () => {

   const intialState: IMain = {
      pokemon: null,
   }

   const [pokemon, setPokemon] = useState<null | any>(intialState.pokemon);

   return (
      <View style={styles.container}>
         <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
            imageStyle={{ opacity: 0.4 }}>
            <HeaderComponent />
            {
               (pokemon) ?
                  <PageIndividual
                     pokemon={pokemon}
                     setPokemon={setPokemon}
                  /> :
                  <PageMultiple
                     setPokemon={setPokemon}
                  />
            }
         </ImageBackground>
         <Footer />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "rgba(0, 0, 255, 0.5)",
   },
   image: {
      flex: 1,
   },
});

export default Main;