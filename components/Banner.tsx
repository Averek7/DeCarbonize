import React from 'react'
import LottieCard from './LottieCard'
import { useRouter } from 'next/router';

function Banner() {
    const router = useRouter();

    const handleStartEarning = () => {
        router.push('/earn'); 
    };

    const handleCarbonCredits = () => {
        router.push('/credits')
    }
    return (
        <>
            <div className="flex flex-col md:flex-row h-full">
                {/* Left Partition */}
                <div className="flex-1 bg-green-100 p-4 flex flex-col justify-center items-center">
                    <LottieCard src="https://lottie.host/1965c5ce-8dbb-4672-9cfc-e3f2c4f267f3/MafRYGuVzY.json" />

                    <h1 className="text-2xl font-bold text-green-800 mb-4">
                        Earn or Save Carbon Coins
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        Take actions to reduce your carbon footprint and earn Carbon Coins as rewards.
                    </p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700" onClick={handleStartEarning}>
                        Start Earning
                    </button>
                </div>

                {/* Right Partition */}
                <div className="flex-1 bg-blue-100 p-4 flex flex-col justify-center items-center">
                    <LottieCard src="https://lottie.host/a21c23de-6842-4d4d-a8f8-30a861d53950/REyFwk1Wc2.json" />


                    <h1 className="text-2xl font-bold text-blue-800 mb-4">
                        Buy Carbon Credits
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        Offset your carbon emissions by purchasing certified carbon credits.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">
                        Buy Now
                    </button>
                </div>
            </div>

        </>
    )
}

export default Banner