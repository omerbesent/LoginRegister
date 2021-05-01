import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default class index extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    register(fistName, lastName, phoneNumber, email, password) {
        axios.post('http://192.168.1.104:8090/api/auth/register', {
            "firstName": fistName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "email": email,
            "password": password
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.data.success) {
                    alert("Üye oldunuz");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                if (!error.response.data.success) {
                    alert(error.response.data.message);
                } else {
                    alert(error.response.data);
                }
            });
    }

    _handleSubmit = (values) => {
        this.register(values.firstName, values.lastName, values.phoneNumber, values.email, values.password);
    };

    render() {
        return <ScrollView style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.header_area} >
                    <Text style={styles.header_text1}>Hey Berber</Text>
                    <Text style={styles.header_text2}>Berber Randevu Uygulamasına Hoşgeldiniz</Text>
                </View>


                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            firstName: Yup.string().required('Adı alanı boş bırakılamaz'),
                            lastName: Yup.string().required('Soyadı alanı boş bırakılamaz'),
                            email: Yup.string().email().required('E-posta boş bırakılamaz'),
                            password: Yup.string().required('Parola boş bırakılamaz')
                        })
                    }
                >
                    {
                        ({
                            values,
                            handleSubmit,
                            isValid,
                            isSubmitting,
                            errors,
                            handleChange
                        }) => (
                            <View style={styles.form_area} >
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TextInput
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            style={styles.form_input_other} placeholder="Adı" />
                                        <TextInput
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            style={styles.form_input_other} placeholder="Soyadı" />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {(errors.firstName) && <Text style={styles.error}>{errors.firstName}</Text>}
                                        {(errors.lastName) && <Text style={styles.error}>{errors.lastName}</Text>}
                                    </View>
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <TextInput
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                        style={styles.form_input} placeholder="Telefon" />
                                </View>
                                <View style={{ marginBottom: 20 }}>
                                    <TextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        style={styles.form_input} placeholder="E-posta" />
                                    {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                                </View>

                                <View style={{ marginBottom: 20 }}>
                                    <TextInput
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        style={styles.form_input}
                                        placeholder="Parola" secureTextEntry={true} />
                                    {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}
                                </View >

                                <View style={{ marginBottom: 20 }}>
                                    <TextInput
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        style={styles.form_input}
                                        placeholder="Parola Tekrar" secureTextEntry={true} />
                                    {(errors.confirmPassword) && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                                </View>

                                <TouchableOpacity
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                    style={styles.register_button}>
                                    <Text style={styles.register_button_text}>Kayıt Ol</Text>
                                </TouchableOpacity>

                                <View style={styles.login_area}>
                                    <Text>Üyeliğiniz var mı ? - </Text>
                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                        <Text style={styles.login_text}>Giriş Yapın</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </Formik>
            </View>
        </ScrollView>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    sub_container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20
    },
    header_area: { alignItems: 'center', justifyContent: 'center', paddingVertical: 30 },
    header_text1: { fontWeight: '700', fontSize: 22, paddingTop: 10 },
    header_text2: { fontWeight: '700', fontSize: 16 },
    form_area: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 15, },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    form_input: {
        width: 280,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        borderColor: 'gray',
    },
    form_input_other: {
        width: 130,
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        borderColor: 'gray'
    },
    input_icon: {
        position: 'absolute', left: 0, padding: 15, paddingLeft: 12, color: 'gray'
    },
    password_hide_button: { position: 'absolute', right: 0, padding: 15, paddingRight: 12 },
    register_button: {
        backgroundColor: 'blue',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        borderRadius: 10
    },
    register_button_text: { alignItems: 'center', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 },
    login_area: { padding: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    login_text: { fontSize: 15, fontWeight: '700' },
    error: {
        color: 'red',
        fontSize: 11
    },
    error_other: {
        width: 130,
        color: 'red',
        fontSize: 11
    }
});