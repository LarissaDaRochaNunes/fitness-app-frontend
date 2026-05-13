import{Input} from '../components/input'

export function Login(){
    return (
        <main>
            <div>
                <h1>Bem-Vindo de volta!</h1>
                <p>Encontre parceiros para treinar ao ar livre.</p>
                <p>Conecte-se e comece agora! 💪</p>
                <form action="">
                    <Input id="email" label="E-mail" type="email" placeholder="Ex: joao@email.com" />
                    <Input id="password" label="Senha" type="password" placeholder="Ex: joao123" required/>
                    <button type='submit'>Entrar</button>
                </form>
                <p>Ainda não tem uma conta? <a href="#">Cadastre-se</a></p>
    

            </div>
        </main>
    )
}