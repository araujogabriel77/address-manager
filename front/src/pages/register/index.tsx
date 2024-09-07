import React, { useState, FormEvent } from 'react';
import { Input, Button, Card, CardBody, CardFooter, Spacer } from '@nextui-org/react';
import { config } from '../../config';
import Snackbar from '@mui/material/Snackbar';
import { EyeFilledIcon } from '../../icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../icons/EyeSlashFilledIcon';
import axios, { AxiosError } from 'axios';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Register() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [snackMessage, setSnackMessage] = useState<string>('Erro ao fazer login');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState<string>('Digite uma senha válida');

  const navigate = useNavigate();
  const successSnackMessage = 'Usuário criado com sucesso!';
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const validatePassword = (value: string) => value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/);

  const isInvalidName = React.useMemo(() => {
    if (email?.length < 3) return false;

  }, [name]);

  const isInvalidEmail = React.useMemo(() => {
    if (!email?.length) return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidPassword = React.useMemo(() => {
    if (password?.length < 6) return false;

    return validatePassword(password) ? false : true;
  }, [password]);

  const isInvalidConfirmPassword = React.useMemo(() => {
    if (confirmPassword?.length < 6) {
      setConfirmPasswordMessage('Digite uma senha válida');
      return true;
    };
    if(confirmPassword !== password) {
      setConfirmPasswordMessage('As senhas não coincidem');
      return true;
    }

    return validatePassword(confirmPassword) ? false : true;
  }, [confirmPassword]);

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const url = `${config.apiUrl}/users`;
    const body = JSON.stringify({
      name: name,
      email: email,
      password: password
    });

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setSnackMessage(successSnackMessage);
        setOpen(true);
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }
    } catch (error) {
      setSnackMessage((error as any)?.response?.data?.message || (error as AxiosError).message);
      setOpen(true);
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-color-dark)]">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackMessage === successSnackMessage ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <Card className="w-96 p-6 shadow-lg">
        <CardBody>
          <h2 className="text-2xl font-bold mb-4">Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="Name"
                errorMessage="O nome deve conter pelo menos 3 caracteres"
                isInvalid={isInvalidName}
                color={isInvalidName ? "danger" : "success"}
              />
            </div>
            <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                errorMessage="Digite um email válido"
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? "danger" : "success"}
              />
            </div>
            <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Senha"
                description="A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, números e ao menos um caractere especial."
                errorMessage="Digite uma senha válida"
                isInvalid={isInvalidPassword}
                color={isInvalidPassword ? "danger" : "success"}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                    {passwordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={passwordVisible ? "text" : "password"}
              />
            </div>
            <div className="mb-4">
              <Input
                variant='bordered'
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirmar senha"
                errorMessage={confirmPasswordMessage}
                isInvalid={isInvalidConfirmPassword}
                color={isInvalidConfirmPassword ? "danger" : "success"}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility} aria-label="toggle password visibility">
                    {confirmPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={confirmPasswordVisible ? "text" : "password"}
              />
            </div>
            <Button type="submit" variant='shadow' color="primary" disabled={isInvalidName || isInvalidEmail || isInvalidPassword || isInvalidConfirmPassword}>
              Cadastrar
            </Button>
          </form>
        </CardBody>
        <CardFooter>
          <Spacer y={1} />
          <p className="text-sm text-center text-gray-600">
            Já possui uma conta? <a href="/" className="text-blue-500">Faça login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};