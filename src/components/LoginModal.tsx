import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useLazyQuery } from '@apollo/client';
import { UserRegistration } from '../types';
import { useGlobalState } from '../context';
import { LOGIN_QUERY } from '../queries';

const LoginModal = ({ show, handleClose, isOpen }: { show: any, handleClose: any, isOpen: boolean }) => {
    const { setLogged, setUser } = useGlobalState()
    const [logIn, { loading, error }] = useLazyQuery(LOGIN_QUERY, {
        onCompleted: (data: { login: UserRegistration }) => {
            const { login: { jwt, id, username } } = data;
            window.localStorage.setItem('session', JSON.stringify({ username, jwt, id }))
            setUser({
                username,
                jwt,
                id
            });
            setLogged(true)
            handleClose();
        },
    });
    if (error) {
        alert(error.message);
        location.reload();
    }
    const login = (e: any) => {
        e.preventDefault();
        const credentials = new FormData(e.target);
        const username = credentials.get("username");
        const password = credentials.get("password");
        const variables = {
            username,
            password,
        };
        return logIn({ variables });
    };
    if (!isOpen) {
        return null
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='loginForm' onSubmit={login}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name='username'
                                type="username"
                                placeholder="username"
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type="password"
                                autoComplete="new-password"
                                placeholder="enter password"
                                autoFocus
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {
                        loading ? "Loading..." : (
                            <div>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button variant="dark" type='submit' form='loginForm'>
                                    login
                                </Button>
                            </div>
                        )
                    }

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal