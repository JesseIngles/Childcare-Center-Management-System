import React, { useState, useEffect } from 'react';

export default function TableTurma() {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        async function fetchData() {
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
                console.log('Dados recebidos:', data); // Adicione este log para ver os dados recebidos
                setTurmas(data.resposta);
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="relative w-full mx-auto mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-100 uppercase bg-blue-600">
                    <tr>
                        <th scope="col" className="px-6 text-white py-3">
                            Turma
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Quantidade de Alunos
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Quantidade de Disciplinas
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Quantidade de Atividades
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {turmas.map((turma, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-200' : 'odd:bg-white'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {turma.nome}
                            </td>
                            <td className="px-6 text-gray-900 py-4">
                                {turma.quantidadeAlunos}
                            </td>
                            <td className="px-6 text-gray-900 py-4">
                                {turma.quantidadeDisciplina}
                            </td>
                            <td className="px-6 text-gray-900 py-4">
                                {turma.quantidadeAtividades}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
