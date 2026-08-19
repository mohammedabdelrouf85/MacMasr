import HeroSection   from './components/HeroSection'
import OffersSection from './components/OffersSection'
import MenuSection   from './components/MenuSection'
import StatsSection  from './components/StatsSection'
import WaveDivider   from './components/WaveDivider'
import TimelineSection from './components/TimelineSection'
import SupportSection  from './components/SupportSection'
import LiveChatWidget  from './components/LiveChatWidget'
import Footer          from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────── black bg */}
      <HeroSection />

      {/* Wave: black → white/cream (Offers bg) */}
      <WaveDivider fromColor="#000000" toColor="#fff8f8" />

      {/* ── Offers ──────────────────────────────────── cream/white bg */}
      <OffersSection />

      {/* Wave: white → dark (Menu bg) */}
      <WaveDivider fromColor="#ffffff" toColor="#181818" />

      {/* ── Menu ─────────────────────────────────────── dark bg */}
      <MenuSection />

      {/* Wave: dark → red (Stats bg) */}
      <WaveDivider fromColor="#181818" toColor="#DA291C" />

      {/* ── Stats ─────────────────────────────────────── red bg */}
      <StatsSection />

      {/* Wave: red → white (Timeline bg) */}
      <WaveDivider fromColor="#DA291C" toColor="#ffffff" />

      {/* ── Timeline ──────────────────────────────────── white bg */}
      <TimelineSection />

      {/* Wave: white → gray-50 (Support bg) */}
      <WaveDivider fromColor="#ffffff" toColor="#f9fafb" />

      {/* ── Support ───────────────────────────────────── gray bg */}
      <SupportSection />

      {/* ── Footer ────────────────────────────────────── dark bg */}
      <Footer />

      {/* Floating Chat Widget */}
      <LiveChatWidget />
    </div>
  )
}

export default App
