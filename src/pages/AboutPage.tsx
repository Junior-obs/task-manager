import React from 'react';
import { Download, ExternalLink, Star } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-bold text-white">📋</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            TaskManager Pro
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Votre gestionnaire de tâches ultime. Simple, puissant et beau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/add"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              🚀 Commencer
              <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#features"
              className="group inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            >
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Découvrir
            </a>
          </div>
        </div>

        {/* Features */}
        <section id="features" className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Pourquoi choisir TaskManager ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultra Rapide</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Interface fluide avec animations subtiles. Vos tâches se chargent instantanément.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Responsive</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Parfait sur tous les écrans. Mobile, tablette, desktop - partout impeccable.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">localStorage</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Vos données sont en sécurité dans votre navigateur. Jamais perdues.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-indigo-200">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Statistiques</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Graphiques avancés et métriques pour suivre votre productivité.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-pink-200">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Premium</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Interface moderne avec Tailwind CSS et animations fluides.
              </p>
            </div>

            <div className="group p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-cyan-200">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">♿</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accessible</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Respecte les standards WCAG. Parfait pour tous les utilisateurs.
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl font-bold text-white">React</span>
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl font-bold text-white">TypeScript</span>
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl font-bold text-white">Tailwind</span>
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-sm font-bold text-white">Vite</span>
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-lg font-bold text-white">Recharts</span>
              </div>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-sm font-bold text-white">localStorage</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & Footer */}
        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Prêt à booster votre productivité ?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont transformé leur façon de travailler.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="/"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              🎯 Commencer maintenant
              <Download className="w-5 h-5 group-hover:rotate-[-10deg] transition-transform" />
            </a>
            <div className="text-sm text-gray-500">
              ✦ Made with ❤️ by BLACKBOXAI ✦
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

