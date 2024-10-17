
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [profileInfo, setProfileInfo] = useState({});


  const [userData, setUserData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [formError, setFormError] = useState({
    confirmPasswordMsg: '',

  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (userData.password !== userData.confirmPassword) {
        setFormError({
            confirmPasswordMsg: "Пароли не совпадают",
        });
        return;
    }

    try {
      const confirmDelete = window.confirm('Are you sure want to reset password?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        const res = await UserService.resetPassword(userId, userData, token);
        console.log(res)
        // Redirect to profile page or display a success message
        navigate("/admin/user-management")
      }

    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error)
    }
  };


  return (
    <div className="auth-container">
        <h2>Сброс пороля</h2>
        <p>ФИО: {profileInfo.name}</p>
        <p>Почта: {profileInfo.email}</p>
        <br></br>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>Новый пароль:</label>
            <input type="text" name="password" value={userData.password} onChange={handleInputChange} required/>
            </div>
            <div className="form-group">
            <label>Потвердите пароль:</label>
            <input type="text" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} required/>
            <p className='error-msg' style={{ color: 'red' }}>{formError.confirmPasswordMsg}</p>
            </div>
            <button type="submit">Обновить пароль </button>
        </form>
    </div>
  );
}

export default ResetPasswordPage;
