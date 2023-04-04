import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { UserRegistration } from '../types';
import { useGlobalState } from '../context';
import { NEW_USER_MUTATION } from '../queries';

const SignupModal = ({ show, handleClose, isOpen }: { show: any, handleClose: any, isOpen: boolean }) => {
    const { setLogged, setUser, user } = useGlobalState()
    const [loading, setLoading] = useState(false)
    const [SignUp] = useMutation(NEW_USER_MUTATION, {
        context: {
            headers: {
                Authorization: `${user?.jwt}`,
            },
        },
    });
    const signup = async (e: any) => {
        e.preventDefault();
        const credentials = new FormData(e.target);
        const username = credentials.get("username");
        const password = credentials.get("password");
        const passwordC = credentials.get("pc");
        if (password !== passwordC) return alert("password is not the same")
        const variables = {
            username,
            password,
        };
        try {
            setLoading(true)
            const { data } = await SignUp({ variables })
            const { newUser: { username, id, jwt } } = data
            window.localStorage.setItem('session', JSON.stringify({ username, jwt, id }))
            setUser({
                username,
                jwt,
                id
            });
            setLogged(true)
            handleClose();
        } catch (error: any) {
            alert(error.message);
            location.reload()
        }

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
                    <Form id='signupForm' onSubmit={signup}>
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
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea2"
                        >
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                name='pc'
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
                                <Button variant="dark" type='submit' form='signupForm'>
                                    signup
                                </Button>
                            </div>
                        )
                    }

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignupModal