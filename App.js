import React, {useState} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';

// componentes:
import Cita from './components/Cita';
import Formulario from './components/Formulario';



const App = () => {

  // carga condicional de componentes:
  const [mostrarForm, gusrdarMostrarForm] = useState(true);

  // Definir el state de citas:
  const [citas, setCita] = useState([
    {id: "1", paciente: "Hook", responsable: "Juan", sintomas: "No duerme"},
    {id: "2", paciente: "React", responsable: "Jose", sintomas: "No come"},
    {id: "3", paciente: "Native", responsable: "Joshue", sintomas: "Solo Duerme"},
  ]);

  // Eliminar citas del state
  const eliminarPaciente = id => {
    setCita( (citasActuales) => {
      return citasActuales.filter( cita => cita.id != id );
    })
  };

  const MostrarFormulario = () => {
    gusrdarMostrarForm(!mostrarForm)
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>

      <View>
          <TouchableHighlight style={styles.btnMostrarFormulario} onPress={ () => MostrarFormulario()}>
              <Text style={styles.textoMostrarFormulario}>Mostrar Formulario</Text>
          </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <>
            <Text style={styles.titulo}>Crear Nueva Cita</Text>
            <Formulario
              citas={citas}
              setCita={setCita}
              gusrdarMostrarForm={gusrdarMostrarForm}
            />
          </>
        ) : (
          <>
            <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus Citas' : 'Agrega una Cita'} </Text>

            <FlatList 
            style={styles.listado}
              data={citas}
              renderItem={ ({item}) => (
                <Cita item={item}  eliminarPaciente={eliminarPaciente}/>
              )}
              keyExtractor={ cita => cita.id}
            />
          </>
        )}
      </View>
    </View>
  );
};

// Estilos CSS:
const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#9400d3',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: 25,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostrarFormulario: {
    padding: 10,
    backgroundColor: '#7b68ee',
    marginVertical: 10,
    marginBottom: 25
  },
  textoMostrarFormulario: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }
})


export default App;
