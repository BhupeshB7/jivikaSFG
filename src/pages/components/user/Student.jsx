import React from 'react';
import { Link } from 'react-router-dom';
import {  FaUser, FaFileAlt, FaAward, FaChartBar, FaIdBadge, FaCalendarCheck, FaListAlt } from 'react-icons/fa';
const Student = () => {

    const iconMap = {
        'Attendance': <FaCalendarCheck />,       // Updated icon
        'Exam': <FaUser />,                     // Existing icon
        'Test': <FaFileAlt />,                  // Existing icon
        'IdCard': <FaIdBadge />,                 // Updated icon
        'Certificate': <FaAward />,              // Existing icon
        'Result': <FaChartBar />,                // Existing icon
        'Total Attendance': <FaListAlt />       // Updated icon
    };
    
    const works = [
        { name: 'Attendance', url: '/attendance', icon: iconMap['Attendance'] },
        { name: 'Exam', url: '/exam', icon: iconMap['Exam'] },
        { name: 'Test', url: '/test', icon: iconMap['Test'] },
        { name: 'IdCard', url: '/id-card', icon: iconMap['IdCard'] },
        { name: 'Certificate', url: '/certificate', icon: iconMap['Certificate'] },
        { name: 'Result', url: '/result', icon: iconMap['Result'] },
        { name: 'Total Attendance', url: '/total-attendance', icon: iconMap['Total Attendance'] },
    ];
    

    return (
        <div className='mt-5'>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-auto w-[90%] md:w-[70%] lg:w-[65%]">
                {works.map((work, index) => (
                    <Link
                        to={work.url}
                        key={index}
                        className={`work-card flex ${
                            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        } py-2 gap-3 items-center justify-between m-auto w-[100%] bg-gray-800 hover:bg-zinc-900 rounded-xl`}
                    >
                        <div className={`icon-container flex items-center justify-center text-4xl text-amber-200 bg-gray-900 w-100 h-100 p-5 px-7 ${
                            index % 2 === 0 ? 'rounded-r-full' : 'rounded-l-full'
                        }`}>
                            {work.icon}
                        </div>
                        <h2 className="px-6 text-xl font-bold text-white text-center md:text-2xl">
                            {work.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Student;
