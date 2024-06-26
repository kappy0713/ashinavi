import Image from "next/image";
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const days = ['日', '月', '火', '水', '木', '金', '土'];

// バスの時刻表 4/3~
// 足利大学発(山前駅)
// const au_yama_schedule = ['10:25', '11:15', '11:55', '13:00', '15:25', '16:25', '17:05', '18:00'];
// 足利大学発(足利市駅)
const au_ashi_schedule = ['08:00', '09:40', '10:45', '11:25', '12:25', '13:25', '14:45', '15:25', '16:25', '18:00', '19:10'];

// 山前駅発
const yama_au_schedule = ['08:13', '08:30', '08:41', '09:21', '09:59', '10:21', '11:26', '12:18', '13:16', '14:16', '15:27', '16:08', '17:08'];
// 足利市駅発
const ashi_au_schedule = ['08:25', '09:05', '09:43', '10:05', '11:10', '12:02', '13:00', '14:00', '15:11', '15:52', '16:52'];


// 電車の時刻表
// 上から順に平日, 土曜日, 日曜日
// 山前駅発(高崎・桐生方面)
const yama_taka_schedule = ['06:54', '07:20', '07:53', '08:09', '08:25', '08:54', '09:51', '10:17', '11:08', '11:48', '12:48', '13:48', '14:48', '15:48', '16:50', '17:34', '18:12', '18:49', '19:16', '19:48', '20:20', '20:55', '21:26', '22:17', '23:06', '23:56'];
const sat_yama_taka_schedule = ['06:54', '07:20', '07:53', '08:09', '08:25', '08:54', '09:51', '10:17', '11:08', '11:48', '12:48', '13:48', '14:48', '15:48', '16:50', '17:34', '18:12', '18:49', '19:16', '19:48', '20:20', '20:55', '21:26', '22:17', '23:06', '23:56'];
const sun_yama_taka_schedule = ['06:54', '07:20', '07:53', '08:09', '08:25', '08:54', '09:51', '10:17', '11:08', '11:48', '12:48', '13:48', '14:48', '15:48', '16:50', '17:34', '18:12', '18:49', '19:16', '19:48', '20:20', '20:55', '21:26', '22:17', '23:06', '23:56'];
// 山前駅発(小山・足利方面)
const yama_oya_schedule = ['05:29', '06:02', '06:23', '06:39', '07:09', '07:53', '08:09', '09:05', '09:40', '10:39', '11:37', '12:37', '13:37', '14:37', '15:37', '16:10', '16:50', '17:34', '18;02', '18:34', '18:59', '19:37', '20:09', '20:45', '21:36', '22:39'];
const sat_yama_oya_schedule = ['05:29', '06:02', '06:23', '06:39', '07:09', '07:53', '08:09', '09:05', '09:40', '10:39', '11:37', '12:37', '13:37', '14:37', '15:37', '16:10', '16:50', '17:34', '18;02', '18:34', '18:59', '19:37', '20:09', '20:45', '21:36', '22:39'];
const sun_yama_oya_schedule = ['05:29', '06:02', '06:23', '06:39', '07:09', '07:53', '08:09', '09:05', '09:40', '10:39', '11:37', '12:37', '13:37', '14:37', '15:37', '16:10', '16:50', '17:34', '18;02', '18:34', '18:59', '19:37', '20:09', '20:45', '21:36', '22:39'];

// 足利市駅発(伊勢崎・太田方面)
const ashi_ise_schedule = ['05:18', '05:50', '06:11', '06:44', '07:04', '07:19', '07:33', '07:55', '08:12', '08:19', '08:43', '09:01', '09:18', '09:40', '10:04', '10:11', '10:51', '11:02', '11:30', '11:38', '11:52', '12:07', '12:25', '12:52', '13:07', '13:25', '13:52', '14:07', '14:26', '14:53', '15:06', '15:16', '15:50', '16:05', '16:15', '16:26', '16:37', '16:57', '17:12', '17:29', '17:38', '17:55', '18:08', '18:25', '18:34', '18:53', '19:02', '19:11', '19:26', '19:36', '19:57', '20:04', '20:12', '20:24', '20:33', '20:52', '21:02', '21:19', '21:33', '21:51', '22:14', '22:29', '22:39', '23:01', '23:08', '23:30', '23:46'];
const sat_ashi_ise_schedule = ['05:18', '05:50', '06:11', '06:44', '07:04', '07:19', '07:33', '07:55', '08:12', '08:19', '08:43', '09:01', '09:18', '09:40', '10:04', '10:11', '10:51', '11:02', '11:30', '11:38', '11:52', '12:07', '12:25', '12:52', '13:07', '13:25', '13:52', '14:07', '14:26', '14:53', '15:06', '15:16', '15:50', '16:05', '16:15', '16:26', '16:37', '16:57', '17:12', '17:29', '17:38', '17:55', '18:08', '18:25', '18:34', '18:53', '19:02', '19:11', '19:26', '19:36', '19:57', '20:04', '20:12', '20:24', '20:33', '20:52', '21:02', '21:19', '21:33', '21:51', '22:14', '22:29', '22:39', '23:01', '23:08', '23:30', '23:46'];
const sun_ashi_ise_schedule = ['05:18', '05:50', '06:11', '06:44', '07:04', '07:19', '07:33', '07:55', '08:12', '08:19', '08:43', '09:01', '09:18', '09:40', '10:04', '10:11', '10:51', '11:02', '11:30', '11:38', '11:52', '12:07', '12:25', '12:52', '13:07', '13:25', '13:52', '14:07', '14:26', '14:53', '15:06', '15:16', '15:50', '16:05', '16:15', '16:26', '16:37', '16:57', '17:12', '17:29', '17:38', '17:55', '18:08', '18:25', '18:34', '18:53', '19:02', '19:11', '19:26', '19:36', '19:57', '20:04', '20:12', '20:24', '20:33', '20:52', '21:02', '21:19', '21:33', '21:51', '22:14', '22:29', '22:39', '23:01', '23:08', '23:30', '23:46'];
// 足利市駅発(館林・浅草方面)
const ashi_tate_schedule = ['05:09', '05:34', '05:52', '05:56', '06:17', '06:32', '06:44', '06:51', '07:04', '07:17', '07:33', '07:39', '07:56', '08:02', '08:19', '08:33', '08:43', '09:01', '09:10', '09:23', '09:39', '09:55', '10:16', '10:26', '10:37', '10:51', '11:28', '11:38', '11:57', '12:26', '12:39', '12:57', '13:26', '13:39', '13:57', '14:26', '14:39', '14:53', '15:24', '15:37', '15:49', '16:04', '16:14', '16:37', '16:42', '17:04', '17:14', '17:37', '17:44', '18:06', '18:13', '18:34', '18:42', '19:02', '19:10', '19:27', '19:35', '19:48', '20:04', '20:24', '20:34', '20:53', '21:24', '21:51', '22:14', '22:52', '23:30'];
const sat_ashi_tate_schedule = ['05:09', '05:34', '05:52', '05:56', '06:17', '06:32', '06:44', '06:51', '07:04', '07:17', '07:33', '07:39', '07:56', '08:02', '08:19', '08:33', '08:43', '09:01', '09:10', '09:23', '09:39', '09:55', '10:16', '10:26', '10:37', '10:51', '11:28', '11:38', '11:57', '12:26', '12:39', '12:57', '13:26', '13:39', '13:57', '14:26', '14:39', '14:53', '15:24', '15:37', '15:49', '16:04', '16:14', '16:37', '16:42', '17:04', '17:14', '17:37', '17:44', '18:06', '18:13', '18:34', '18:42', '19:02', '19:10', '19:27', '19:35', '19:48', '20:04', '20:24', '20:34', '20:53', '21:24', '21:51', '22:14', '22:52', '23:30'];
const sun_ashi_tate_schedule = ['05:09', '05:34', '05:52', '05:56', '06:17', '06:32', '06:44', '06:51', '07:04', '07:17', '07:33', '07:39', '07:56', '08:02', '08:19', '08:33', '08:43', '09:01', '09:10', '09:23', '09:39', '09:55', '10:16', '10:26', '10:37', '10:51', '11:28', '11:38', '11:57', '12:26', '12:39', '12:57', '13:26', '13:39', '13:57', '14:26', '14:39', '14:53', '15:24', '15:37', '15:49', '16:04', '16:14', '16:37', '16:42', '17:04', '17:14', '17:37', '17:44', '18:06', '18:13', '18:34', '18:42', '19:02', '19:10', '19:27', '19:35', '19:48', '20:04', '20:24', '20:34', '20:53', '21:24', '21:51', '22:14', '22:52', '23:30'];


export default function Home() {
  const days = ['日', '月', '火', '水', '木', '金', '土'];

  const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timerID = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => {
        clearInterval(timerID);
      };
    }, []);

    // 現在の日時
    const today = new Date();

    // 曜日によって電車の時刻表を変更
    let yama_taka, yama_oya, ashi_ise, ashi_tate;
    if (today.getDay() === 0) {
      yama_taka = sun_yama_taka_schedule;
      yama_oya = sun_yama_oya_schedule;
      ashi_ise = sun_ashi_ise_schedule;
      ashi_tate = sun_ashi_tate_schedule;
    } else if (today.getDay() === 6) {
      yama_taka = sat_yama_taka_schedule;
      yama_oya = sat_yama_oya_schedule;
      ashi_ise = sat_ashi_ise_schedule;
      ashi_tate = sat_ashi_tate_schedule;
    } else {
      yama_taka = yama_taka_schedule;
      yama_oya = yama_oya_schedule;
      ashi_ise = ashi_ise_schedule;
      ashi_tate = ashi_tate_schedule;
    }

    // バスの時刻表ハンドラー
    const [BusOption, setBusOption] = useState('au');

    const BusChange = (event) => {
      setBusOption(event.target.value);
    };

    // 電車の時刻表ハンドラー
    // 山前駅発
    const [yama_TrainOption, yama_setTrainOptinon] = useState('taka')

    const yama_TrainChange = (event) => {
      yama_setTrainOptinon(event.target.value);
    }

    // 足利市駅発
    const [ashi_TrainOption, ashi_setTrainOptinon] = useState('ise')

    const ashi_TrainChange = (event) => {
      ashi_setTrainOptinon(event.target.value);
    }

    // 次のバス・電車までの時間を計算
    function NextTime(Schedule, time) {
      const nextTime = Schedule.find((Time) => {
        const [Hour, Minute] = Time.split(':').map(Number);
        const currentDate = new Date();
        currentDate.setHours(Hour, Minute, 0, 0);
        return currentDate > time;
      });

      let timeDiff = '本日の運行は終了';

      if (nextTime) {
        const [Hour, Minute] = nextTime.split(':').map(Number);
        const nextDate = new Date();
        nextDate.setHours(Hour, Minute, 0, 0);
        const diffSeconds = Math.round((nextDate.getTime() - time.getTime()) / 1000);
        const hours = Math.floor(diffSeconds / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        const Hours = String(hours).padStart(2, '0');
        const Min = String(minutes).padStart(2, '0');
        const Sec = String(seconds).padStart(2, '0');
        if (hours === 0) {
          timeDiff = `(${Min}:${Sec}後)`;
        } else {
          timeDiff = `(${Hours}:${Min}:${Sec}後)`;
        }
      }
      return timeDiff;
    }

    // それぞれの次の便の時刻
    const au_ashi_diff = NextTime(au_ashi_schedule, time);
    const yama_au_diff = NextTime(yama_au_schedule, time);
    const ashi_au_diff = NextTime(ashi_au_schedule, time);

    const yama_taka_diff = NextTime(yama_taka, time);
    const yama_oya_diff = NextTime(yama_oya, time);
    const ashi_ise_diff = NextTime(ashi_ise, time);
    const ashi_tate_diff = NextTime(ashi_tate, time);

    // 次のバス・電車の時刻表を取得
    function NextArrivalTime(schedule, time) {
      const nextTime = schedule.find((trainTime) => {
        const [hour, minute] = trainTime.split(':').map(Number);
        const currentDate = new Date();
        currentDate.setHours(hour, minute, 0, 0);
        return currentDate > time;
      });

      if (nextTime) {
        return `次の便は${nextTime}発`;
      } else {
        return '';
      }
    }
    // それぞれの次の便の時刻差分
    const au_ashi_time = NextArrivalTime(au_ashi_schedule, time);
    const yama_au_time = NextArrivalTime(yama_au_schedule, time);
    const ashi_au_time = NextArrivalTime(ashi_au_schedule, time);

    const yama_taka_time = NextArrivalTime(yama_taka, time);
    const yama_oya_time = NextArrivalTime(yama_oya, time);
    const ashi_ise_time = NextArrivalTime(ashi_ise, time);
    const ashi_tate_time = NextArrivalTime(ashi_tate, time);

    return (
      <>
        {/*
        <h2>
          {today.getFullYear()}/{today.getMonth() + 1}/{today.getDate()}(
          {days[today.getDay()]}) {time.toLocaleTimeString()}
        </h2>
        */}
        <h1 className='text-3xl m-2'>時刻表</h1>
        <h2 className="text-2xl underline m-2">バス</h2>
        <div className="pl-2">
          <select value={BusOption} onChange={BusChange} className='border-2 border-gray-600 rounded-md'>
            <option value="au">足利大学発</option>
            <option value="yama">山前駅発</option>
            <option value="ashi">足利市駅発</option>
          </select>

          {BusOption === 'au' && <h3 className='text-2xl'>{au_ashi_time}{au_ashi_diff}</h3>}
          {BusOption === 'yama' && <h3 className='text-2xl'>{yama_au_time}{yama_au_diff}</h3>}
          {BusOption === 'ashi' && <h3 className='text-2xl'>{ashi_au_time}{ashi_au_diff}</h3>}
        </div>
        <h2 className="text-2xl underline pl-2 pt-2">電車</h2>
        <h2 className='text-2xl pl-2'>山前駅発</h2>
        <div className="pl-2">
          <select value={yama_TrainOption} onChange={yama_TrainChange} className='border-2 border-gray-600 rounded-md'>
            <option value="taka">高崎・桐生方面</option>
            <option value="oya">小山・足利方面</option>
          </select>

          {yama_TrainOption === 'taka' && <h3 className='text-2xl'>{yama_taka_time}{yama_taka_diff}</h3>}
          {yama_TrainOption === 'oya' && <h3 className='text-2xl'>{yama_oya_time}{yama_oya_diff}</h3>}
        </div>
        <h2 className='text-2xl pl-2'>足利市駅発</h2>
        <div className="pl-2">
          <select value={ashi_TrainOption} onChange={ashi_TrainChange} className='border-2 border-gray-600 rounded-md'>
            <option value="ise">伊勢崎・太田方面</option>
            <option value="tate">館林・浅草方面</option>
          </select>

          {ashi_TrainOption === 'ise' && <h3 className='text-2xl pb-2'>{ashi_ise_time}{ashi_ise_diff}</h3>}
          {ashi_TrainOption === 'tate' && <h3 className='text-2xl pb-2'>{ashi_tate_time}{ashi_tate_diff}</h3>}
        </div>
        <a href="https://www.ashitech.ac.jp/access/bus-index.html" target='_blank' className='text-xl underline hover:text-blue-500 m-2'>バス時刻表</a>
      </>
    );
  };

  return (
    <>
      <header className='bg-gray-700 text-white p-4 flex justify-between fixed top-0 w-full z-10'>
        <div>
          <Link href="/">あしナビ</Link>
        </div>
        <div>
          <Link href="/">シラバス検索　</Link>
          <Link href="/about">あしナビの使い方</Link>
        </div>
      </header>
      <main className='flex flex-col sm:flex-row flex-grow min-h-screen pb-14 pt-16'>
        <div className='flex-grow'>
          <h1 className='text-3xl m-2 sm:w-1/2'>教育支援システム</h1>
          <a href="https://aug.manaba.jp/ct/home" target='_blank' className='flex justify-center items-center'><img src="/images/manaba.jpg" alt="manaba" className=""/></a>
          <a href="https://aitaasv.ashitech.ac.jp/aaa_web/cl0010.aspx" target='_blank' className='flex justify-center items-center'><img src="/images/aaa.jpg" alt="AAA" /></a>
        </div>
        <div className='flex-grow sm:w-1/2'>
          <Clock />
        </div>
      </main>
      <footer>
        <p className='bg-gray-700 text-white text-center p-2 fixed bottom-0 w-full'>© 2024 あしナビ</p>
      </footer>
    </>
  );
}