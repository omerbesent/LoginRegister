import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class PasswordInput extends Component {

    constructor() {
        super();
        this.state = {
            hidePassword: true
        }
    }

    render() {
        const { value, onChange } = this.props;
        const { hidePassword } = this.state;
        return (
            <View>
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.email_input}
                    placeholder="Parola"
                    secureTextEntry={hidePassword} />
                <Icon style={styles.input_icon} name="lock" size={15} ></Icon>
                <TouchableOpacity onPress={() => this.setState({ hidePassword: !hidePassword })} style={styles.password_hide_button}>
                    <Icon name={hidePassword ? "eye" : "eye-slash"} size={15} color="gray" ></Icon>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    email_input: {
        width: 280,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        paddingLeft: 35,
        borderColor: 'gray',
    },
    input_icon: {
        position: 'absolute', left: 0, padding: 15, paddingLeft: 12, color: 'gray'
    },
    password_hide_button: { position: 'absolute', right: 0, padding: 15, paddingRight: 12 },
});