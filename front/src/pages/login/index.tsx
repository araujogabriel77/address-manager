import React, { useState, FormEvent } from 'react';
import { Input, Button, Card, CardBody, CardFooter, Spacer } from '@nextui-org/react';
import { config } from '../../config';
import { useNavigate } from "react-router";
import { EyeSlashFilledIcon } from '../../icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../icons/EyeFilledIcon';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [snackMessage, setSnackMessage] = useState<string>('Erro ao fazer login');
  
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);


  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const url = `${config.apiUrl}/authentication/login`;
    const body = JSON.stringify({ 
      email: email,
      password: password
    });

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      sessionStorage.setItem('accessToken', response.data?.accessToken);
      navigate('/admin');
    } catch (error) { 
      setSnackMessage((error as any).response.data.message);
      setOpen(true);
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-color-light)]">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        color='danger'
      />
      <Card className="w-96 p-6 shadow-lg">
        <CardBody>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
            </div>
            <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Senha"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <Button type="submit" variant='shadow' color="primary">
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <Spacer y={1} />
          <p className="text-sm text-center text-gray-600">
            Não tem uma conta ainda? <a href="/register" className="text-blue-500">Cadastre-se</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};