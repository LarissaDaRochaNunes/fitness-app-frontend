import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

import imagemFundo from '../assets/fundo.png';
import logo from '../assets/Logo.png';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function SignUp() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); 

    const newErrors: Record<string, string> = {};

    if (!nome.trim()) {
      newErrors.nome = 'Preencha o campo com seu nome';
    }
    if (!cpf.trim()) {
      newErrors.cpf = 'Preencha o campo com seu CPF';
    }
    if (!email.trim()) {
      newErrors.email = 'Preencha o campo com seu e-mail';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await api.post('/auth/register', {
        name: nome,
        cpf,
        email,
        password,
      });

      navigate('/SignIn');
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.';
      alert(mensagemErro);
    }
  }

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='hidden md:block w-1/2 h-full'>
        <img src={imagemFundo} alt="Pessoas se exercitando ao ar livre" className='w-full h-full object-cover object-center rounded-2xl p-3' />
      </div>

      <div className='w-full md:w-1/2 h-full overflow-y-auto flex flex-col items-start p-8 md:p-16'>
        <div className='flex items-center gap-2 mb-8 w-80 mx-auto space-y-12'>
          <img src={logo} alt="Logotipo FitMeet" />
        </div>

        <div className='w-80 mx-auto space-y-12'>
          <div>
            <h1 className='text-3xl font-display mb-4'>Crie sua conta</h1>
            <p className='text-muted-foreground mb-6'>
              Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre. Vamos juntos! 💪
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
            <Input 
              id='nome' 
              label='Nome completo' 
              type='text' 
              placeholder='Ex.: João Silva' 
              value={nome} 
              onChange={handleChange(setNome, 'nome')} 
              required
              error={errors.nome} 
            />

            <Input 
              id='cpf' 
              label='CPF' 
              type='text' 
              placeholder='Ex.: 123.456.789-01' 
              value={cpf} 
              onChange={handleChange(setCpf, 'cpf')}
              required
              error={errors.cpf} 
            />

            <Input 
              id='email' 
              label='E-mail' 
              type='email' 
              placeholder='Ex.: joao@email.com' 
              value={email} 
              onChange={handleChange(setEmail, 'email')} 
              required
              error={errors.email}
            />

            <Input 
              id='password' 
              label='Senha' 
              type='password' 
              placeholder='Ex.: joao123' 
              value={password} 
              onChange={handleChange(setPassword, 'password')}
              required
              error={errors.password} 
            />
            
            <Button type="submit">Cadastrar</Button>
          </form>

          <p className='text-sm text-muted-foreground text-center'>
            Já tem uma conta?
            <Link to="/SignIn" className='font-semibold hover:underline text-black'>
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}