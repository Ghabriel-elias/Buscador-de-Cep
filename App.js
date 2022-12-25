import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import api from './services/api';

export default function App() {

  const [cep, setCep] = useState(0)

  const [loading, setLoading] = useState(0)

  const [showCard, setShowCard] = useState(0)

  const [rua, setRua] = useState()
  const [bairro, setBairro] = useState()
  const [cidade, setCidade] = useState()
  const [estado, setEstado] = useState()

  const inputRef = useRef(null)

  useEffect(() => {
    async function loadAPi() {
      const response = await api.get('05424020')
      setLoading(1)
    }
    loadAPi()
  }, [])

  function actionInputClearFocus() {
    inputRef.current.clear()
    inputRef.current.focus()
    setCep(0)
    setShowCard(0)
  }

  async function buscarCep() {
    if (cep.length < 8 || cep === 0) {
      alert("Digite um Cep válido")
      inputRef.current.clear()
      inputRef.current.focus()
      return
    }
    async function loadAPi() {
      const response = await api.get(cep)
      Keyboard.dismiss()
      setShowCard(1)
      setRua(response.data.address)
      setBairro(response.data.district)
      setCidade(response.data.city)
      setEstado(response.data.state)
    }
    loadAPi()
  }

  if (cep.length === 7 && showCard === 1) {
    setShowCard(0)
  }

  if (loading === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          color='#000'
          size={55}
        />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscador de Cep</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 56796080'
          onChangeText={(value) => setCep(value)}
          keyboardType='numeric'
          maxLength={8}
          ref={inputRef}
        />
        <View style={styles.areaBtn}>
          <TouchableOpacity style={styles.btnCep} onPress={buscarCep}>
            <Text style={styles.textBtns}>Buscar Cep</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.limpar} onPress={actionInputClearFocus}>
            <Text style={styles.textBtns}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.area}>
          {showCard != 0 && (
            <View style={styles.areaCard}>
              <View style={styles.card}>
                <Text style={styles.textsCard}>Cep: {cep}</Text>
                <Text style={styles.textsCard}>Rua: {rua}</Text>
                <Text style={styles.textsCard}>Bairro: {bairro}</Text>
                <Text style={styles.textsCard}>Cidade: {cidade}</Text>
                <Text style={styles.textsCard}>Estado: {estado}</Text>
              </View>
            </View>
          )}
          <View>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#000' }}>
              Desenvolvido por Ghabriel Elias
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    marginTop: 65,
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    marginTop: 16,
    backgroundColor: '#999999',
    width: 365,
    borderRadius: 15,
    padding: 12,
    paddingLeft: 20,
    color: "#000"
  },
  areaBtn: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnCep: {
    backgroundColor: '#01b1D1',
    borderRadius: 18,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  limpar: {
    backgroundColor: "#E80A0A",
    borderRadius: 18,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textBtns: {
    color: '#fff',
    padding: 10
  },
  area: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  areaCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  card: {
    backgroundColor: '#99999999',
    width: 365,
    borderRadius: 15,
    height: 270,
    justifyContent: 'center'
  },
  textsCard: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 5
  }
});
