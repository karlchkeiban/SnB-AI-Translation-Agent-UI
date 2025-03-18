import React, { useState, useEffect } from 'react'
import { Clipboard, Loader, CheckCircle, AlertCircle, Languages } from 'lucide-react'
import Select from './components/Select'

interface AuditLog {
  timestamp: string
  quality: string
  industry: string
  textType: string
  format: string
  segment: string
}

export default function App() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [quality, setQuality] = useState('professional')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [currentLog, setCurrentLog] = useState({
    industry: 'legal',
    textType: 'technical-documentation',
    segment: 'b2b'
  })
  const [copiedFeedback, setCopiedFeedback] = useState(false)

  const industries = {
    legal: 'Legal',
    healthcare: 'Healthcare',
    technology: 'Technology',
    finance: 'Finance',
    manufacturing: 'Manufacturing'
  }

  const textTypes = {
    'technical-documentation': 'Technical Documentation',
    'marketing-content': 'Marketing Content', 
    'business-correspondence': 'Business Correspondence',
    'ui-text': 'User Interface Text'
  }

  const segments = {
    b2b: 'B2B',
    b2c: 'B2C',
    government: 'Government',
    'non-profit': 'Non-Profit'
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      setTranslatedText('نص مترجم مثال. هذا مثال على النص المترجم إلى العربية.')
      
      const newLog = {
        timestamp: new Date().toISOString(),
        quality,
        industry: industries[currentLog.industry],
        textType: textTypes[currentLog.textType],
        format: 'PDF',
        segment: segments[currentLog.segment]
      }
      
      setAuditLogs([newLog, ...auditLogs])
    } catch (err) {
      setError('Translation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText)
      setCopiedFeedback(true)
      setTimeout(() => setCopiedFeedback(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center">
          <Languages className="w-8 h-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Professional Translation Interface
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 group">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] gap-8">
          {/* Input Section */}
          <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 mr-2">EN</span>
              Source Text
            </h2>
            <div className="mb-6 relative">
              <textarea
                value={sourceText}
                onChange={(e) => {
                  if (e.target.value.length <= 10000) setSourceText(e.target.value)
                }}
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all"
                placeholder="Enter text to translate..."
                aria-label="Source text input"
                aria-describedby="characterCount"
              />
              <div id="characterCount" className="text-sm text-gray-500 mt-2 absolute right-4 bottom-4 bg-white px-2 rounded">
                {sourceText.length}/10,000
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <Select 
                label="Industry Domain"
                options={industries}
                value={currentLog.industry}
                onChange={(v) => setCurrentLog({...currentLog, industry: v})}
              />
              <Select 
                label="Content Type"
                options={textTypes}
                value={currentLog.textType}
                onChange={(v) => setCurrentLog({...currentLog, textType: v})}
              />
              <Select 
                label="Target Audience"
                options={segments}
                value={currentLog.segment}
                onChange={(v) => setCurrentLog({...currentLog, segment: v})}
              />
            </div>

            <button
              onClick={handleTranslate}
              disabled={loading || !sourceText.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all 
                      disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-[0.98]
                      flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Languages className="w-5 h-5" />
                  <span>Translate Now</span>
                </>
              )}
            </button>
          </section>

          {/* Animated Divider */}
          <div className="hidden md:block relative my-8">
            <div className="absolute inset-0 flex items-center justify-center w-6">
              <div className="h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full animate-pulse
                            group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-blue-100/30 blur-xl"></div>
            </div>
          </div>

          {/* Output Section */}
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="bg-green-100 text-green-800 rounded-lg px-3 py-1 mr-2">AR</span>
                  Translated Text
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                  aria-label="Copy translated text"
                >
                  {copiedFeedback ? (
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  ) : (
                    <Clipboard className="w-5 h-5 mr-2 text-blue-600 group-hover:text-blue-800" />
                  )}
                  <span className="font-medium">{copiedFeedback ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div 
                className="h-48 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl overflow-y-auto text-right text-lg leading-relaxed rtl"
                dir="rtl"
              >
                {translatedText || (
                  <span className="text-gray-400">Translated text will appear here...</span>
                )}
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
                Activity Log
                <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm ml-2">
                  {auditLogs.length} entries
                </span>
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
                {auditLogs.map((log, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-500 font-medium">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        log.quality === 'professional' ? 'bg-blue-100 text-blue-800' :
                        log.quality === 'standard' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {log.quality}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Industry:</span>
                        <span className="font-medium">{log.industry}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Type:</span>
                        <span className="font-medium">{log.textType}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Segment:</span>
                        <span className="font-medium">{log.segment}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <div className="text-center text-gray-400 py-4">
                    No translation history yet
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Error Message */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-50 text-red-700 p-4 rounded-xl shadow-lg flex items-center animate-fade-in-up">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </main>
    </div>
  )
}
