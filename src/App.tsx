import React, { useEffect, useState } from 'react';
import './App.css';
import { kastaenergy, apps, friend, wallet, farmx2, luckybox, faq } from './images';

const App: React.FC = () => {
  const [isKastaEnergyVisible, setIsKastaEnergyVisible] = useState(false);
  const [isFriendVisible, setIsFriendVisible] = useState(false);
  const [isWalletVisible, setIsWalletVisible] = useState(false);
  const [isAppsVisible, setIsAppsVisible] = useState(false);
  const [isAdMenuVisible, setIsAdMenuVisible] = useState(false);
  const [isSecondMiningVisible, setIsSecondMiningVisible] = useState(false);
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const [balanceKST, setBalanceKST] = useState(0);
  const [balanceTON, setBalanceTON] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);
  const [boostEndTime, setBoostEndTime] = useState<number | null>(null);
  const [currentBoostType, setCurrentBoostType] = useState<string | null>(null);
  const [referralsCount, setReferralsCount] = useState(0);
  const [earnedFromReferrals, setEarnedFromReferrals] = useState(0);
  const [userID] = useState(Math.floor(Math.random() * 1000000));
  const [reward, setReward] = useState<{ type: string; amount: number } | null>(null);
  const [isLuckyBoxActive, setIsLuckyBoxActive] = useState(false);
  const [isAdditionalMiningActive, setIsAdditionalMiningActive] = useState(false);

  const startMining = () => {
    setIsMining(true);
    setTimeLeft(12 * 60 * 60);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsMining(false);
      setTimeLeft(0);
      getToken();
    }, 12 * 60 * 60 * 1000);
  };

  const getToken = () => {
    // Main mining reward 
    setBalanceKST(prev => prev + (isBoosted ? 1 : 0.5)); 
    setIsMining(false);
    setTimeLeft(null);
  };

  const addReferral = () => {
    setReferralsCount(prev => prev + 1);
    setEarnedFromReferrals(prev => prev + 0.05);
    setBalanceKST(prev => prev + 0.05);
  };

  const copyReferralLink = () => {
    const referralLink = `https://yourapp.com/referral?userId=${userID}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      alert("Referral link copied to clipboard!");
    }).catch(err => {
      console.error('Copy error: ', err);
    });
  };

  const handleClose = () => {
    setIsKastaEnergyVisible(false);
    setIsFriendVisible(false);
    setIsWalletVisible(false);
    setIsAppsVisible(false);
    setIsAdMenuVisible(false);
    setIsSecondMiningVisible(false);
    setIsFaqVisible(false);
    setReward(null);
  };

  const handleBuyBoost = (type: string) => {
    if (type === 'TON') {
      if (balanceTON >= 1) { // Adjusted for 1 TON
        alert("You bought an improvement for 1 TON! Doubling your loot forever.");
        setIsBoosted(true);
        setCurrentBoostType('TON');
        setBoostEndTime(null); // No expiration
        setBalanceTON(prev => prev - 1); 
      } else {
        alert("Not enough TON's to buy an improvement!");
      }
    } else if (type === 'KST') {
      if (balanceKST >= 7) {
        alert("You have bought an improvement for 7 KST! Double your loot for 10 days.");
        setIsBoosted(true);
        setCurrentBoostType('KST');
        setBoostEndTime(Date.now() + 10 * 24 * 60 * 60 * 1000);
        setBalanceKST(prev => prev - 7); 
      } else {
        alert("Not enough KST to purchase the enhancement!");
      }
    }
  };

  const checkBoostStatus = () => {
    if (boostEndTime && Date.now() > boostEndTime) {
      setIsBoosted(false);
      setBoostEndTime(null);
      setCurrentBoostType(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkBoostStatus, 1000); // Check every second
    return () => clearInterval(interval);
  }, [boostEndTime]);

  const openKastaEnergy = () => {
    if (!isFriendVisible && !isWalletVisible && !isAppsVisible && !isLuckyBoxActive) {
      setIsKastaEnergyVisible(true);
    }
  };

  const openFriendMenu = () => {
    if (!isKastaEnergyVisible && !isWalletVisible && !isAppsVisible && !isLuckyBoxActive) {
      setIsFriendVisible(true);
    }
  };

  const openWalletMenu = () => {
    if (!isKastaEnergyVisible && !isFriendVisible && !isAppsVisible && !isLuckyBoxActive) {
      setIsWalletVisible(true);
    }
  };

  const openAppsMenu = () => {
    if (!isKastaEnergyVisible && !isFriendVisible && !isWalletVisible && !isLuckyBoxActive) {
      setIsAppsVisible(true);
    }
  };

  const openAdMenu = () => {
    setIsAdMenuVisible(true);
    setIsLuckyBoxActive(true);
  };

  const giveReward = () => {
    const randomValue = Math.random();
    let prize: { type: string; amount: number };
    if (randomValue < 0.000285714) {
      const premiumPrizesTON = [0.001, 0.005, 0.01];
      prize = {
        type: "TON",
        amount: premiumPrizesTON[Math.floor(Math.random() * premiumPrizesTON.length)],
      };
      setBalanceTON(prev => prev + prize.amount); 
    } else if (randomValue < 0.000142857) {
      const premiumPrizesTON = [0.05, 0.1, 0.5, 1];
      prize = {
        type: "TON",
        amount: premiumPrizesTON[Math.floor(Math.random() * premiumPrizesTON.length)],
      };
    } else if (randomValue < 0.002) {
      const premiumPrizesKST = [0.01, 0.05, 0.1, 0.5, 1];
      prize = {
        type: "KST",
        amount: premiumPrizesKST[Math.floor(Math.random() * premiumPrizesKST.length)],
      };
    } else {
      const regularPrizes = [0.0005, 0.001, 0.005];
      prize = {
        type: "KST",
        amount: regularPrizes[Math.floor(Math.random() * regularPrizes.length)],
      };
    }
    setReward(prize);
    setBalanceKST(prev => prev + prize.amount); 
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refUserId = params.get('userId');
    if (refUserId) {
      addReferral();
    }
  }, []);

  useEffect(() => {
    let additionalMiningInterval: NodeJS.Timeout | null = null;
    if (isAdditionalMiningActive) {
      additionalMiningInterval = setInterval(() => {
        setBalanceKST(prev => prev + (isBoosted ? 2 : 1)); // Adjusted for 1 KST (or 2 if boosted) every 12 hours
      }, 12 * 60 * 60 * 1000); // Run every 12 hours

      return () => {
        if (additionalMiningInterval) clearInterval(additionalMiningInterval);
      };
    }
  }, [isAdditionalMiningActive, isBoosted]);

  const handleFaqLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="background bg-black flex justify-center">
      <div className="w-full text-white h-screen font-bold flex flex-col max-w-xl relative">
        <div className="app">
          {timeLeft !== null && (
            <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 p-3 text-lg px-40 mt-80 py-14">
              {isMining
                ? `${Math.floor(timeLeft / 3600)}:${(Math.floor((timeLeft % 3600) / 60)).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
                : ''}
            </p>
          )}
          <div className="absolute top-1/4 right-4">
            <img 
              src={luckybox} 
              alt="View Ads" 
              className="cursor-pointer w-20 h-20"
              onClick={openAdMenu} 
            />
          </div>
          <img 
            src={faq} 
            alt="FAQ" 
            className="absolute top-4 right-4 cursor-pointer w-12 h-12"
            onClick={() => setIsFaqVisible(true)} 
          />
          
          {isFaqVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">📖 FAQ</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center mb-4">
                Here you will find frequently asked questions and answers.
                </p>
                <p className="text-white text-lg text-center mb-4">
                Mining and Boost - 
                  <button onClick={() => handleFaqLink('https://telegra.ph/MiningMajning-10-07')} className="ml-2 bg-violet-500 text-white px-1 py-1 rounded">
                  Read
                  </button>
                </p>
                <p className="text-white text-lg text-center mb-4">
                  Lucky Box - 
                  <button onClick={() => handleFaqLink('https://telegra.ph/Lucky-Box-10-07')} className="ml-2 bg-violet-500 text-white px-1 py-1 rounded">
                  Read
                  </button>
                </p>
                <p className="text-white text-lg text-center mb-4">
                Referrals are. 
                  <button onClick={() => handleFaqLink('https://telegra.ph/ReferalsReferaly-10-07')} className="ml-2 bg-violet-500 text-white px-1 py-1 rounded">
                  Read
                  </button>
                </p>
                <p className="text-white text-lg text-center mb-4">
                  Pools - 
                  <button onClick={() => handleFaqLink('https://telegra.ph/Pools-10-07-11')} className="ml-2 bg-violet-500 text-white px-1 py-1 rounded">
                  Read
                  </button>
                </p>
                <p className="text-white text-lg text-center mb-4">
                Why us? - 
                  <button onClick={() => handleFaqLink('https://telegra.ph/Why-usPochemu-my-10-07')} className="ml-2 bg-violet-500 text-white px-1 py-1 rounded">
                  Read
                  </button>
                </p>
              </div>
            </div>
          )}
          
          {!isMining && timeLeft === null && (
            <button 
              className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80"
              onClick={startMining}
            >
              Start
            </button>
          )}
          
          {isMining && (
            <button 
              className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-violet-500 rounded-lg text-white px-40 mt-80 button-disabled"
              disabled
            >
              Mining...
            </button>
          )}
          
          {timeLeft === 0 && !isMining && (
            <button 
              className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-lime-500 rounded-lg text-white px-40"
              onClick={getToken}
            >
              Claim
            </button>
          )}

          {isKastaEnergyVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">✨ BOOST MENU ✨</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-center text-lg font-medium mb-6">
                  🚀 Improve your mining speed!
                  <br />
                  Choose a way to increase production.
                </p>
                <div className="flex items-center justify-center mt-4">
                  <img src={farmx2} alt="Buy Upgrade" className="w-32 ml-2" />
                  <div className="flex flex-col ml-4">
                    {!isBoosted && (
                      <>
                        <button 
                          className="button bg-violet-500 text-white font-bold py-2 px-4 rounded mb-2" 
                          onClick={() => handleBuyBoost('KST')}
                        >
                          Buy for 7 KST
                        </button>
                        <button 
                          className="button bg-violet-500 text-white font-bold py-2 px-4 rounded" disabled
                          onClick={() => handleBuyBoost('TON')}
                        >
                          Soon. 
                        </button> 
                      </>
                    )}
                    {isBoosted && (
                      <p className="text-green-500 text-center mt-4">
                        Increasing production actively! {currentBoostType === 'TON' ? "Forever.." : `More ${Math.ceil((boostEndTime! - Date.now()) / 1000 / 60 / 60 / 24)} days.`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isFriendVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">👫 Friends Menu</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center">
                Number of friends invited: <span className="font-bold">{referralsCount}</span>
                </p>
                <p className="text-white text-lg text-center">
                Total amount from referrals: <span className="font-bold">{earnedFromReferrals.toFixed(2)} KST</span>
                </p>
                <div className="flex justify-center mt-6">
                  <button className="button px-4 py-2 bg-violet-500 text-white rounded" onClick={() => { copyReferralLink(); }}>
                  Invite a friend
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {isWalletVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">💼 Wallet Menu</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center">
                Current KST balance: <span className="font-bold">{balanceKST.toFixed(4)} KST</span>
                </p>
                <p className="text-white text-lg text-center">
                Current TON balance: <span className="font-bold">{balanceTON.toFixed(4)} TON</span>
                </p>
              </div>
            </div>
          )}

          {isAppsVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">📱 Apps Menu</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <div className="text-white text-lg text-center mt-4">
                  <h3 className="font-bold">Additional mining</h3>
                  <button 
                    className="button mt-2 bg-gray-500 text-white px-4 py-2 rounded" disabled
                    onClick={() => {
                      setIsAppsVisible(false);
                      setIsSecondMiningVisible(true); 
                    }}
                  >
                    {"Open(Soon)"}
                  </button>
                </div>
                <div className="mt-6 text-white text-lg text-center">
                  <h3 className="font-bold">Pools</h3>
                  <button className="button mt-2 bg-gray-500 text-white px-4 py-2 rounded" disabled>Open(Soon)</button> 
                </div>
              </div>
            </div>
          )}

          {isSecondMiningVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={() => setIsSecondMiningVisible(false)}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">Additional mining</h2>
                <span onClick={() => setIsSecondMiningVisible(false)} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center mb-4">
                  {isAdditionalMiningActive ? "Вы купили дополнительный майнинг, теперь вы добываете больше монет!" : "Чтобы начать дополнительный майнинг активируйте его."}
                </p>
                <div className="flex justify-center mt-4">
                  {isAdditionalMiningActive ? (
                    <button className="button bg-violet-500 text-white px-6 py-2 rounded">
                      Additional mining is active
                    </button>
                  ) : (
                    <button className="button bg-violet-500 text-white px-6 py-2 rounded" onClick={() => {
                      if (balanceTON >= 1) {
                        setBalanceKST(prev => prev - 1);
                        setIsAdditionalMiningActive(true);
                        alert("Additional mining activated!");
                      } else {
                        alert("Not enough KST for activation!");
                      }
                    }}>
                      Activate for 1 TON
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {isAdMenuVisible && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] p-10 rounded-lg w-4/5 max-w-xl shadow-lg flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-3xl mb-4">🎥 Lucky Box</h2>
                <span onClick={handleClose} className="cursor-pointer text-red-500 absolute top-4 right-4">✖️</span>
                <p className="text-white text-lg text-center mb-4">
                When you watch the commercial, you will receive a random prize from our project! 🎁
                </p>
                <button
                  className="button bg-gray-500 text-white px-6 py-2 rounded-xl mt-4" disabled
                  onClick={() => {
                    giveReward();
                    setIsAdMenuVisible(false);
                    setIsLuckyBoxActive(false); 
                  }}
                >
                  Start watching ads(Soon)
                </button>
              </div>
            </div>
          )}
          
          {reward && (
            <div className="modal fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={handleClose}>
              <div className="modal-content bg-[#1f1f1f] flex flex-col items-center p-10 rounded-lg w-4/5 max-w-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-yellow-400 text-2xl mb-4">🏆 Congratulations!</h2>
                <p className="text-white text-lg text-center mb-6">
                You've got {reward.amount} {reward.type}!
                </p>
                <button onClick={handleClose} className="button bg-red-500 text-white px-6 py-2 rounded-xl">Close</button>
              </div>
            </div>
          )}

          <div className="px-44 mt-7">
            <div className="px-21 mt-180">
              <div className="px-1 py-60"></div>
            </div>
          </div>
          
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
            <div className="text-center m-2 p-1 rounded-2xl" onClick={openKastaEnergy}>
              <img src={kastaenergy} alt="Mine" className="w-14 h-14 mx-auto" />
            </div>
            <div className="text-center m-2 p-1 rounded-2xl" onClick={openFriendMenu}>
              <img src={friend} alt="Friends" className="w-14 h-14 mx-auto" />
            </div>
            <div className="text-center m-2 p-1 rounded-2xl" onClick={openWalletMenu}>
              <img src={wallet} alt="Earn" className="w-14 h-14 mx-auto" />
            </div>
            <div className="text-center m-2 p-1 rounded-2xl" onClick={openAppsMenu}>
              <img src={apps} alt="Airdrop" className="w-14 h-14 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
