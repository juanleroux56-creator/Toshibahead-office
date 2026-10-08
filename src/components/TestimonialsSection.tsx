import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Thabo M.',
      role: 'Office Manager · Sandton Law Firm',
      text: 'We moved away from a national supplier after months of slow response times. Our office printer is now serviced same-day and the all-in monthly cost is actually lower than what we were paying.',
    },
    {
      name: 'Marina',
      role: 'Business Owner · Johannesburg',
      text: "I'm incredibly impressed with the service received from Jonty Peall. Within a day, he and the team delivered the Toshiba printers. Steve, the technician, completed setup and networking in under two hours.",
    },
    {
      name: 'Lesley Caddy',
      role: 'Operations Director',
      text: 'Thank you so much for the fast and efficient service I have received from Antonie. As long as I am at that company we will never change from Toshiba.',
    },
    {
      name: 'Madelaine Posthumus',
      role: 'Randburg Clinic School',
      text: 'I would like to commend Keanan on his fabulous service. He was so pleasant and very thorough, ensuring all staff could print from their laptops immediately.',
    },
  ];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8 w-full border-t border-slate-800">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2.5">
          Client Feedback
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Trusted by Gauteng Businesses
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Over 900 businesses across Gauteng rely on Toshiba equipment and our 4–8 hour service response SLA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-slate-700 group-hover:text-rose-500/40 transition-colors" />
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "{t.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="font-bold text-white text-sm">
                {t.name}
              </h4>
              <p className="text-xs text-rose-400/90 font-medium mt-0.5">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
