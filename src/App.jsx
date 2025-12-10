import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || "https://ini8server-production.up.railway.app"

function App() {
  const [file, setFile] = useState(null)
  const [docs, setDocs] = useState([])
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_URL}/documents`)
      const data = await res.json()
      setDocs(data)
    } catch (err) {
      console.error(err)
      setMessage('Failed to fetch documents')
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return

    if (file.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      setMessage('File uploaded successfully')
      setFile(null)
      await fetchDocuments()
    } catch (err) {
      setMessage(err.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/documents/${id}`, { method: 'DELETE' })
      await fetchDocuments()
    } catch (err) {
      console.error(err)
      setMessage('Failed to delete document')
    }
  }

  const handleDownload = (id) => {
    window.location.href = `${API_URL}/documents/${id}`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center overflow-hidden relative">
      {/* soft glow background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-10 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <div className="w-full max-w-3xl px-4 py-10">
        {/* 3D card wrapper */}
        <div className="relative transform-gpu transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(15,23,42,0.9)] shadow-[0_18px_45px_rgba(15,23,42,0.8)] rounded-3xl border border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
          {/* top gradient line for depth */}
          <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-sky-400/0 via-sky-400/80 to-emerald-400/0" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* header */}
            <header className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 shadow-lg shadow-sky-500/40 text-slate-950 text-lg font-bold">
                    P
                  </span>
                  Patient Document Portal
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400">
                  Securely upload, store and manage patient PDFs
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-right text-[10px] text-slate-500">
                <span className="uppercase tracking-[0.18em] text-slate-400">
                  INI8 Labs
                </span>
                <span className="mt-1 rounded-full border border-slate-700/70 bg-slate-900/80 px-2 py-0.5 text-[10px] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Assignment
                </span>
              </div>
            </header>

            {/* toast / message */}
            {message && (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-50 shadow-lg shadow-emerald-500/20 flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <p>{message}</p>
              </div>
            )}

            {/* upload card */}
            <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr] items-stretch">
              <form
                onSubmit={handleUpload}
                className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 transform-gpu transition-all duration-300 hover:border-sky-500/60 hover:shadow-xl hover:shadow-sky-500/10"
              >
                <p className="text-sm font-medium text-slate-100">
                  Upload a new PDF
                </p>
                <p className="text-xs text-slate-400">
                  Only <span className="font-semibold text-slate-200">.pdf</span> files
                  are accepted. Max size defined by server limits.
                </p>

                <label className="mt-2 block cursor-pointer">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Choose file
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-xs text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-sky-500 file:to-emerald-400 file:px-4 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-slate-950 file:shadow-md file:shadow-sky-500/30 hover:file:brightness-110 "
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transform-gpu transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(34,211,238,0.55)] active:translate-y-0 active:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-slate-900 border-t-transparent" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <span>Upload PDF</span>
                    </>
                  )}
                </button>
              </form>

              {/* small stats / 3D decorative panel */}
              <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-900/20 p-4 sm:p-5 flex flex-col justify-between transform-gpu transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Overview
                  </p>
                  <p className="text-4xl font-semibold text-slate-50">
                    {docs.length}
                    <span className="ml-2 text-sm font-normal text-slate-400">
                      files
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    Documents are stored securely in a shared database for your
                    organisation.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                      Backend
                    </p>
                    <p className="mt-1 font-medium">Express + Supabase</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">
                      Frontend
                    </p>
                    <p className="mt-1 font-medium">React + Tailwind</p>
                  </div>
                </div>
              </div>
            </div>

            {/* documents list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-100">
                  Uploaded documents
                </h2>
                <span className="rounded-full border border-slate-700/70 bg-slate-900/60 px-2 py-0.5 text-[10px] text-slate-400">
                  {docs.length === 0 ? 'No files yet' : 'Click to download or delete'}
                </span>
              </div>

              {docs.length === 0 && (
                <p className="text-xs text-slate-500">
                  Once you upload a PDF, it will appear here with options to
                  download or delete.
                </p>
              )}

              <ul className="space-y-2.5">
                {docs.map((doc) => (
                  <li
                    key={doc.id}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-xs sm:text-sm transform-gpu transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-500/15"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-sky-500/15 text-[11px] text-sky-300 border border-sky-500/30">
                          PDF
                        </span>
                        <p className="font-medium truncate text-slate-50">
                          {doc.filename}
                        </p>
                      </div>
                      <div className="mt-1 pl-8 text-[11px] text-slate-400">
                        {(doc.filesize / 1024).toFixed(1)} KB ·{' '}
                        {new Date(doc.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 gap-2">
                      <button
                        onClick={() => handleDownload(doc.id)}
                        className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 shadow-sm transform-gpu transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:border-sky-400/70 hover:text-sky-100 cursor-pointer"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-3 py-1.5 text-[11px] font-medium text-slate-50 shadow-md shadow-rose-500/40 transform-gpu transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(248,113,113,0.75)] active:translate-y-0 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* tiny footer */}
        <p className="mt-4 text-[10px] text-center text-slate-500">
          Built for INI8 Labs 
        </p>
      </div>
    </div>
  )
}

export default App
