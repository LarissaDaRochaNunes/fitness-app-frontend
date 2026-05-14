import{Input} from '../components/Input';
import{Button} from '../components/Button';
import imagemFundo from '../assets/fundo.png';
import logo from '../assets/Logo.png';
import {Link} from 'react-router-dom';

export function SingIn(){
 
    return (
        <main className='flex min-h-screen'>
            <div className='hidden md:block w-full md:w-1/2'>
                <img src={imagemFundo} alt="Pessoas se exercitando ao ar livre" className='w-full h-full object-cover object-center rounded-2xl p-3' />
            </div>
            <div className='w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16'>
            <div className='className="flex items-center gap-2 mb-8 text-[#10B981]'>
                <img src={logo} alt="Logotipo FitMeet"/>

            </div>
            <div className='w-full max-w-sm'>

                <h1 className='text-3xl font-display'>Bem-Vindo de volta!</h1>
                <p className='text-sm text-[#374151] mb-1'>Encontre parceiros para treinar ao ar livre.</p>
                <p className='text-sm text-[#374151] mb-8'>Conecte-se e comece agora! 💪</p>
                <form action="" className="flex flex-col gap-6">
                    <div className='mb-4'>
                        <Input id="email" label="E-mail" type="email" placeholder="Ex.: joao@email.com" required />
                    </div>
                    <div className='mb-8 text-wrap'>
                        <Input id="password" label="Senha" type="password" placeholder="Ex.: joao123" required/>
                    </div>
                        <Button>Entrar</Button>
                        </form>
                        <p className='mt-8 text-sm text-[#6B7280] text-center'>Ainda não tem uma conta? <Link  to="/SingUp" className='font-medium text-[inherit] hover:underline' >Cadastre-se</Link>

                        </p>
                    </div>
                </div>
        </main>
    )
}

