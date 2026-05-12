import React, { useCallback, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import AuthContext from './context/authContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);        // بهتر است null باشد نه false
  const [userInfos, setUserInfos] = useState(null);
  const router = useRoutes(routes);

  const login =(userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem('user', JSON.stringify({ token }));
  };

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    setUserInfos(null);
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    // دریافت داده از localStorage با مدیریت خطای JSON
    const rawUser = localStorage.getItem('user');
    let localStorageData = null;
    if (rawUser) {
      try {
        localStorageData = JSON.parse(rawUser);
      } catch (e) {
        console.error('خطا در解析 localStorage', e);
        localStorage.removeItem('user');
      }
    }

    // فقط اگر توکن وجود دارد، درخواست بزن
    if (localStorageData && localStorageData.token) {
      fetch('http://localhost:5000/v1/auth/me', {   // اصلاح آدرس (دو اسلش)
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorageData.token}`  // اصلاح املای Authorization
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('توکن نامعتبر');
          return res.json();
        })
        .then(data => {
          setUserInfos(data);
          setToken(localStorageData.token);
          setIsLoggedIn(true);
          console.log('اطلاعات کاربر:', data);
        })
        .catch(err => {
          console.error('خطا در اعتبارسنجی:', err);
          logout(); // توکن نامعتبر -> خروج
        });
    } else {
      console.log('هیچ توکنی در localStorage یافت نشد');
    }
  }, [logout]); // فقط یک بار اجرا شود

  return (
    <div>
      <AuthContext.Provider value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout
      }}>
        {router}
      </AuthContext.Provider>
    </div>
  );
}