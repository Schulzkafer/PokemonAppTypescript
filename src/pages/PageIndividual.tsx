import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

interface IPageIndividual {
   pokemon: null | any;
   setPokemon: React.Dispatch<React.SetStateAction<any>>;
}

const PageIndividual: React.FC<IPageIndividual> = ({
   pokemon, setPokemon
}) => {

   return (
      <>
         <ButtonComponent
            execFunction={() => setPokemon(null)}
         >Return to main page
         </ButtonComponent>
         <View
            style={styles.container}>

            <Text
               style={styles.text}
            >Name: {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
            </Text>

            <Text
               style={styles.text}
            >Weight: {pokemon.weight}
            </Text>

            <Text
               style={styles.text}
            >Base experience: {pokemon.base_experience}
            </Text>

            {
               pokemon.abilities.map((ab: any, i: any) =>
                  <Text
                     key={Math.random()}
                     style={styles.text}
                  >Ability {i + 1}:  {ab.ability.name}
                  </Text>)
            }

            <Image
               style={styles.logo}
               source={{
                  uri: `${pokemon.sprites.other.home.front_default}`,
               }}
            />
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      height: "100%",
      alignItems: "center",
   },
   text: {
      marginBottom: 6,
      fontSize: 20,
      fontWeight: "bold",
      color: "rgb(12, 3, 38)",
   },
   logo: {
      width: 250,
      height: 260,
      marginTop: 20,
   },
});

export default PageIndividual;
