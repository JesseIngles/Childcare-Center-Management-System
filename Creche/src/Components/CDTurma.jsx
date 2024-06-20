import React, { useState } from 'react';

export default function CDTurma() {
  const [nome, setNome] = useState('');

  const handleChange = (e) => {
    setNome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome) {
      alert('Por favor, preencha o nome da turma.');
      return;
    }

    const data = { nome };

    try {
      const response = await fetch('http://localhost:5251/Turma/v1/CadastrarTurma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar turma');
      }

      const result = await response.json();
      if (result.mensagem !== 'Sucesso') {
        throw new Error(result.mensagem || 'Erro ao cadastrar turma');
      }

      alert('Turma cadastrada com sucesso!');
      setNome('');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar turma. Por favor, tente novamente.');
    }
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Adicionar uma Turma
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome da Turma
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={handleChange}
              className="w-full flex-shrink appearance-none border-[1px] border-solid rounded-lg border-gray-400 bg-white/60 py-3 px-3 text-base text-gray-700 placeholder-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Nome"
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
