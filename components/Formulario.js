import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCita, gusrdarMostrarForm}) => {

    const[paciente, GuardarPaciente] = useState('');
    const[responsable, GuardarResponsable] = useState('');
    const[contacto, GuardarContacto] = useState('');
    const[fecha, GuardarFecha] = useState('');
    const[hora, GuardarHora] = useState('');
    const[sintomas, GuardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
        GuardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    // muestra u oculta el time picker

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
        const opciones = {hour: 'numeric', minute: '2-digit'}
        GuardarHora(hora.toLocaleTimeString('es-CH', opciones));
        hideTimePicker();
    };

    // agregar nueva cita:
    const crearNuevaCita = () => {
        // validacion:
        if(paciente.trim() === '' || responsable.trim() === '' || contacto.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            mostrarAlerta();
            return;
        }
        // Crear una nueva cita:
        const cita = { paciente, responsable, contacto, fecha, hora, sintomas};
        cita.id = shortid.generate();
        // console.log(cita);
        
        // agregar al state:
        const citasNuevo = [...citas, cita];
        setCita(citasNuevo);

        // ocultar el formulario:
        gusrdarMostrarForm(false);

        // resetear el formulario


    }

    // Muestra la alerta si falla la validacion:
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{text: 'OK'}]
        )
    }

    return ( 
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={ (texto) => GuardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Responsable:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={ (texto) => GuardarResponsable(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Contacto:</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={ (texto) => GuardarContacto(texto)}
                        keyboardType='numeric'
                    />
                </View>

                <View>
                    <View>
                        <Text style={styles.label}>Fecha</Text>
                        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={confirmarFecha}
                            onCancel={hideDatePicker}
                        />
                        <Text>{fecha}</Text>
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={styles.label}>Hora</Text>
                        <Button title="Seleccionar Hora" onPress={showTimePicker} />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={confirmarHora}
                            onCancel={hideTimePicker}
                        />
                        <Text>{hora}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput 
                        multiline
                        style={styles.input} 
                        onChangeText={ (texto) => GuardarSintomas(texto)}
                    />
                </View>
                <View>
                    <TouchableHighlight style={styles.btnSubmit} onPress={ () => crearNuevaCita()}>
                        <Text style={styles.textoSubmit}>Agregar Cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
     );
}

// Estilos css
const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
        marginBottom: 25
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Formulario;