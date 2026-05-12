import React, { useEffect, useState, useCallback } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);

  // تابع دیدن اعلان (با useCallback برای پایداری مرجع)
  const seeNotification = useCallback((notificationID) => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    let localStorageData;
    try {
      localStorageData = JSON.parse(userData);
    } catch (e) {
      console.error("خطا در parse localStorage", e);
      return;
    }
    const token = localStorageData?.token;
    if (!token) return;

    fetch(`http://localhost:5000/v1/notifications/see/${notificationID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("خطا در ثبت دیده شدن");
        return res.json();
      })
      .then(() => {
        // پس از موفقیت، آن اعلان را از لیست حذف می‌کنیم
        setAdminNotifications((prev) =>
          prev.filter((n) => n._id !== notificationID)
        );
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    let localStorageData;
    try {
      localStorageData = JSON.parse(userData);
    } catch (e) {
      console.error("خطا در parse localStorage", e);
      return;
    }
    const token = localStorageData?.token;
    if (!token) return;

    fetch(`http://localhost:5000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات کاربر");
        return res.json();
      })
      .then((data) => {
        setAdminInfo(data);
        setAdminNotifications(data.notifications || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []); // وابستگی خالی – فقط یک بار اجرا شود

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowNotificationsBox && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input type="text" className="search-bar" placeholder="جستجو..." />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.map((notification) => (
                  <li key={notification._id} className="home-notification-modal-item">
                    <span className="home-notification-modal-text">
                      {notification.msg}
                    </span>
                    <label className="switch">
                      <a
                        href="javascript:void(0)"
                        onClick={() => seeNotification(notification._id)}
                      >
                        دیدم
                      </a>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src={adminInfo.profile || "/default-avatar.png"} alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name || "کاربر"}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}