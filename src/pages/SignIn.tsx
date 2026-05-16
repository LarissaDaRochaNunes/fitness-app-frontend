import{Input} from '../components/Input';
import{Button} from '../components/Button';
import imagemFundo from '../assets/fundo.png';
import logo from '../assets/Logo.png';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import {api} from '../services/api';

export function SignIn(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event:FormEvent){
        event.preventDefault();

        try{
            const response = await api.post('/auth/sign-in', {
                email, password,
            });

            const token = response.data.token;

            if(token) {
                localStorage.setItem('@FitMeet:token', token);

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }

            alert ('Login realizado com sucesso!');

            navigate('/Home'); 
        } catch (error:any){
           const mensagemErro = error.response?.data?.message || 'E-mail ou senha incorretos.';
           alert(mensagemErro); 
        }
        
    }
 
    return (
        <main className='flex min-h-screen'>
            <div className='hidden md:block w-full md:w-1/2'>
                <img src={imagemFundo} alt="Pessoas se exercitando ao ar livre" className='w-full h-full object-cover object-center rounded-2xl p-3' />
            </div>
            <div className='w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16'>
            <div className='className="flex items-center gap-2 mb-12 w-80 mx-auto'>
                <img src={logo} alt="Logotipo FitMeet"/>

            </div>
            <div className='w-80 mx-auto'>

                <h1 className='text-3xl font-display mb-3'>Bem-Vindo de volta!</h1>
                <p className='text-muted-foreground'>Encontre parceiros para treinar ao ar livre.</p>
                <p className='text-muted-foreground mb-6'>Conecte-se e comece agora! 💪</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                
                        <Input id="email" label="E-mail" type="email" placeholder="Ex.: joao@email.com" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required/>
        
                        <Input id="password" label="Senha" type="password" placeholder="Ex.: joao123" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required/>

                        <Button type="submit">Entrar</Button>
                        </form>
                        <p className='mt-8 text-sm text-muted-foreground text-center'>Ainda não tem uma conta? <Link  to="/SignUp" className='font-semibold hover:underline' >Cadastre-se</Link>

                        </p>
                    </div>
                </div>
        </main>
    )
}

