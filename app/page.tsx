'use client';

import React, { useState, useEffect } from 'react';



export default function Page() {

  const [mounted, setMounted] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  const [bankBalance, setBankBalance] = useState(2450.00);

  const [invoiceAmount, setInvoiceAmount] = useState<number>(0);

  const [advanceAmount, setAdvanceAmount] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  const [isTransferred, setIsTransferred] = useState(false);

  

  const feeRate = 0.04; // 4% Starter Tier



  useEffect(() => {

    setMounted(true);

    // Mẹo: Nếu thấy URL có code hoặc bạn vừa bấm connect xong, tự hiểu là đã kết nối

    if (window.location.search.includes('code') || localStorage.getItem('flowo_connected')) {

      setIsConnected(true);

    }

  }, []);



  const handleConnectBank = () => {

    localStorage.setItem('flowo_connected', 'true'); // Lưu trạng thái để khi quay lại nó tự hiện Active

    const authUrl = `https://auth.truelayer-sandbox.com/?response_type=code&client_id=sandbox-flowofintech29052005-c64c8e&scope=info%20accounts%20balance%20cards%20transactions&redirect_uri=https://console.truelayer.com/redirect-page&providers=uk-cs-mock`;

    window.location.href = authUrl;

  };



  const handleCalculate = (val: string) => {

    const amount = parseFloat(val) || 0;

    setInvoiceAmount(amount);

    setAdvanceAmount(amount > 0 ? amount - (amount * feeRate) : 0);

  };



  const handleTransfer = () => {

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      setIsTransferred(true);

      setBankBalance(prev => prev + advanceAmount);

    }, 2000);

  };



  if (!mounted) return null;



  return (

    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900">

      {/* GIAO DIỆN HEADER CỰC XỊN */}

      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-10 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white sticky top-4 z-50">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">F</div>

          <div>

            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">FLOWO</h1>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fintech MVP</p>

          </div>

        </div>

        

        {isConnected ? (

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl border border-emerald-100 font-bold text-sm">

            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>

            TRUE BANK ACTIVE

          </div>

        ) : (

          <button onClick={handleConnectBank} className="bg-slate-900 text-white px-5 py-2 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">

            Connect Bank

          </button>

        )}

      </nav>



      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        

        {/* CỘT TRÁI: THÔNG TIN TÀI KHOẢN */}

        <div className="lg:col-span-1 space-y-6">

          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 relative z-10">Total Balance</p>

            <h3 className="text-4xl font-black text-slate-900 relative z-10">${bankBalance.toLocaleString()}</h3>

            <div className="mt-6 flex items-center gap-2 text-emerald-500 font-bold text-xs bg-emerald-50 w-fit px-3 py-1 rounded-full relative z-10">

              <span>↑ 12% this month</span>

            </div>

          </div>



          <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Advance Limit</p>

            <h3 className="text-3xl font-black">$5,000.00</h3>

            <p className="text-slate-500 text-[10px] mt-4 leading-relaxed">Limit based on your TrueLayer transaction history.</p>

          </div>

        </div>



        {/* CỘT PHẢI: CÔNG CỤ ỨNG TIỀN (VỤ HẾT PHÈN NẰM Ở ĐÂY) */}

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">

            <h2 className="text-2xl font-black mb-8 flex items-center gap-3">

              Get Paid Instantly 

              <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-md uppercase tracking-tighter">Starter Tier</span>

            </h2>

            

            <div className="space-y-8">

              <div className="relative">

                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Enter Invoice Amount</label>

                <div className="relative">

                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">$</span>

                  <input 

                    type="number" 

                    placeholder="0.00"

                    className="w-full p-6 pl-12 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:border-blue-500 focus:bg-white outline-none transition-all text-3xl font-black shadow-inner"

                    onChange={(e) => handleCalculate(e.target.value)}

                  />

                </div>

              </div>



              <div className="bg-[#1E293B] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">

                <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-6">

                  <div>

                    <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Service Fee (4%)</p>

                    <p className="text-xl font-bold text-rose-400">-${(invoiceAmount * feeRate).toFixed(2)}</p>

                  </div>

                  <div className="text-right">

                    <p className="text-blue-400 text-[10px] font-black uppercase mb-1">You Receive</p>

                    <p className="text-4xl font-black text-emerald-400">${advanceAmount.toFixed(2)}</p>

                  </div>

                </div>



                <button 

                  onClick={handleTransfer}

                  disabled={advanceAmount <= 0 || loading || isTransferred}

                  className={`w-full py-6 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${

                    isTransferred ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/50' : 

                    advanceAmount > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40' : 

                    'bg-slate-800 text-slate-600 cursor-not-allowed'

                  }`}

                >

                  {loading ? (

                    <span className="flex items-center justify-center gap-3">

                      <span className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>

                      VERIFYING WITH TRUELAYER...

                    </span>

                  ) : isTransferred ? "✓ FUNDS SENT TO YOUR BANK" : "TRANSFER FUNDS NOW"}

                </button>

              </div>



              {isTransferred && (

                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4 animate-bounce">

                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl">✓</div>

                  <div>

                    <p className="font-black text-emerald-800">Transfer Successful!</p>

                    <p className="text-xs text-emerald-600">Your bank balance has been updated via FLOWO Instant Settlement.</p>

                  </div>

                </div>

              )}

            </div>

          </div>



          {/* BẢNG LỊCH SỬ GIAO DỊCH (THÊM ĐIỂM UX) */}

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Recent Activity</h3>

            <div className="space-y-4">

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg">🏦</div>

                  <div>

                    <p className="font-bold text-sm text-slate-900">TrueLayer Connect</p>

                    <p className="text-[10px] text-slate-400">Authorized • Just now</p>

                  </div>

                </div>

                <span className="text-[10px] font-black text-emerald-500 uppercase">Success</span>

              </div>

              {isTransferred && (

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm text-white font-bold text-xs">F</div>

                    <div>

                      <p className="font-bold text-sm text-blue-900">Cash Advance</p>

                      <p className="text-[10px] text-blue-400">Incoming • Today</p>

                    </div>

                  </div>

                  <span className="font-black text-blue-600">+${advanceAmount.toFixed(2)}</span>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
