import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput'

export default class index extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    login(email, password) {
        axios.post('http://192.168.1.104:8090/api/auth/login', {
            "email": email,
            "password": password
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.data.success) {
                    alert("Giriş yapıldı");
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.log(error.response.data)
                alert(error.response.data);
            });
    }

    _handleSubmit = (values) => {
        //this.login(values.email, values.password);
        console.log(values);
    };

    render() {
        return <ScrollView style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.header_area} >
                    <Icon name={"map-marked-alt"} size={40}  ></Icon>
                    <Text style={styles.header_text1}>Hey Berber</Text>
                    <Text style={styles.header_text2}>Berber Randevu Uygulamasına Hoşgeldiniz</Text>
                </View>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={
                        Yup.object().shape({
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
                            errors,
                            handleChange,
                            setFieldValue
                        }) => (
                            <View style={styles.form_area} >
                                <View style={{ paddingBottom: 20 }}>
                                    <EmailInput value={values.email} onChange={value => {
                                        handleChange('email');
                                        setFieldValue('email', value)
                                    }}></EmailInput>
                                    {(errors.email) && <Text style={styles.error}>{errors.email}</Text>}
                                </View>
                                {ev => onEmailChange(ev, setFieldValue)}
                                <View style={{ paddingBottom: 20 }}>
                                    <PasswordInput value={values.password} onChange={value => {
                                        handleChange('password');
                                        setFieldValue('password', value)
                                    }}></PasswordInput>
                                    {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={styles.forgot_password}>
                                        <Text style={styles.forgot_password_text}>Şifremi unuttum?</Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                    style={styles.login_button}>
                                    <Text style={styles.login_button_text}>Giriş</Text>
                                </TouchableOpacity>

                                <View style={styles.register_area}>
                                    <Text>Üyeliğiniz yok mu ? - </Text>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }}>
                                        <Text style={styles.register_text}>Kayıt Olun</Text>
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
        paddingVertical: 50,
        alignItems: 'center'
    },
    header_area: { alignItems: 'center', justifyContent: 'center', paddingVertical: 30 },
    header_text1: { fontWeight: '700', fontSize: 22, paddingTop: 10 },
    header_text2: { fontWeight: '700', fontSize: 16 },
    form_area: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 30,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 15, },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    forgot_password: {},
    forgot_password_text: { color: 'blue', fontWeight: '700' },
    login_button: {
        backgroundColor: 'blue',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        borderRadius: 10
    },
    login_button_text: { alignItems: 'center', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 },
    register_area: { padding: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    register_text: { fontSize: 15, fontWeight: '700' },
    error: {
        color: 'red',
        fontSize: 11
    }
});