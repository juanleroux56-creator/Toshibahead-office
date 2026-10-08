import React from 'react';

export const VideoSection: React.FC = () => {
  const videos = [
    {
      id: 'tf_RSSslNlc',
      title: 'Toshiba e-STUDIO Overview',
      desc: 'Explore the modern user interface and high-speed multi-touch workflow.',
    },
    {
      id: 'XiIpNzw5QJA',
      title: 'Toshiba e-STUDIO in Action',
      desc: 'Real-world office performance, dual-scan feeder, and mobile printing.',
    },
    {
      id: '8RRWVkVKKd8',
      title: 'Toshiba e-STUDIO Features',
      desc: 'Security architecture, cloud integrations, and eco-friendly fusing technology.',
    },
  ];

  return (
    <section className="bg-[#090b10] text-white py-16 md:py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
            See It in Action
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Watch Our Printers Work
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Get a closer look at Toshiba e-STUDIO performance, features and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-md group"
            >
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white text-base group-hover:text-rose-400 transition-colors">
                  {vid.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {vid.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
