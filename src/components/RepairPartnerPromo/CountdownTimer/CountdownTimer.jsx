import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';
import './CountdownTimerMedia.css';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = new Date(targetDate) - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="promo-countdown">
            <p className="countdown-title">До открытия осталось:</p>
            <div className="countdown-timer">
                <div className="countdown-item">
                    <span>{timeLeft.days}</span>
                    <p>Дней</p>
                </div>
                <div className="countdown-item">
                    <span>{timeLeft.hours}</span>
                    <p>Часов</p>
                </div>
                <div className="countdown-item">
                    <span>{timeLeft.minutes}</span>
                    <p>Минут</p>
                </div>
                <div className="countdown-item">
                    <span>{timeLeft.seconds}</span>
                    <p>Секунд</p>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
