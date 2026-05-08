'use client';

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#BEE7F5] via-[#FCD5DD] to-[#FFE9C9]">
      <div className="panel-pixel px-8 py-6 text-center">
        <div className="title-pixel text-[14px] mb-3">Costruendo la casa</div>
        <div className="text-2xl loading-dots">🛠️🧱🪟</div>
      </div>
    </div>
  );
}
