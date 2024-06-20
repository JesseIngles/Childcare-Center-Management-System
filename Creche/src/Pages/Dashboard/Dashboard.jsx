import { Link } from "react-router-dom";
import CDAluno from "../../Components/CDAluno";
import { useState } from "react";
import ListaAluno from "../../Components/TableAluno";
import AlunoList from "../../Components/TableAluno";
import CDFuncionario from "../../Components/CDFuncionario";
import ListaFuncionario from "../../Components/TableFunc";
import CDEncarregado from "../../Components/CDEncarregado";
import ListaEncarregado from "../../Components/TableEncarregado";
import ListaAtividades from "../../Components/TableAtividades";
import TableTurma from "../../Components/TableTurma";
import CDTurma from "../../Components/CDTurma";
import img1 from '../../assets/img/logo.jpg'

export default function Dashboard() {
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  
  const [create, setCreate] = useState(true);
  const [list, setList] = useState(false);

  const Filter = (e) => {
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    if (e == 1) {
      setActive1(true);
      return;
    } else if (e == 2) {
      setActive2(true);
      return;
    } else if (e == 3) {
      setActive3(true);
      return;
    } else if (e == 4) {
      setActive4(true);
      return;
    }
  };

  return (
    <div class="container mx-auto flex flex-col w-screen h-screen p-6">
      <div class="group bg-white rounded shadow-md relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-4">
        <div>
          <h1 className="w-80 text-xl">Centro Infantil - Vanessa Reys</h1>
        </div>
        <div class="hidden items-center justify-between gap-12  text-black md:flex">
          <button
            onClick={() => {
              Filter(1);
            }}
            class={`hover:border-blue-500 hover:text-blue-500 border-b border-solid font-extrabold py-4 text-lg ${
              active1 ? "border-blue-500 text-blue-500" : "border-transparent "
            }`}
          >
            Alunoss
          </button>
          <button
            onClick={() => {
              Filter(2);
            }}
            class={`hover:border-blue-500 hover:text-blue-500 border-b border-solid font-extrabold py-4 text-lg ${
              active2 ? "border-blue-500 text-blue-500" : "border-transparent "
            }`}
          >
            Funcionários
          </button>
          <button
            onClick={() => {
              Filter(3);
            }}
            class={`hover:border-blue-500 hover:text-blue-500 border-b border-solid font-extrabold py-4 text-lg ${
              active3 ? "border-blue-500 text-blue-500" : "border-transparent "
            }`}
          >
            {" "}
            Encarregados
          </button>
          <button
            onClick={() => {
              Filter(4);
            }}
            class={`hover:border-blue-500 hover:text-blue-500 border-b border-solid font-extrabold py-4 text-lg ${
              active4 ? "border-blue-500 text-blue-500" : "border-transparent "
            }`}
          >
            {" "}
            Turma
          </button>
        </div>
        <div class="hidden items-center gap-8 md:flex">
          <img src={img1} className="size-12 rounded-full bg-gray-500" />
          <Link
            to="/Login"
            onClick={() => {
              localStorage.removeItem("token");
            }}
            class="flex items-center text-sm font-extrabold  px-4 py-3 border-[1.5px] border-solid border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
          >
            Terminar Sessão
          </Link>
        </div>
        <button
          onclick="(() => { this.closest('.group').classList.toggle('open')})()"
          class="flex md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      {active1 == true && (
        <div>
          <div class="group bg-white mt-1 rounded shadow-md relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-2">
            <div class="hidden items-center justify-between gap-12  text-black md:flex">
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(true);
                  setList(false);
                }}
              >
                Adicionar
              </button>
              <span>/</span>
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(false);
                  setList(true);
                }}
              >
                Listagem
              </button>
              <span>/</span>
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(true);
                  setList(false);
                }}
              >
                {" "}
              </button>
            </div>
          </div>
          <section class="w-auto">
            {create == true && <CDAluno></CDAluno>}
            {list == true && <AlunoList></AlunoList>}
          </section>
        </div>
      )}

      {active2 == true && (
        <div>
          <div class="group bg-white mt-1 rounded shadow-md relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-2">
            <div class="hidden items-center justify-between gap-12  text-black md:flex">
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(true);
                  setList(false);
                }}
              >
                Adicionar
              </button>
              <span>/</span>
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(false);
                  setList(true);
                }}
              >
                Listagem
              </button>
              <span>/</span>
            </div>
          </div>
          <section class="w-auto">
            {create == true && <CDFuncionario></CDFuncionario>}
            {list == true && <ListaFuncionario></ListaFuncionario>}
          </section>
        </div>
      )}

      {active3 == true && (
        <div>
          <div class="group bg-white mt-1 rounded shadow-md relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-2">
            <div class="hidden items-center justify-between gap-12  text-black md:flex">
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(true);
                  setList(false);
                }}
              >
                Adicionar
              </button>
              <span>/</span>
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(false);
                  setList(true);
                }}
              >
                Listagem
              </button>
              <span>/</span>
              
            </div>
          </div>
          <section class="w-auto">
            {create == true && <CDEncarregado></CDEncarregado>}
            {list == true && <ListaEncarregado></ListaEncarregado>}
          </section>
        </div>
      )}

      {active4 == true && (
        <div>
          <div class="group bg-white mt-1 rounded shadow-md relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-2">
            <div class="hidden items-center justify-between gap-12  text-black md:flex">
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(true);
                  setList(false);
                }}
              >
                Adicionar
              </button>
              <span>/</span>
              <button
                class="hover:underline text-sm font-extrabold"
                onClick={() => {
                  setCreate(false);
                  setList(true);
                }}
              >
                Listagem
              </button>
              <span>/</span>
            </div>
          </div>
          <section class="w-auto">
            {create == true && <CDTurma></CDTurma>}
            {list == true && <TableTurma></TableTurma>}
          </section>
        </div>
      )}

      
    </div>
  );
}
