
import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import HomeScreen from './src/telas/HomeScreen';

const PROXIMO_EXEMPLO = {
  data_hora_servico: '2026-10-20 09:00:00',
  marca: 'Volkswagen',
  modelo: 'Gol',
  placa: 'ABC1D23',
};

const OPCOES = [
  { rotulo: 'Cliente', nivel: 'CLIENTE', usuario: 'teste.cliente' },
  { rotulo: 'Funcionário', nivel: 'FUNCIONARIO', usuario: 'funcionario' },
  { rotulo: 'ADM', nivel: 'ADM', usuario: 'admin' },
];

export default function App() {
  const [opcao, setOpcao] = useState(OPCOES[0]);
  const [comAgendamento, setComAgendamento] = useState(true);

  return (
    <View style={estilos.tudo}>
      <View style={estilos.tela}>
        <HomeScreen
          usuario={opcao.usuario}
          nivel={opcao.nivel}
          proximo={comAgendamento ? PROXIMO_EXEMPLO : null}
          onNavegar={(destino) => Alert.alert('Navegação', `A tela "${destino}" ainda não foi convertida.`)}
          onSair={() => Alert.alert('Sair', 'Aqui você encerraria a sessão e voltaria ao login.')}
        />
      </View>

     
    </View>
  );
}

const estilos = StyleSheet.create({
  tudo: { flex: 1, backgroundColor: '#111827' },
  tela: { flex: 1 },
  teste: { backgroundColor: '#111827', padding: 10, paddingBottom: 18 },
  testeTitulo: { color: '#9ca3af', fontSize: 11, marginBottom: 6, textTransform: 'uppercase' },
  linha: { flexDirection: 'row', flexWrap: 'wrap' },
  botao: {
    borderWidth: 1,
    borderColor: '#4b5563',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  botaoAtivo: { backgroundColor: '#eb2525', borderColor: '#eb2525' },
  botaoTexto: { color: '#d1d5db', fontSize: 12 },
  botaoTextoAtivo: { color: '#fff', fontWeight: '700' },
});
