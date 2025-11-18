import { motion, AnimatePresence } from 'framer-motion';

export default function ApiStatusBanner({ error, onUseFallback, onDismiss }) {
  if (!error) return null;

  const isQuotaError = error.includes('quota') || error.includes('429');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full mx-4"
      >
        <div className="bg-gradient-to-r from-red-900/90 to-orange-900/90 backdrop-blur-sm border border-red-500/50 rounded-lg shadow-2xl p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {isQuotaError ? (
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">
                {isQuotaError ? '⚠️ OpenAI API Quota Exceeded' : '❌ API Error'}
              </h3>
              <p className="text-gray-200 text-sm mb-3">
                {isQuotaError 
                  ? 'Your OpenAI API quota has been exceeded. You can add credits or use fallback mode for basic transformations.'
                  : error
                }
              </p>
              
              <div className="flex gap-2">
                {isQuotaError && (
                  <>
                    <button
                      onClick={onUseFallback}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      🔄 Use Fallback Mode
                    </button>
                    <a
                      href="https://platform.openai.com/account/billing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      💳 Add Credits
                    </a>
                  </>
                )}
                <button
                  onClick={onDismiss}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
            
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
