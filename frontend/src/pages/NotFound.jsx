export default function NotFound(){
    return(
        <div className='h-screen w-screen flex justify-center items-center pl-45 bg-gradient-to-l from-fuchsia-300 to-violet-300'>
            <div className="h-50 w-100 text-center content-center">
                <h1 className='font-bold text-4xl text-red-600'>404 - Page Not Found</h1>
                <p className='font-normal text-lg'>Oops! The page you’re looking for doesn’t exist.</p>
            </div>
        </div>
    );
}