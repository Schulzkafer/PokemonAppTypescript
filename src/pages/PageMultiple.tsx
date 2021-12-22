import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Filter from '../components/Filter';
import PokesList from "../components/PokesList"

const limit: number = 50;

interface IPageMultiple {
   setPokemon: React.Dispatch<React.SetStateAction<any>>;
}

interface IHooksStates {
   allPokes: any[];
   filteredPokesCharacteristics: any[];
   isLoading: boolean;
}

const PageMultiple: React.FC<IPageMultiple> = ({
   setPokemon
}) => {

   const intialState: IHooksStates = {
      allPokes: [],
      filteredPokesCharacteristics: [],
      isLoading: false,
   }

   const [allPokes, setAllPokes] = useState<any[]>(intialState.allPokes);
   const [filteredPokesCharacteristics, setFilteredPokesCharacteristics] = useState<any[]>(intialState.filteredPokesCharacteristics);
   const [isLoading, setIsLoading] = useState<boolean>(intialState.isLoading);

   const setDefaultAllPokes = useCallback((): void => {
      setIsLoading(true)

      let requests = Array.from({ length: limit }, (_, i) => i + 1)
         .map(x => fetch(`https://pokeapi.co/api/v2/pokemon/${x}/`));

      Promise.all(requests)
         .then(responses => Promise.all(responses.map(res => res.json())))
         .then(ps => {
            setAllPokes(ps)
            setFilteredPokesCharacteristics(ps)
         })
         .catch((err) => console.log(err.message));
      setIsLoading(false)
   }, [])

   useEffect(() => {
      setDefaultAllPokes()
   }, [])

   const filterNames = (text: string): void => {
      text = text.trim().toLowerCase();
      if (!text.length) {
         setFilteredPokesCharacteristics(allPokes)
         return;
      }
      setFilteredPokesCharacteristics(allPokes.filter(poke => poke.name.indexOf(text) > -1))
   }

   return (
      <View>
         <Filter
            filterNames={(t) => filterNames(t)}
         />
         {
            isLoading ?
               <ActivityIndicator
                  size="large"
                  color="yellow"
               /> :
               <PokesList
                  filteredPokesCharacteristics={filteredPokesCharacteristics}
                  setPokemon={setPokemon}
               />
         }
      </View>
   );
}

export default PageMultiple;
