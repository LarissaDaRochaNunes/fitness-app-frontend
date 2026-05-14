import imagemFundo from '../assets/fundo.png';
import logo from '../assets/Logo.png';
export function SingUp(){
    return(
        <main className='flex min-h-screen'>
            <div className='hidden md:block w-full md:w-1/2'>
                <img src={imagemFundo} alt="Pessoas se exercitando ao ar livre" className='w-full h-full object-cover object-center rounded-2xl p-3' />
            </div>
            <div className='w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16'>
            <div className='className="flex items-center gap-2 mb-8 text-[#10B981]'>
                <img src={logo} alt="Logotipo FitMeet"/>
            </div>
            <div className='w-full max-w-sm'>
                <h1 className='text-3xl font-display'>Crie sua conta</h1>
                <p className='text-sm text-[#374151] mb-1'>Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre. Vamos juntos! 💪</p>

            </div>
            </div>
        </main>
    )
}