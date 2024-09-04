import React from 'react';
import './Profile.css'; // Убедитесь, что файл Profile.css находится в вашем проекте

const Profile = () => {
    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-icon"></div>
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-count">1,487</span>
                        <span className="stat-name">Публикации</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-count">898</span>
                        <span className="stat-name">Подписчики</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-count">1,310</span>
                        <span className="stat-name">Подписки</span>
                    </div>
                </div>
                <div className="profile-details">
                    <h1 className="profile-username">GloryANT</h1>
                    <p className="profile-bio">Ваш дом графического дизайна</p>
                    <a href="http://gloryant.net" className="profile-link">gloryant.net</a>
                </div>
            </div>
        </div>
    );
};

export default Profile;
