import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';

export default function SignIn() {
    const [formData, setformData] = useState({});
    const {loading,Error}=useSelector((state)=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.id]:e.target.value,
        });
    };
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                });
                const data = await res.json();
                if(data.success === false){
                    dispatch(signInFailure(data.message));
                    return;
                }
                dispatch(signInSuccess(data));
                navigate('/')
                console.log(data);
        } catch (err) {
            dispatch(signInFailure(err.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
            <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
            <button disabled={loading} className='text-white bg-slate-700 p-3 rounded-lg uppercase hover:opacity-80'>{loading?'Loading...':'Sign In'}</button>
            <OAuth/>
        </form>
        <div className="flex gap-2 mt-5">
            <p>Don't Have an account?</p>
            <Link to={"/signup"}>
                <span className='text-blue-700'>Sign Up</span>
            </Link>
        </div>
        {Error&&<p className='text-red-500 mt-5'>{Error}</p>}
        </div>
    )
}
