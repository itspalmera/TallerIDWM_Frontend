// Mantiene la lógica de negocio de la página de inicio de sesión (Axios)
export const LoginPage = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Lado Izquierdo */}
            <div className="md:w-1/2 w-full bg-purple-600 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl md:text-[40px] l font-bold mb-12 text-center">
                    Bienvenido a BlackCat
                </h1>
                <p className="text-2xl md:text-[30px] text-center">
                    Tu tienda favorita con los productos que necesitas al menor precio y mayor calidad
                </p>
            </div>

            {/* Lado Derecho */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-center">
                        BlackCat
                    </h2>
                    <h3 className="text-2xl md:text-[30px] font-semibold mb-4 text-center">
                        Iniciar Sesión
                    </h3>

                    <form className="space-y-4">
                        <p className="text-[20px] font-semibold mb-4 text-center md:text-left">
                            Correo Electrónico
                        </p>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />

                        <p className="text-[20px] font-semibold mb-4 text-center md:text-left">
                            Contraseña
                        </p>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />    

                        <button 
                        type="submit"
                        className="w-full text-[20px] text-center bg-gray-800 text-white hover:bg-gray-900 py-3 rounded-md">
                            Iniciar Sesión
                        </button>
                        
                    </form>

                    <div className="m-4 text-sm text-gray-600 text-center md:text-center"> 
                        ¿No tienes cuenta? {' '}
                        <a href="#" className=" text-blue-600 hover:text-blue-800 font-semibold">
                            Regístrate
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}