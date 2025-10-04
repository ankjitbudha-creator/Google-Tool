// FIX: Import 'useCallback' from React to resolve 'Cannot find name' error.
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PencilIcon, TrashIcon, PlayIcon, ArrowPathIcon, ArrowUturnLeftIcon } from '../../components/Icons';

// Types
interface Card {
  id: string;
  front: string;
  back: string;
}

interface Deck {
  id: string;
  name: string;
  cards: Card[];
}

// Main Component
export const FlashCardMaker: React.FC = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [view, setView] = useState<'decks' | 'edit' | 'study'>('decks');
    const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
    const [newDeckName, setNewDeckName] = useState('');

    // Load decks from localStorage on mount
    useEffect(() => {
        try {
            const savedDecks = localStorage.getItem('flashcardDecks');
            if (savedDecks) {
                setDecks(JSON.parse(savedDecks));
            }
        } catch (error) {
            console.error("Failed to load decks from localStorage", error);
        }
    }, []);

    // Save decks to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('flashcardDecks', JSON.stringify(decks));
        } catch (error) {
            console.error("Failed to save decks to localStorage", error);
        }
    }, [decks]);

    const activeDeck = useMemo(() => decks.find(d => d.id === activeDeckId), [decks, activeDeckId]);

    const handleCreateDeck = () => {
        if (newDeckName.trim()) {
            const newDeck: Deck = {
                id: Date.now().toString(),
                name: newDeckName.trim(),
                cards: [],
            };
            setDecks([...decks, newDeck]);
            setNewDeckName('');
        }
    };

    const handleDeleteDeck = (deckId: string) => {
        if (window.confirm('Are you sure you want to delete this deck and all its cards?')) {
            setDecks(decks.filter(d => d.id !== deckId));
        }
    };

    const handleUpdateDeck = (updatedDeck: Deck) => {
        setDecks(decks.map(d => d.id === updatedDeck.id ? updatedDeck : d));
    };

    const switchView = (newView: 'decks' | 'edit' | 'study', deckId?: string) => {
        setActiveDeckId(deckId || null);
        setView(newView);
    };

    switch (view) {
        case 'edit':
            return activeDeck ? <DeckEditView deck={activeDeck} onUpdateDeck={handleUpdateDeck} onBack={() => switchView('decks')} /> : null;
        case 'study':
            return activeDeck ? <StudyView deck={activeDeck} onBack={() => switchView('decks')} /> : null;
        default:
            return (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Flashcard Decks</h2>
                    <div className="flex gap-2 p-4 border rounded-lg dark:border-gray-700">
                        <input
                            type="text"
                            value={newDeckName}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            placeholder="New deck name..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-gray-700"
                        />
                        <button onClick={handleCreateDeck} className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover">Create</button>
                    </div>
                    <div className="space-y-3">
                        {decks.map(deck => (
                            <div key={deck.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                                <div>
                                    <p className="font-semibold text-lg">{deck.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{deck.cards.length} cards</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => switchView('study', deck.id)} className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600" title="Study"><PlayIcon className="w-5 h-5"/></button>
                                    <button onClick={() => switchView('edit', deck.id)} className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" title="Edit"><PencilIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleDeleteDeck(deck.id)} className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600" title="Delete"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                        ))}
                         {decks.length === 0 && <p className="text-center text-gray-500 py-8">No decks yet. Create one to get started!</p>}
                    </div>
                </div>
            );
    }
};

// DeckEditView Component
const DeckEditView: React.FC<{ deck: Deck, onUpdateDeck: (deck: Deck) => void, onBack: () => void }> = ({ deck, onUpdateDeck, onBack }) => {
    const [cards, setCards] = useState<Card[]>(deck.cards);
    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

    const handleAddCard = () => {
        if (newFront.trim() && newBack.trim()) {
            const newCard: Card = { id: Date.now().toString(), front: newFront, back: newBack };
            const updatedCards = [...cards, newCard];
            setCards(updatedCards);
            onUpdateDeck({ ...deck, cards: updatedCards });
            setNewFront('');
            setNewBack('');
        }
    };
    
    const handleDeleteCard = (cardId: string) => {
        const updatedCards = cards.filter(c => c.id !== cardId);
        setCards(updatedCards);
        onUpdateDeck({ ...deck, cards: updatedCards });
    };

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="flex items-center gap-2 text-primary font-semibold hover:underline">
                <ArrowUturnLeftIcon className="w-5 h-5"/> Back to Decks
            </button>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Editing: {deck.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg dark:border-gray-700">
                <textarea value={newFront} onChange={e => setNewFront(e.target.value)} placeholder="Front of card..." rows={3} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
                <textarea value={newBack} onChange={e => setNewBack(e.target.value)} placeholder="Back of card..." rows={3} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
                <button onClick={handleAddCard} className="md:col-span-2 p-2 bg-primary text-white rounded-md hover:bg-primary-hover">Add Card</button>
            </div>

            <div className="space-y-2">
                {cards.map(card => (
                    <div key={card.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                        <p className="col-span-5 text-sm truncate">{card.front}</p>
                        <p className="col-span-5 text-sm truncate">{card.back}</p>
                        <div className="col-span-2 flex justify-end">
                             <button onClick={() => handleDeleteCard(card.id)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full" title="Delete Card"><TrashIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                ))}
                 {cards.length === 0 && <p className="text-center text-gray-500 py-4">This deck is empty. Add some cards!</p>}
            </div>
        </div>
    );
};

// StudyView Component
const StudyView: React.FC<{ deck: Deck, onBack: () => void }> = ({ deck, onBack }) => {
    const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleShuffle = useCallback(() => {
        const shuffled = [...deck.cards].sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
    }, [deck.cards]);
    
    useEffect(() => {
        handleShuffle();
    }, [handleShuffle]);

    const card = shuffledCards[currentIndex];

    if (!card) return (
         <div className="text-center space-y-4">
             <p>This deck has no cards.</p>
             <button onClick={onBack} className="px-4 py-2 bg-primary text-white rounded-md">Back to Decks</button>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center gap-2 text-primary font-semibold hover:underline">
                    <ArrowUturnLeftIcon className="w-5 h-5"/> Back to Decks
                </button>
                 <button onClick={handleShuffle} className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-slate-700 rounded-md text-sm font-semibold hover:bg-gray-300 dark:hover:bg-slate-600">
                    <ArrowPathIcon className="w-4 h-4"/> Shuffle
                </button>
            </div>
            
            <div className="text-center text-gray-500">{currentIndex + 1} / {shuffledCards.length}</div>

            <div className="relative h-64 [perspective:1000px]">
                <div 
                    className={`w-full h-full absolute transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg flex items-center justify-center p-4 text-center [backface-visibility:hidden] cursor-pointer">
                        <p className="text-2xl">{card.front}</p>
                    </div>
                    {/* Back */}
                    <div className="absolute w-full h-full bg-indigo-100 dark:bg-indigo-900/50 border dark:border-slate-700 rounded-lg flex items-center justify-center p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] cursor-pointer">
                         <p className="text-2xl">{card.back}</p>
                    </div>
                </div>
            </div>
            
             <div className="flex justify-between items-center">
                <button onClick={() => { setCurrentIndex(i => Math.max(0, i-1)); setIsFlipped(false); }} disabled={currentIndex === 0} className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50">Prev</button>
                <button onClick={() => setIsFlipped(!isFlipped)} className="px-6 py-2 bg-gray-200 dark:bg-slate-700 rounded-md">Flip</button>
                <button onClick={() => { setCurrentIndex(i => Math.min(shuffledCards.length - 1, i+1)); setIsFlipped(false); }} disabled={currentIndex === shuffledCards.length - 1} className="px-6 py-2 bg-primary text-white rounded-md disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};
