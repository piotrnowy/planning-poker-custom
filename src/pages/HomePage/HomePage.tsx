import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import { RecentGames } from '../../components/Poker/RecentGames/RecentGames';
import { ThemeToggle } from '../../components/ThemeControl/ThemeToggle';

export const HomePage = () => {
  const history = useHistory();
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 py-8 animate-fade-in-down'>
      <div className='w-full max-w-4xl'>
        {/* Header with Theme Control */}
        <div className='flex justify-end items-center mb-8'>
          <ThemeToggle />
        </div>

        {/* Service Summary */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Planning Poker</h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            A simple and effective tool for agile teams to estimate story points collaboratively.
            Create a session, invite your team, and start voting!
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 justify-center mb-8'>
          <button
            onClick={() => setShowJoin(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              !showJoin
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Create New Session
          </button>
          <button
            onClick={() => setShowJoin(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              showJoin
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Join Session
          </button>
        </div>

        {/* Main Content Area */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Create/Join Session Widget */}
          <div className='w-full'>
            {!showJoin ? (
              <CreateGame />
            ) : (
              <div className='border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Join a Session</h2>
                <div className='flex flex-col gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Session ID</label>
                    <input
                      type='text'
                      className='w-full border border-gray-400 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400'
                      placeholder='Enter session ID'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          history.push(`/join/${e.currentTarget.value}`);
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (input && input.value) {
                        history.push(`/join/${input.value}`);
                      }
                    }}
                    className='bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-blue-700 transition w-full'
                  >
                    Join
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recent Sessions */}
          <div className='w-full'>
            <RecentGames />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
