import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

export default function Projects() {
    return (
        <div className="h-screen">
            <div class="min-h-full">
                <header class=" shadow-sm ">
                    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-0">
                        <h1 class="text-3xl font-bold tracking-tight text-slate-400">Projects</h1>
                    </div>
                </header>
                <main>
                    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            class="relative rounded-md bg-emerald-600 pl-6 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-emerald-700 ring-inset hover:bg-emerald-700"
                        >
                            <MdAdd fontSize={18} className="absolute top-1/2 -translate-y-1/2 left-1 " />
                            New Project
                        </button>

                        {/* <!-- Content --> */}
                        <div className="flex flex-wrap justify-center w-[100] p-2 gap-3">

                            <div class="rounded-md shadow-lg bg-gray-600 grid mt-5 w-[30%]">

                                <article class="flex max-w-xl flex-col items-start justify-between py-5 px-5">
                                    <div class="flex items-center gap-x-4 text-xs">
                                        <time datetime="2020-03-16" class="text-gray-200 font-medium text-base">
                                            Project name
                                        </time>
                                        <button
                                            type="button"
                                            class="relative z-10 rounded-full bg-gray-50 px-3 py-1 font-medium text-slate-800 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div class="group relative">
                                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-slate-400">
                                            <a href="#">
                                                <span class="absolute inset-0"></span>
                                                Boost your conversion rate
                                            </a>
                                        </h3>
                                        <p class="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                                            Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae
                                            illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat
                                            consectetur nulla deserunt vel. Iusto corrupti dicta.
                                        </p>
                                    </div>
                                    <div class="relative mt-8 flex items-center gap-x-4">
                                        {/* <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-50"> */}
                                        <div class="text-sm leading-6">
                                            <p class="font-semibold text-gray-900">
                                                <a href="#">
                                                    <span class="absolute inset-0"></span>
                                                    Michael Foster
                                                </a>
                                            </p>
                                            <p class="text-slate-400">Co-Founder / CTO</p>
                                        </div>
                                    </div>
                                </article>

                            </div>
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
