import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function EarnDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [newCard, setNewCard] = useState({ CarNumber: '', Description: '' });
    const [cards, setCards] = useState<{ id: string; CarNumber: string; Description: string; timestamp: string }[]>([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cards');
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, []);

    const handleAddCard = async () => {
        if (!newCard.CarNumber || !newCard.Description) {
            alert('Please provide both CarNumber and Description.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/cards', newCard);
            setCards([...cards, response.data]);
            setNewCard({ CarNumber: '', Description: '' });
        } catch (error) {
            console.error('Error adding card:', error);
            alert('Failed to add card. Please try again.');
        }
    };

    const handleSelectCard = (card: any) => {
        setSelectedCard(card);
    };


    const handleClaimCard = (card: any) => {
        try {

        } catch (error) {

        }
    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">
                Earn Details for Card ID: {id}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add New Card Form */}
                <div className="bg-white p-4 shadow-md rounded">
                    <h2 className="text-xl font-bold mb-4">Add a New Card</h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Car Number"
                            value={newCard.CarNumber}
                            onChange={(e) => setNewCard({ ...newCard, CarNumber: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <textarea
                            placeholder="Car Description"
                            value={newCard.Description}
                            onChange={(e) => setNewCard({ ...newCard, Description: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={handleAddCard}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Add Card
                        </button>
                    </div>
                </div>

                {/* Display Added Cards */}
                <div className="bg-white p-4 shadow-md rounded">
                    <h2 className="text-xl font-bold mb-4">Added Cards</h2>
                    {cards.length > 0 ? (
                        <ul className="space-y-2">
                            {cards.map((card) => (
                                <li key={card.id} className="p-4 bg-gray-50 shadow rounded" onClick={() => handleSelectCard(card)}>
                                    <h3 className="text-lg font-bold">{card.CarNumber}</h3>
                                    <p>{card.Description}</p>

                                    <p className="text-sm text-gray-500">Added on: {new Date(card.timestamp).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No cards added yet.</p>
                    )}
                </div>
            </div>
            {selectedCard && (
                <div className="mt-6 bg-white p-4 shadow-md rounded">
                    <h2 className="text-xl font-bold mb-4">Card Details</h2>
                    <div>
                        {/* {selectedCard.claimed ? (
                            <button
                                disabled
                                className="mt-4 w-full bg-gray-400 text-white p-2 rounded cursor-not-allowed"
                            >
                                Claimed
                            </button>
                        ) : (
                            <button
                                onClick={() => handleClaimCard(card.id)}
                                className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                            >
                                Claim
                            </button>
                        )} */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EarnDetails;
