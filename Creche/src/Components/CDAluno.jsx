import React, { useState, useEffect } from 'react';

export default function CDAluno() {
    const [formData, setFormData] = useState({
        nome: '',
        bi: '',
        dataNascimento: '',
        necessidadesEspeciais: '',
        turmaId: 0,
        encarregadosId: [0, 0]
    });
    const [encarregados, setEncarregados] = useState([]);
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        async function fetchEncarregados() {
            try {
                const response = await fetch('http://localhost:5251/Encarregado/v1/TodosEncarregados', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar encarregados');
                }

                const data = await response.json();
                setEncarregados(data.resposta);
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        async function fetchTurmas() {
            try {
                const response = await fetch('http://localhost:5251/Turma/v1/TodasTurmas', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar turmas');
                }

                const data = await response.json();
                setTurmas(data.resposta);
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        fetchEncarregados();
        fetchTurmas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'encarregado1' || name === 'encarregado2') {
            const updatedEncarregados = [...formData.encarregadosId];
            if (name === 'encarregado1') updatedEncarregados[0] = parseInt(value, 10);
            if (name === 'encarregado2') updatedEncarregados[1] = parseInt(value, 10);
            setFormData({ ...formData, encarregadosId: updatedEncarregados });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adjustedFormData = {
            ...formData,
            encarregadosId: formData.encarregadosId.filter(id => id > 0)
        };

        if (!adjustedFormData.nome || !adjustedFormData.bi || !adjustedFormData.dataNascimento || adjustedFormData.turmaId === 0) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5251/Aluno/v1/CadastrarAluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(adjustedFormData)
            });
            const data = await response.json();
            if (data.mensagem !== 'Sucesso') {
                throw new Error(data.mensagem || 'Erro ao cadastrar aluno');
            }
            alert('Aluno cadastrado com sucesso!');
            setFormData({
                nome: '',
                bi: '',
                dataNascimento: '',
                necessidadesEspeciais: '',
                turmaId: 0,
                encarregadosId: [0, 0]
            });
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar aluno. Por favor, tente novamente.');
        }
    };

    return (
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Adicionar novo Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome do Aluno</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                            placeholder="Nome"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="bi" className="block mb-2 text-sm font-medium text-gray-900">Identificação do Aluno</label>
                        <input
                            type="text"
                            id="bi"
                            name="bi"
                            value={formData.bi}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                            placeholder="BI/Cédula"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="dataNascimento" className="block mb-2 text-sm font-medium text-gray-900">Data Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                            placeholder="Data Nasc"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="encarregado1" className="block mb-2 text-sm font-medium text-gray-900">Filho de</label>
                        <select
                            id="encarregado1"
                            name="encarregado1"
                            value={formData.encarregadosId[0] || ''}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                        >
                            <option value="">Selecione um encarregado</option>
                            {encarregados.map((encarregado) => (
                                <option key={encarregado.id} value={encarregado.id}>{encarregado.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="encarregado2" className="block mb-2 text-sm font-medium text-gray-900">E de</label>
                        <select
                            id="encarregado2"
                            name="encarregado2"
                            value={formData.encarregadosId[1] || ''}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                        >
                            <option value="">Selecione um encarregado</option>
                            {encarregados.map((encarregado) => (
                                <option key={encarregado.id} value={encarregado.id}>{encarregado.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="necessidadesEspeciais" className="block mb-2 text-sm font-medium text-gray-900">Necessidades</label>
                        <textarea
                            id="necessidadesEspeciais"
                            name="necessidadesEspeciais"
                            value={formData.necessidadesEspeciais}
                            onChange={handleChange}
                            rows="8"
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                            placeholder="As necessidades do Aluno"
                        ></textarea>
                    </div>
                    <div className="w-full">
                        <label htmlFor="turmaId" className="block mb-2 text-sm font-medium text-gray-900">Turma</label>
                        <select
                            id="turmaId"
                            name="turmaId"
                            value={formData.turmaId || ''}
                            onChange={handleChange}
                            className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
                        >
                            <option value="">Selecione uma turma</option>
                            {turmas.map((turma) => (
                                <option key={turma.id} value={turma.id}>{turma.nome}</option>
                            ))}
                        </select>
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
