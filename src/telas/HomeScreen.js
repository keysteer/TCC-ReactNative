

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


const COR = {
  topo: '#eb2525',
  destaque: '#eb0404',
  fundo: '#f5f6fa',
  branco: '#ffffff',
  titulo: '#1f2937',
  texto: '#6b7280',
  borda: '#eeeeee',
};

const ALTURA_TOPO = 64;


const ATALHOS = [
  {
    destino: 'servicos_cliente',
    icone: 'wrench',
    titulo: 'Nossos Serviços',
    texto: 'Veja o que a oficina oferece e os valores.',
  },
  {
    destino: 'agendar',
    icone: 'calendar-plus',
    titulo: 'Agendar Serviço',
    texto: 'Escolha o veículo, os serviços e o horário.',
  },
  {
    destino: 'historico',
    icone: 'history',
    titulo: 'Histórico',
    texto: 'Acompanhe seus agendamentos e serviços feitos.',
  },
];


function formatarDataHora(valor) {
  if (!valor) return '';
  const [data, hora = '00:00'] = String(valor).split(' ');
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano} às ${hora.slice(0, 5)}`;
}

function Topo({ usuario, menuAberto, onAlternarMenu }) {
  return (
    <View style={estilos.topo}>
      <Text style={estilos.tituloTopo}>Oficina Show Motors</Text>

      <Pressable style={estilos.botaoUsuario} onPress={onAlternarMenu} hitSlop={8}>
        <FontAwesome5 name="user-circle" size={20} color="#fff" />
        <Text style={estilos.nomeUsuario} numberOfLines={1}>
          {usuario}
        </Text>
        <FontAwesome5 name={menuAberto ? 'chevron-up' : 'chevron-down'} size={11} color="#fff" />
      </Pressable>
    </View>
  );
}


function TelaAdm() {
  return (
    <View>
      <Text style={estilos.tituloSecao}>Tela ADM</Text>
      <Text style={estilos.textoComum}>Você está logado como Administrador.</Text>
    </View>
  );
}

function TelaFuncionario() {
  return (
    <View>
      <Text style={estilos.tituloSecao}>Tela Funcionário</Text>
      <Text style={estilos.textoComum}>Você está logado como Funcionário.</Text>
    </View>
  );
}

function TelaCliente({ usuario, proximo, onNavegar }) {
  return (
    <View>
      <View style={estilos.cabecalhoSecao}>
        <FontAwesome5 name="home" size={20} color={COR.titulo} />
        <Text style={estilos.tituloSecao}> Olá, {usuario}!</Text>
      </View>

     
      {proximo ? (
        <View style={estilos.proximoAgendamento}>
          <FontAwesome5 name="calendar-check" size={28} color={COR.destaque} />
          <View style={estilos.proximoTextos}>
            <Text style={estilos.proximoTitulo}>Seu próximo agendamento</Text>
            <Text style={estilos.proximoDetalhe}>
              {formatarDataHora(proximo.data_hora_servico)} · {proximo.marca} {proximo.modelo} (
              {proximo.placa})
            </Text>
          </View>
        </View>
      ) : null}

      
      {ATALHOS.map((atalho) => (
        <Pressable
          key={atalho.destino}
          onPress={() => onNavegar && onNavegar(atalho.destino)}
          style={({ pressed }) => [estilos.cardAtalho, pressed && estilos.cardPressionado]}
        >
          <FontAwesome5 name={atalho.icone} size={26} color={COR.destaque} style={estilos.iconeAtalho} />
          <Text style={estilos.tituloAtalho}>{atalho.titulo}</Text>
          <Text style={estilos.textoAtalho}>{atalho.texto}</Text>
        </Pressable>
      ))}
    </View>
  );
}


export default function HomeScreen({ usuario, nivel, proximo = null, onNavegar, onSair }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <StatusBar barStyle="light-content" backgroundColor={COR.topo} />

      <View style={estilos.raiz}>
        <Topo
          usuario={usuario}
          menuAberto={menuAberto}
          onAlternarMenu={() => setMenuAberto(!menuAberto)}
        />

        <ScrollView contentContainerStyle={estilos.conteudo}>
          {nivel === 'ADM' ? (
            <TelaAdm />
          ) : nivel === 'FUNCIONARIO' ? (
            <TelaFuncionario />
          ) : (
            <TelaCliente usuario={usuario} proximo={proximo} onNavegar={onNavegar} />
          )}
        </ScrollView>

       
        {menuAberto ? (
          <>
           
            <Pressable style={estilos.fundoMenu} onPress={() => setMenuAberto(false)} />
            <View style={estilos.menuUsuario}>
              <Pressable
                style={estilos.itemMenu}
                onPress={() => {
                  setMenuAberto(false);
                  onSair && onSair();
                }}
              >
                <FontAwesome5 name="sign-out-alt" size={14} color={COR.destaque} />
                <Text style={estilos.textoSair}>Sair</Text>
              </Pressable>
            </View>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const sombra = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3, 
};

const estilos = StyleSheet.create({
  
  areaSegura: {
    flex: 1,
    backgroundColor: COR.topo,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  raiz: { flex: 1, backgroundColor: COR.fundo },

  topo: {
    height: ALTURA_TOPO,
    backgroundColor: COR.topo,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    zIndex: 3,
  },
  tituloTopo: { color: '#fff', fontSize: 20, fontWeight: '700', flexShrink: 1 },
  botaoUsuario: { flexDirection: 'row', alignItems: 'center', maxWidth: '50%', marginLeft: 12 },
  nomeUsuario: { color: '#fff', fontSize: 15, fontWeight: '600', marginHorizontal: 8, flexShrink: 1 },


  fundoMenu: {
    position: 'absolute',
    top: ALTURA_TOPO,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
    elevation: 7,
  },
  menuUsuario: {
    position: 'absolute',
    top: ALTURA_TOPO + 8,
    right: 16,
    minWidth: 170,
    backgroundColor: COR.branco,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    zIndex: 5,
    elevation: 8,
  },
  itemMenu: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14 },
  textoSair: { color: COR.destaque, fontSize: 14, marginLeft: 10 },

  
  conteudo: { padding: 20, paddingTop: 28 },
  cabecalhoSecao: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  tituloSecao: { fontSize: 22, fontWeight: '700', color: COR.titulo },
  textoComum: { marginTop: 8, fontSize: 15, color: COR.texto },

  proximoAgendamento: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COR.branco,
    borderLeftWidth: 6,
    borderLeftColor: COR.destaque,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 24,
    ...sombra,
  },
  proximoTextos: { flex: 1, marginLeft: 16 },
  proximoTitulo: { fontSize: 15, fontWeight: '700', color: COR.titulo },
  proximoDetalhe: { marginTop: 4, fontSize: 14, color: COR.texto, lineHeight: 20 },

  
  cardAtalho: {
    backgroundColor: COR.branco,
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 22,
    marginBottom: 16,
    ...sombra,
  },
  cardPressionado: { transform: [{ translateY: -2 }], opacity: 0.92 },
  iconeAtalho: { marginBottom: 14 },
  tituloAtalho: { fontSize: 17, fontWeight: '700', color: COR.titulo, marginBottom: 8 },
  textoAtalho: { fontSize: 14, color: COR.texto, lineHeight: 21 },
});
