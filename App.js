//Imports:
import firebase from './config/config';
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import { Audio } from 'expo-av';
import ListaUsuarios from './ListaUsuariosFolder/ListaUsuarios';


//Criar abas da parte de baixo:
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Classe Principal:
class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      senha: '',
    };
  }

//Leitura do nome usuário do armazenamento local:
  async ler() {
    try {
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if (senha != null) {
        if (senha === this.state.senha) {
          this.props.navigation.navigate('Teste1');
        } else {
          alert("Senha Incorreta!");
        }
      } else {
        alert("Usuário não foi encontrado!");
      }
    } catch (erro) {
      console.log(erro);
    }
  }

//Renderizar letras e estilos:
  render() {
    return (
      <View style={styles.container}>
        <Title>Login</Title>
        <TextInput
          label="Usuário"
          mode="lined"
          style={estilos.input}
          value={this.state.usuario}
          onChangeText={(texto) => this.setState({ usuario: texto })}
        />
        <TextInput
          label="Senha"
          mode="lined"
          style={estilos.input}
          secureTextEntry
          value={this.state.senha}
          onChangeText={(texto) => this.setState({ senha: texto })}
        />
        <Image
        source={require('./assets/LoginUsuario-Photoroom.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }}
/>

        <Button mode="contained" onPress={() => this.ler()}>
          Entrar
        </Button>
      </View>
    );
  }
}

//Classe criar cadastro:
class Criar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

//Espera som ao clicar no "ok" da mensagem popup:
  async playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('/assets/beep-329314.mp3')
    );
    this.sound = sound;
    await this.sound.playAsync();
  }

//Grava no armazenamento local e sobe mensagem popup:
  async gravar() {
    try {
      await AsyncStorage.setItem(this.state.user, this.state.password);
      this.playSound();
      alert("Usuário cadastrado com sucesso!");
    } catch (erro) {
      alert("Erro!");
    }
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.unloadAsync();
    }
  }

//Parte visual css cadastro:
  render() {
    return (
      <View style={styles.container}>
        <Title>Cadastrar usuário no sistema</Title>
        <TextInput
          label="Digite seu nome de usuário"
          mode="lined"
          style={estilos.input}
          value={this.state.user}
          onChangeText={(texto) => this.setState({ user: texto })}
        />
        <TextInput
          label="Digite sua senha"
          mode="lined"
          style={estilos.input}
          secureTextEntry
          value={this.state.password}
          onChangeText={(texto) => this.setState({ password: texto })}
        />
        <Image
        source={require('./assets/CadastrarUsuario.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }}
/>
        <Button mode="contained" onPress={() => this.gravar()}>
          Cadastrar
        </Button>
      </View>
    );
  }
}

//Testes de daltonismo imagens ao realizar o login:
class Nav2 extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Principal} />
        <Stack.Screen name="Teste1" component={Teste1} options={{ headerShown: false }} />
        <Stack.Screen name="Teste2" component={Teste2} options={{ headerShown: false }} />
        <Stack.Screen name="Teste3" component={Teste3} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}

class Teste1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>            
            <Image 
              source={require('/assets/Numero13.png')} 
              style={estilos.imagem} 
            />
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Teste2')}>
              Próximo teste
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Teste2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Image 
              source={require('/assets/Numero9.png')} 
              style={estilos.imagem} 
            />
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Teste3')}>
              Próximo teste
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

class Teste3 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Image 
              source={require('/assets/Numero7.png')} 
              style={estilos.imagem} 
            />         
            <Button mode="contained" onPress={() => this.props.navigation.navigate('Informações')}>
              Próximo teste
            </Button>
            <Button mode="outlined" onPress={() => this.props.navigation.goBack()}>
              Voltar
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }
}

//Classe informações sobre o aplicativo:
class Informacoes extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title>Informações</Title>
        <Paragraph>
          {"Sobre o aplicativo:"}
        </Paragraph>
        <Paragraph>
          {
            "Este aplicativo tem, como função, exibir ao usuário um teste de daltonismo, onde ele verifica se você pode ver as cores com precisão. Se você não passar no teste, você possui uma deficiência visual de cores - neste caso o daltonismo."
          }
        </Paragraph>
      </View>
    );
  }
}

//Separando abas:
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Nav2}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home-account" color={color} size={size} />),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Cadastro"
            component={Criar}
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-details" color={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Informações"
            component={Informacoes} 
            options={{
              tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="information" color={color} size={size} />)
            }}
          />
          <Tab.Screen name="Lista" component={ListaUsuarios} />
          <Tab.Screen
            name="Deletar"
            component={DeletarUsuario}
            options={{
              tabBarLabel: 'Deletar',
              tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-remove" color={color} size={size} />
    ),
  }}
/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

//Função deletar usuário
function DeletarUsuario() {
  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [mensagem, setMensagem] = React.useState('');

  const deletar = async () => {
    try {
      const senhaArmazenada = await AsyncStorage.getItem(usuario);
      if (senhaArmazenada !== null) {
        if (senhaArmazenada === senha) {
          await AsyncStorage.removeItem(usuario);
          setMensagem('Usuário deletado com sucesso!');
        } else {
          setMensagem('Senha incorreta!');
        }
      } else {
        setMensagem('Usuário não encontrado!');
      }
    } catch (error) {
      setMensagem('Erro ao deletar usuário.');
    }
  };

//Parte estética css deletar usuario:
  return (
    <View style={styles.container}>
      <Title>Deletar Usuário</Title>
      <TextInput
        label="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Image
        source={require('./assets/ExcluirUsuario.png')}
        style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }}
/>
      <Button mode="contained" onPress={deletar} style={styles.button}>
        Deletar
      </Button>
      <Paragraph>{mensagem}</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default App;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white'
},
  imagem: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginVertical: 16,
  },
});
