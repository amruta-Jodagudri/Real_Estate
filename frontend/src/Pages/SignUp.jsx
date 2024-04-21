import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

export default function SignUp() {
    const [formData, setformData] = useState({});
    const [Error, setError] = useState(null);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.id]:e.target.value,
        });
    };
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            setloading(true)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                });
                const data = await res.json();
                if(data.success === false){
                    setError(data.message)
                    setloading(false)
                    return;
                }
                setloading(false)
                setError(null)
                navigate('/signIn')
                console.log(data);
        } catch (err) {
            setloading(false)
            setError(err.message)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
            <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
            <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
            <button disabled={loading} className='text-white bg-slate-700 p-3 rounded-lg uppercase hover:opacity-80'>{loading?'Loading...':'Sign Up'}</button>
            <OAuth/>
        </form>
        <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={"/signIn"}>
                <span className='text-blue-700'>Sign In</span>
            </Link>
        </div>
        {Error&&<p className='text-red-500 mt-5'>{Error}</p>}
        </div>
    )
}
