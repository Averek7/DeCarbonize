import { useRouter } from 'next/router';
import React from 'react';

function Earn() {
    const router = useRouter();
    
    const handleProceed = (id: number) => {
        router.push(`/earns/${id}`); 
    };

    const cardData = [
        { id: 1, title: 'Reduce Electricity Usage', description: 'Save energy and earn Carbon Coins.' },
        { id: 2, title: 'Plant a Tree', description: 'Plant trees to offset carbon emissions.' },
        { id: 3, title: 'Switch to Renewable Energy', description: 'Switch to solar or wind energy sources.' },
    ];


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-left mb-6">Earnings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardData.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center text-center"
                    >
                        <h2 className="text-xl font-bold text-green-700 mb-2">{card.title}</h2>
                        <p className="text-gray-600 mb-4">{card.description}</p>
                        <button
                            onClick={() => handleProceed(card.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Proceed
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Earn;