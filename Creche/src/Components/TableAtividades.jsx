import React, { useState, useEffect } from 'react';

export default function ListaAtividades() {
    const [atividades, setAtividades] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5251/Atividade/v1/Atividades', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar atividades');
                }

                const data = await response.json();
                setAtividades(data.resposta);
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="relative w-full mx-auto mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-100 uppercase bg-blue-600">
                    <tr>
                        <th scope="col" className="px-6 text-white py-3">
                            Título
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Descrição
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Nome
                        </th>
                        {/* Adicione mais colunas conforme necessário */}
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'odd:bg-white' : 'even:bg-gray-200'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{atividade.titulo}</td>
                            <td className="px-6 text-gray-900 py-4">{atividade.descricao}</td>
                            <td className="px-6 text-gray-900 py-4">{atividade.nome}</td>
                            {/* Adicione mais colunas conforme necessário */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
