import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import { AppleIcon } from 'lucide-react';

const Login: React.FC = () => {
    const { login, loginWithGoogle, loginWithGoogleAccessToken, loginWithApple } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await login(email, password);
            const redirect = (location.state as { from?: string })?.from || '/';
            navigate(redirect);
        } catch (err: any) {
            setError(err?.message || "Impossible de se connecter. Réessayez.");
        } finally {
            setLoading(false);
        }
    };

    // Google Login using @react-oauth/google with One Tap
    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
            try {
                if (!credentialResponse.credential) {
                    setError("Aucun identifiant reçu de Google.");
                    return;
                }
                setLoading(true);
                setError(null);
                await loginWithGoogle(credentialResponse.credential);
                const redirect = (location.state as { from?: string })?.from || '/';
                navigate(redirect);
            } catch (err: any) {
                setError(err?.message || "Erreur lors de la connexion avec Google.");
                setLoading(false);
            }
        },
        onError: () => {
            setError("Erreur lors de la connexion avec Google.");
            setLoading(false);
        },
    });

    // Google Login with popup using @react-oauth/google
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                setError(null);
                
                // Use access token directly to authenticate (popup flow)
                await loginWithGoogleAccessToken(tokenResponse.access_token);
                const redirect = (location.state as { from?: string })?.from || '/';
                navigate(redirect);
            } catch (err: any) {
                setError(err?.message || "Erreur lors de la connexion avec Google.");
                setLoading(false);
            }
        },
        onError: (error: any) => {
            setError(`Erreur lors de la connexion avec Google: ${error?.error || error?.type || 'Erreur inconnue'}`);
            setLoading(false);
        },
    });

    const handleGoogleLogin = () => {
        setLoading(true);
        setError(null);
        googleLogin(); // This will open a popup
    };

    const handleAppleLogin = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Load Apple Sign In script if not already loaded
            if (!window.AppleID) {
                const script = document.createElement('script');
                script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
                script.async = true;
                document.head.appendChild(script);
                
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    setTimeout(reject, 10000); // 10s timeout
                });
            }

            // Get Apple Client ID from environment
            const APPLE_CLIENT_ID = process.env.REACT_APP_APPLE_CLIENT_ID || '';
            const APPLE_REDIRECT_URI = process.env.REACT_APP_APPLE_REDIRECT_URI || window.location.origin;
            
            if (!APPLE_CLIENT_ID) {
                throw new Error("Apple Client ID not configured. Please set REACT_APP_APPLE_CLIENT_ID in your .env file.");
            }

            // Initialize Apple Sign In
            window.AppleID!.auth.init({
                clientId: APPLE_CLIENT_ID,
                scope: 'name email',
                redirectURI: APPLE_REDIRECT_URI,
                usePopup: true,
            });

            // Sign in with Apple
            const response = await window.AppleID!.auth.signIn();
            
            if (response.authorization && response.authorization.id_token) {
                // Send ID token to backend
                await loginWithApple(response.authorization.id_token, response.user);
                const redirect = (location.state as { from?: string })?.from || '/';
                navigate(redirect);
            } else {
                throw new Error("No ID token received from Apple");
            }
        } catch (err: any) {
            setError(err?.message || "Erreur lors de la connexion avec Apple.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 sm:px-6 lg:px-12 py-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
                {/* Description panel - hidden on mobile, shown on desktop */}
                <div className="hidden lg:block relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-sky-500 to-fuchsia-500" />
                    <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
                    <div className="absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
                    <div className="relative z-10 space-y-6">
                        <p className="inline-flex items-center gap-2 rounded-full font-bricolagegrotesque bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                            NexaStay
                            <span className="h-1 w-1 rounded-full font-bricolagegrotesque bg-cyan-300" />
                            Connexion
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight font-bricolagegrotesque">
                            Reprenez votre voyage
                            <span className="block text-cyan-200">avec une expérience fluide</span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-200/80 max-w-lg font-vendsans">
                            Découvrez une expérience NexaStay conçue pour vous : navigation intuitive, esthétique raffinée et accès rapide à vos souvenirs et réservations.
                        </p>
                        <div className="space-y-3 pt-2">
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center font-bricolagegrotesque justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continuer avec Google
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAppleLogin}
                                disabled={loading}
                                className="w-full flex items-center font-bricolagegrotesque justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <img src="logos/apple.png" alt="Apple" className="w-6 h-6" />
                                Continuer avec Apple
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Form panel - shown first on mobile, second on desktop */}
                <div className="order-1 lg:order-2 rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 font-bricolagegrotesque">Connexion</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-bricolagegrotesque">Bienvenue</h2>
                            <p className="text-sm text-slate-500 font-bricolagegrotesque">Retrouvez vos mémoires, favoris et conversations.</p>
                        </div>
                        <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.9885 18.0745C31.9751 16.6791 32.0158 15.2767 31.9616 13.8818C31.9008 12.0402 31.4144 10.2272 30.5092 8.65492C29.6988 7.27359 28.6115 6.05556 27.2875 5.20586C25.3491 3.97326 23.3566 2.83312 21.4115 1.62213C18.1491 -0.552633 13.7317 -0.53806 10.476 1.65027C9.78023 2.07537 9.08443 2.507 8.38239 2.92507C6.27485 4.27073 3.88362 5.30485 2.28979 7.36554C1.68887 8.13083 1.20918 8.9946 0.803778 9.88701C0.337992 11.1126 0.0135705 12.4085 0.00686162 13.7401C-0.0065561 16.2967 0.00686156 18.8463 0.000152763 21.403C-0.013265 23.8184 0.857928 26.2052 2.33052 28.0539C3.27599 29.3001 4.54588 30.2141 5.86945 30.9648C7.10579 31.7225 8.35508 32.4516 9.58424 33.2169C11.0166 34.1656 12.5563 34.9661 14.2383 35.2992C15.7918 35.5042 17.3924 35.4334 18.9052 34.9731C20.0807 34.6194 21.1412 33.946 22.1883 33.3089C24.0725 32.112 26.0583 31.0638 27.8889 29.7749C30.0635 28.0891 31.5764 25.4405 31.86 22.6074C32.056 21.1055 31.9683 19.59 31.9885 18.0745Z" fill="url(#paint0_radial_3760_1692)" />
                            <path d="M15.9736 7.82894C16.7571 7.82141 17.4194 8.31033 18.0878 8.67161C18.2163 10.4208 18.0543 12.1845 18.1353 13.9337C18.1961 14.9256 18.1621 15.917 18.1621 16.9084C18.1621 17.4113 18.1688 17.9073 18.2029 18.4098C18.2163 18.6651 18.2364 18.7782 18.4189 18.9485C18.6418 19.1676 18.9456 19.3163 19.2226 19.465C19.4521 19.5856 19.9385 19.7982 20.1815 19.5786C20.6884 19.1254 20.4724 18.332 20.5328 17.723C20.4925 15.2015 20.6277 12.6729 20.4724 10.1519C21.553 10.8388 22.7213 11.377 23.7075 12.2126C24.2883 13.0839 24.3558 14.1673 24.3017 15.1944C24.2408 17.2837 24.3491 19.3731 24.2681 21.4624C24.0247 22.3407 23.4305 23.0774 22.6671 23.495C20.8639 24.5578 19.0874 25.6768 17.2842 26.7391C16.2304 27.4119 14.7377 27.1495 13.9609 26.1652C13.8866 25.4572 13.9341 24.7487 13.9341 24.0407C13.9274 21.7031 13.9408 19.366 13.9341 17.029C14.0218 16.2074 13.13 15.924 12.5698 15.6406C12.07 15.3361 11.5026 15.8391 11.5836 16.4054C11.5228 19.2033 11.6373 22.0076 11.5295 24.8055C10.2936 23.913 8.5507 23.5096 7.87549 21.9725C7.51034 20.7756 7.70639 19.4796 7.66614 18.24C7.69298 16.7316 7.6388 15.216 7.71978 13.7071C7.76051 12.7509 8.42903 11.972 9.1857 11.5187C10.6784 10.6404 12.1577 9.73392 13.637 8.82745C14.3663 8.38828 15.1024 7.86413 15.9736 7.82894Z" fill="url(#paint1_linear_3760_1692)" />
                            <defs>
                                <radialGradient id="paint0_radial_3760_1692" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15.9956 2.59922) rotate(90) scale(33.5447 30.3074)">
                                    <stop stop-color="#2DD4BF" />
                                    <stop offset="0.55" stop-color="#0EA5E9" />
                                    <stop offset="1" stop-color="#D946EF" />
                                </radialGradient>
                                <linearGradient id="paint1_linear_3760_1692" x1="15.9829" y1="7.82886" x2="15.9829" y2="27.1127" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white" />
                                    <stop offset="1" stop-color="#F8FAFC" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 font-bricolagegrotesque">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-inner focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition"
                                placeholder="vous@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 font-bricolagegrotesque">Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-inner focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl font-bricolagegrotesque border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-xl font-bricolagegrotesque bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:brightness-110 transition"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </motion.button>

                        <div className="flex items-center justify-between text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <span className="h-[1px] w-10 font-bricolagegrotesque bg-slate-200" />
                                <span>Pas encore de compte ?</span>
                            </div>
                            <Link to="/signup" className="font-semibold font-bricolagegrotesque text-cyan-600 hover:text-cyan-700">
                                Créer un compte
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Description panel - shown on mobile after form */}
                <div className="order-2 lg:order-1 lg:hidden relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-sky-500 to-fuchsia-500" />
                    <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-500/15 blur-3xl" />
                    <div className="absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
                    <div className="relative z-10 space-y-6">
                        <p className="inline-flex items-center gap-2 rounded-full font-bricolagegrotesque bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                            NexaStay
                            <span className="h-1 w-1 rounded-full font-bricolagegrotesque bg-cyan-300" />
                            Connexion
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight font-bricolagegrotesque">
                            Reprenez votre voyage
                            <span className="block text-cyan-200">avec une expérience fluide</span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-200/80 max-w-lg font-vendsans">
                        Découvrez une expérience NexaStay conçue pour vous : navigation intuitive, esthétique raffinée et accès rapide à vos souvenirs et réservations.
                        </p>
                        <div className="space-y-3 pt-2">
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center font-bricolagegrotesque justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Continuer avec Google
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAppleLogin}
                                disabled={loading}
                                className="w-full flex items-center font-bricolagegrotesque justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur hover:bg-white/15 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <img src="logos/apple.png" alt="Apple" className="w-6 h-6" />
                                Continuer avec Apple
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

