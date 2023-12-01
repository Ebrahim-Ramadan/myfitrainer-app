import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faDumbbell, faHouse } from '@fortawesome/free-solid-svg-icons';
const Plans = () => {
    const plans = [
        { id: 1, icon: faHeart, title: "Personal Training", desc: "Customize your workout sets" },
        { id: 2, icon: faDumbbell, title: "Nutrition Plans", desc: "Healthy eating plans to achieve your goal." },
        { id: 3, icon: faHouse, title: "Virtual Training", desc: "Workout from the comfort of your home." },
    ];

    return (
        <div className='grid md:grid-cols-3 gap-6 sm:grid-cols-1 mt-12 md:mt-36 [&>*]:text-white'>
            {plans.map((plan) => (
                <div key={plan.id} className=' backdrop-blur-xl backdrop-grayscale rounded-lg border space-y-2 border-2 border-slate-400 p-4 opacity-80 flex flex-col'>
                    <div className='flex justify-between items-center px-1'>
                        <p className='text-xl font-bold'>{plan.title}</p>
                        <FontAwesomeIcon icon={plan.icon} style={{ width: '35px', color:'white' }} />
                    </div>
                    <p className='text-md px-2'>
                        {plan.desc}
                    </p>
                </div>
            ))}
           
        </div>
    );
};

export default Plans;
