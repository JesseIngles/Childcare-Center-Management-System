import img1 from '../assets/img/unnamed.jpg'
import img2 from '../assets/img/18914.webp'
import img3 from '../assets/img/images.jpeg'
import img4 from '../assets/img/Letters.png'
import { } from '../assets/css/componentsExtraStyles.css'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div class="container mx-auto flex flex-col w-screen h-screen p-6">
            <div class="group relative flex w-full shrink-0 px-12 flex-wrap items-center justify-between py-7">
                <div>
                    <h1 className="w-80 text-xl">Centro Infantil - Vanessa Ray's</h1>
                </div>
                <div
                    class="hidden items-center justify-between gap-12  text-black md:flex"
                >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Página Incial</a>
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Regulamentos</a
                    >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Contatos </a>
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Acerca</a>
                </div>
                <div class="hidden items-center gap-8 md:flex">
                    <Link to="/Signup"
                        class="bg-blue-500 flex items-center rounded-lg text-white px-4 py-3 text-sm font-medium  transition hover:bg-opacity-80 focus:bg-opacity-70"
                    >
                        Fazer Cadastro
                    </Link>
                    <Link to="/Login" class="flex items-center text-sm font-medium  px-4 py-3 border-[1.5px] border-solid border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white rounded-lg">
                        Iniciar Sessão
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
                <div
                    class="absolute top-full flex max-h-0 w-full flex-col items-start justify-center gap-3 overflow-hidden rounded-2xl bg-white px-4 shadow-main transition-all duration-300 ease-in-out group-[.open]:max-h-64 group-[.open]:py-4 md:hidden"
                >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Página Incial</a
                    >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Regulamentos</a
                    >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Contatos</a
                    >
                    <a
                        class="hover:underline text-sm font-medium"
                        href="#"
                    >Acerca de</a
                    >
                    <button class="flex items-center text-sm font-medium text-black">
                        Log In
                    </button>
                    <button
                        class="flex items-center rounded-xl bg-purple-blue-100 bg-purple-blue-100 px-4 py-2 text-sm font-medium text-purple-blue-500 text-purple-blue-600 transition hover:bg-opacity-80 focus:bg-opacity-70"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <div
                class="my-auto mb-8 mt-8 px-12 w-[95%] mx-auto grid-cols-1 bg-gradient-to-r pb-24 from-sky-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  py-16 rounded-3xl justify-center md:flex md:gap-5 lg:grid lg:grid-cols-2"
            >
                <div
                    class="col-span-1 flex flex-col justify-center text-center md:w-3/5 lg:w-full lg:justify-center lg:text-left"
                >
                    <div class="mb-4 flex items-center justify-center lg:justify-start">
                        <h4 class="ml-2 text-sm font-bold tracking-widest text-white ">
                            Junte-se à Nossa Família!
                        </h4>
                    </div>
                    <h1
                        class="mb-8 text-4xl font-extrabold leading-tight text-emerald-100 lg:text-5xl xl:w-11/12 xl:text-6xl"
                    >
                        Estamos com inscrições abertas para novas turmas!
                    </h1>
                    <p
                        class="mb-10 text-base font-medium leading-7 text-white xl:w-3/4"
                    >
                        Venha conhecer nossa creche e descubra como podemos contribuir para o desenvolvimento do seu filho.
                    </p>
                    <div class="flex flex-col items-center lg:flex-row">
                        <button
                            class="flex items-center rounded-xl bg-blue-500 px-5 hover:bg-blue-400 py-4 text-sm font-medium text-white transition hover:bg-purple-blue-600 focus:bg-purple-blue-700"
                        >
                            Sobre a Creche
                        </button>
                        <button
                            class="flex items-center rounded-xl mx-4 px-5 py-4 text-sm font-medium border-[1.5px] hover:bg-white/75 hover:text-gray-950 border-solid border-[white] text-[white] "
                        >
                            Fale connosco
                        </button>
                    </div>
                </div>
                <div class="col-span-1 hidden items-center justify-center lg:relative lg:flex">
                    <img
                        class="w-3/4 rounded-2xl"
                        src={img1}
                        alt="header image"
                    />
                    <img
                        class="w-1/3 float absolute -top-2 -left-10 border-[1.5px] border-solid border-emerald-500 shadow-lg rounded-2xl"
                        src={img2}
                        alt="header image"
                    />
                    <img
                        class="w-1/3 float2 absolute top-80 left-[28rem] border-[1.5px] border-solid border-emerald-500 shadow-lg rounded-2xl"
                        src={img3}
                        alt="header image"
                    />
                    <img
                        class="w-1/3 rotate absolute top-60 rotate-12 left-[0rem]"
                        src={img4}
                        alt="header image"
                    />
                </div>
            </div>


            <footer class="bg-white rounded-lg m-4">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-3xl">Creche - Vanessa Ray's</h1>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Acerca</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Politicas de Privacidade</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline me-4 md:me-6">Lincenças e Documentos</a>
                            </li>
                            <li>
                                <a href="#" class="hover:underline">Contato</a>
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-t-2 border-solid border-gray-200 sm:mx-auto  lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Creche Vanessa Ray's. Todos Direitos Reservados.</span>
                </div>
            </footer>


        </div>
    )
}