import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { SignOutUserFailure, SignOutUserStart, SignOutUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';

//firebase storage
// allow read;
// allow write:if
// request.resource.size<2*1024*1024 &&
// request.resource.contentType.matches('image/.*');

export default function Profile() {

    const fileRef = useRef(null)
    const {currentUser,loading,error} = useSelector((state)=>state.user)
    const [File, setFile] = useState(undefined);
    const [filePerc, setfilePerc] = useState(0);
    const [FileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setupdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    console.log(formData);
    
    useEffect(() => {
        if(File){
            handleFileUpload(File);
        }
    }, [File]);

    const handleFileUpload = (File)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + File.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,File);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setfilePerc(Math.round(progress))
                },
                (error) => {
                    setFileUploadError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                        setFormData({ ...formData, avatar: downloadURL })
                );
            }
        );
    }

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setupdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            Navigate('/signup');
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignout =async()=>{
        try {
            dispatch(SignOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();

            if(data.success === false){
                dispatch(SignOutUserFailure(data.message));
                return;
            }
            dispatch(SignOutUserSuccess(data));
            Navigate('/signup');
        } catch (error) {
            dispatch(SignOutUserFailure(data.message));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/.*'/>
            <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt='profile'
                className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
                <p className='text-sm self-center'>
                    {FileUploadError ? (
                        <span className='text-red-700'>
                        Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700 text-xl'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p>
                <input type='text' defaultValue={currentUser.username} placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
                <input type='email' defaultValue={currentUser.email} placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
                <button
                    className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                    Update
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>

            <p className='text-green-700 mt-5'>{updateSuccess ? 'User updated successfully' : ''}</p>
        </div>
    )
}
