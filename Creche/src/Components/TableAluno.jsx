import React, { useState, useEffect } from 'react';

export default function ListaAluno() {
    const [alunos, setAlunos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAluno, setCurrentAluno] = useState({
        id: '',
        nome: '',
        bi: '',
        dataNascimento: '',
        necessidadesEspeciais: '',
        turmaId: 0,
        encarregados: ['', '']
    });

    // Função para deletar um aluno
    const handleDelete = async (id) => {
        console.log(`Tentando deletar aluno com ID: ${id}`); // Log de depuração
        try {
            const response = await fetch(`http://localhost:5251/Aluno/v1/ApagarAluno?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'text/plain'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar aluno');
            }

            // Atualizar a lista de alunos após a exclusão
            setAlunos(alunos.filter(aluno => aluno.id !== id));
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    };

    // Função para abrir o modal de edição com os dados do aluno
    const handleEdit = (aluno) => {
        setCurrentAluno(aluno);
        setIsEditing(true);
    };

    // Função para salvar os dados atualizados do aluno
    const handleSave = async (updatedAluno) => {
        console.log(updatedAluno);
        try {
            const response = await fetch(`http://localhost:5251/Aluno/v1/AtualizarAluno?id=${updatedAluno.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                },
                body: JSON.stringify(updatedAluno)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar aluno');
            }

            setAlunos(alunos.map(aluno => (aluno.id === updatedAluno.id ? updatedAluno : aluno)));
            setIsEditing(false);
        } catch (error) {
            console.error('Erro ao atualizar:', error);
        }
    };

    // Função para fechar o modal de edição
    const handleClose = () => {
        setIsEditing(false);
    };

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:5251/Aluno/v1/TodosAlunos', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar alunos');
                }

                const data = await response.json();
                setAlunos(data.resposta);
            } catch (error) {
                console.error('Erro:', error);
            }
        }

        fetchData();
    }, []);

    // Componente do modal para edição
    const EditModal = ({ aluno, onSave, onClose }) => {
        const [formData, setFormData] = useState(aluno);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
            handleSave(formData);
            
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Editar Aluno</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome do Aluno</label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="bi" className="block mb-2 text-sm font-medium text-gray-900">Identificação</label>
                                <input
                                    type="text"
                                    id="bi"
                                    name="bi"
                                    value={formData.identificacao}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="dataNascimento" className="block mb-2 text-sm font-medium text-gray-900">Data de Nascimento</label>
                                <input
                                    type="date"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    value={formData.data_de_Nascimento.split('T')[0]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="necessidadesEspeciais" className="block mb-2 text-sm font-medium text-gray-900">Necessidades Especiais</label>
                                <textarea
                                    id="necessidadesEspeciais"
                                    name="necessidadesEspeciais"
                                    value={formData.necessidadesEspeciais}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="turmaId" className="block mb-2 text-sm font-medium text-gray-900">Turma ID</label>
                                <input
                                    type="number"
                                    id="turmaId"
                                    name="turmaId"
                                    value={formData.identificacao}
                                    onChange={handleChange}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="encarregados1" className="block mb-2 text-sm font-medium text-gray-900">Pai</label>
                                <input
                                    type="text"
                                    id="encarregados1"
                                    name="encarregados1"
                                    value={formData.encarregados[0]}
                                    onChange={(e) => {
                                        const updatedEncarregados = [...formData.encarregados];
                                        updatedEncarregados[0] = e.target.value;
                                        setFormData({ ...formData, encarregados: updatedEncarregados });
                                    }}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="encarregados2" className="block mb-2 text-sm font-medium text-gray-900">Mãe</label>
                                <input
                                    type="text"
                                    id="encarregados2"
                                    name="encarregados2"
                                    value={formData.encarregados[1]}
                                    onChange={(e) => {
                                        const updatedEncarregados = [...formData.encarregados];
                                        updatedEncarregados[1] = e.target.value;
                                        setFormData({ ...formData, encarregados: updatedEncarregados });
                                    }}
                                    className="w-full border border-gray-400 rounded-lg py-2 px-3"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full mx-auto mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-100 uppercase bg-blue-600">
                    <tr>
                        <th scope="col" className="px-6 text-white py-3">
                            Nome do Aluno
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Identificação
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Data de Nascimento
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Pai
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Mãe
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Necessidades
                        </th>
                        <th scope="col" className="px-6 text-white py-3">
                            Opções
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'odd:bg-white' : 'even:bg-gray-200'} border-b dark:border-gray-700`}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{aluno.nome}</td>
                            <td className="px-6 text-gray-900 py-4">{aluno.identificacao}</td>
                            <td className="px-6 text-gray-900 py-4">{new Date(aluno.data_de_Nascimento).toLocaleDateString()}</td>
                            <td className="px-6 text-gray-900 py-4">{aluno.encarregados[0]}</td>
                            <td className="px-6 text-gray-900 py-4">{aluno.encarregados[1]}</td>
                            <td className="px-6 text-gray-900 py-4">{aluno.necessidadesEspeciais}</td>
                            <td className="px-6 text-gray-900 py-4 flex gap-2">
                                <button onClick={() => handleEdit(aluno)} className="font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                                <button onClick={(e) => { e.preventDefault(); handleDelete(aluno.id); }} className="font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <EditModal
                    aluno={currentAluno}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
