import React, { useState, useEffect } from 'react';

export default function ListaEncarregado() {
    const [encarregados, setEncarregados] = useState([]);

    useEffect(() => {
        async function fetchData() {
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

        fetchData();
    }, []);

    return (
        <div class="relative w-full mx-auto mt-4 overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-100 uppercase bg-blue-600">
                    <tr>
                        <th scope="col" class="px-6 text-white py-3">
                            Nome do Encarregado
                        </th>
                        <th scope="col" class="px-6 text-white py-3">
                            Identificação
                        </th>
                        <th scope="col" class="px-6 text-white py-3">
                            Endereço
                        </th>
                        <th scope="col" class="px-6 text-white py-3">
                            Educandos
                        </th>
                        
                        <th scope="col" class="px-6 text-white py-3">
                            Opções
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {encarregados.map((encarregado, index) => (
                        <tr key={index} class={`${index % 2 === 0 ? 'odd:bg-white' : 'even:bg-gray-200'} border-b dark:border-gray-700`}>
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{encarregado.nome}</td>
                            <td class="px-6 text-gray-900 py-4">{encarregado.identificacao}</td>
                            <td class="px-6 text-gray-900 py-4">{encarregado.endereco}</td>
                            <td class="px-6 text-gray-900 py-4">{encarregado.educandos}</td>
                            <td class="px-6 text-gray-900 py-4">-</td>
                            <td class="px-6 text-gray-900 py-4 flex gap-2">
                                <a href="#" class="font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </a>
                                <a href="#" class="font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
