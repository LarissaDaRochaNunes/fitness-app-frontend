import imagemFundo from '../assets/fundo.png';
import logo from '../assets/Logo.png';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {Link} from 'react-router-dom';

export function SingUp(){
    return(
        <main className='flex h-screen overdlow-hidden'>
            <div className='hidden md:block w-1/2 h-full'>
                <img src={imagemFundo} alt="Pessoas se exercitando ao ar livre" className='w-full h-full object-cover object-center rounded-2xl p-3' />
            </div>
            <div className='w-full md:w-1/2 h-full overflow-y-auto flex flex-col items-start p-8 md:p-16'>
            <div className='flex items-center gap-2 mb-8 w-80 mx-auto space-y-12'>
                <img src={logo} alt="Logotipo FitMeet"/>
            </div>
            <div className='w-80 mx-auto space-y-12'>
                <h1 className='text-3xl font-display mb-4'>Crie sua conta</h1>
                <p className='text-muted-foreground mb-6'>Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre. Vamos juntos! 💪</p>

                <form action="" className='flex flex-col gap-4'>
                    
                        <Input id='nome' label='Nome completo' type='text' placeholder='Ex.: João da Silva' required/>
                    
                        <Input id='cpf' label='CPF' type='text' placeholder='Ex.: 123.456.789-01' required/>
                
                        <Input id='email' label='E-mail' type='email' placeholder='Ex.: joao@email.com' required/>

                        <Input id='password' label='Senha' type='password' placeholder='Ex.: joao123' required/>
                    <Button>Cadastrar</Button>
                </form>
                <p className='text-sm text-muted-foreground text-center'>Já tem uma conta? <Link to="/SingIn" className='font-semibold hover:underline'>Faça login</Link></p>

            </div>
            </div>
        </main>
    )
}