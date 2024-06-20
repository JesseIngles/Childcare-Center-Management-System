import React, { useState } from 'react';

export default function CDFuncionario() {
    const [formData, setFormData] = useState({
        nome: '',
        nif: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        senha: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.nif || !formData.email || !formData.telefone || !formData.dataNascimento || !formData.senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await fetch('http://localhost:5251/Funcionario/v1/CadastrarFuncionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'text/plain'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.mensagem === 'Sucesso') {
                alert('Funcionário cadastrado com sucesso!');
                setFormData({
                    nome: '',
                    nif: '',
                    email: '',
                    telefone: '',
                    dataNascimento: '',
                    senha: ''
                });
            } else {
                alert('Erro ao cadastrar funcionário: ' + data.mensagem);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar funcionário. Por favor, tente novamente.');
        }
    };
    

    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Adicionar novo Funcionario</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome do Funcionário</label>
                        <input 
                            type="text" 
                            id="nome" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="nif" className="block mb-2 text-sm font-medium text-gray-900">Identificação do Funcionário (NIF)</label>
                        <input 
                            type="text" 
                            id="nif" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            placeholder="NIF"
                            value={formData.nif}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                        <input 
                            type="tel" 
                            id="telefone" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            placeholder="Número Telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="dataNascimento" className="block mb-2 text-sm font-medium text-gray-900">Data de Nascimento</label>
                        <input 
                            type="date" 
                            id="dataNascimento" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            value={formData.dataNascimento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                        <input 
                            type="password" 
                            id="senha" 
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none" 
                            placeholder="Senha do Funcionario"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="min-w-44 rounded-lg px-4 py-3 text-center text-base font-semibold text-white shadow-md outline-none bg-blue-500 hover:bg-blue-400 md:w-full my-4"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
}
