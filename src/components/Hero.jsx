import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[520px] w-full">
        <Spline
          scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.12),transparent_60%)]" />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 w-full pb-10">
          <div className="backdrop-blur-sm bg-neutral-950/40 border border-white/10 rounded-2xl p-6 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Request and authorize devices with ease</h1>
            <p className="mt-3 text-neutral-300">A friendly, secure workflow for employees and admins. Submit requests, add justifications, and track approvals — all in one place.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#request" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 text-white px-4 py-2 font-medium hover:bg-orange-400 transition">
                Submit a request
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#admin" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-neutral-200 hover:bg-white/5 transition">Admin view</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
