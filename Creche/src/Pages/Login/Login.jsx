import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/img/unnamed.jpg';
import img2 from '../../assets/img/18914.webp';
import img3 from '../../assets/img/images.jpeg';
import img4 from '../../assets/img/Letters.png';
import '../../assets/css/componentsExtraStyles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Reset error message

        console.log("Submitting login with:", { email, password });

        try {
            const response = await fetch('http://localhost:5251/Login/v1/FazerLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Response data:", data);

            if (data.mensagem === 'Sucesso') {
                console.log("Login successful:", data);
                // Armazenar o token em localStorage
                localStorage.setItem('token', data.resposta);
                // Redirecionar para o Dashboard
                navigate('/Dashboard');
            } else {
                console.error("Login failed:", data);
                setErrorMessage(data.mensagem || 'Erro ao iniciar sessão');
            }
        } catch (error) {
            console.error('Erro ao conectar à API:', error);
            setErrorMessage('Erro ao conectar à API: ' + error.message);
        }
    };

    return (
        <div className="flex w-screen flex-wrap text-slate-800">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="flex justify-center pt-12 md:justify-start md:pl-24">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        Centro Infantil - Vanessa Ray's
                    </Link>
                </div>
                <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-2 md:justify-start lg:w-[28rem]">
                    <p className="text-center text-2xl font-bold md:leading-tight md:text-left md:text-3xl">
                        Bem-vindo
                        à <br /> Centro Infantil - Vanessa Ray's
                    </p>
                    <p className="mt-6 text-center font-medium md:text-left">Inicie a sua sessão com Segurança.</p>

                    {errorMessage && (
                        <p className="text-red-500 text-center md:text-left">{errorMessage}</p>
                    )}

                    <form className="flex flex-col items-stretch pt-3 md:pt-3" onSubmit={handleSubmit}>
                        <div className="flex flex-col pt-4">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition">
                                <input
                                    type="email"
                                    id="login-email"
                                    className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-300 bg-white/20 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-4 flex flex-col pt-4">
                            <div className="relative flex overflow-hidden rounded-md border-2 transition">
                                <input
                                    type="password"
                                    id="login-password"
                                    className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-300 bg-white/20 py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <a href="#" className="mb-6 text-center text-sm font-medium text-gray-600 md:text-left">Esqueceu a Senha?</a>
                        <button type="submit" onClick={handleSubmit} className="min-w-44 rounded-lg px-4 py-3 text-center text-base font-semibold text-white shadow-md outline-none bg-blue-500 hover:bg-blue-400 md:w-32">Iniciar Sessão</button>
                    </form>
                    <div className="py-12 text-center">
                        <p className="text-gray-600">
                            Não tenho uma conta?
                            <Link to="/Signup" className="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4">Criar Conta.</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative hidden rounded-bl-[80px] h-screen select-none lg:flex items-center justify-center bg-gradient-to-r pb-24 from-sky-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% md:block md:w-1/2">
                <div className="col-span-1 mt-16 hidden items-center justify-center lg:relative lg:flex">
                    <img className="w-3/4 rounded-2xl" src={img1} alt="header image" />
                    <img className="w-1/3 float absolute -top-10 -left-10 border-[1.5px] border-solid border-emerald-500 shadow-lg rounded-2xl" src={img2} alt="header image" />
                    <img className="w-1/3 float2 absolute top-56 left-[21rem] border-[1.5px] border-solid border-emerald-500 shadow-lg rounded-2xl" src={img3} alt="header image" />
                    <img className="w-1/3 rotate absolute top-40 rotate-12 left-[0rem]" src={img4} alt="header image" />
                </div>
            </div>
        </div>
    );
}
