import React from 'react'

function Contact() {
    return (
        <div className='flex flex-col py-5 bg-gray-500 min-h-screen text-white p-4'>
                <div className='text-xl md:text-3xl font-bold py-4' >
                <h1>Any Query ? <span className='text-green-400'>Feel free to Ask!</span>  </h1>

                </div>
                <p className='text-xl md:text-xl font-bold'>
                    We are here to help you!
                </p>
                
                <div name='contact' className='pt-10 border-green-500 color-content text-gray-800 flex justify-center items-center p-2'>
                    <form method='POST' action="https://getform.io/f/95a757b5-53ec-4c8a-898b-332f059c2b0d" className='flex flex-col max-w-[600px] w-full'>
                        <div className='pb-2'>
                            <p className='text-4xl font-bold inline border-b-4 border-green-500 text-white '>Contact Us</p>
                            <p className='text-black-800 py-4'> Submit the form below to email</p>
                        </div>
                        <input className='bg-gray-100 p-2' type="text" placeholder='Name' name='name' />
                        <input className='my-4 p-2 bg-gray-100' type="email" placeholder='Email' name='email' />
                        <textarea className='bg-gray-100 p-2' name="message" rows="10" placeholder='Message'></textarea>
                        <button className='ext-black-300 border-green-500 border-2 hover:bg-green-500 hover:border-green-500 px-4 py-3 my-8 mx-auto flex items-center'>Send</button>
                    </form>
                </div>

                
                
                
        </div>
    )
}

export default Contact