import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function App() {

  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');
  const [nome3, setNome3] = useState('');

  useEffect(() => {
    async function pegarDados() {

      const referencia = doc(bancoExterno, "atividades", "1")

      getDoc(referencia)
        .then((snap) => {
          setNome(snap.data()?.Fogão)

        })

        .catch((erro) => {
          console.log(erro)
        })

        onSnapshot(doc(bancoExterno,"aparelhos", "2"), (snap)=>{
          setNome2(snap.data()?.Geladeira)
        })

        onSnapshot(doc(bancoExterno,"aparelhos", "2"), (snap)=>{
          setNome3(snap.data()?.TV)
        })

    }
    pegarDados();

    

  }, [])


  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, color: 'white', fontWeight: 'bold',}}>ChatFireStore:</Text>
      <Text style={{fontSize:25, fontWeight: 'bold'}}>Mensagens: {nome} </Text>
      <Text style={{fontSize:20}}>Mensagem 1: {nome2} </Text>
      <Text style={{fontSize:20}}>Mensagem 2: {nome3} </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEB1D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});