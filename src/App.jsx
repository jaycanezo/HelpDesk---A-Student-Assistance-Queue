import { useEffect, useState } from 'react'
import { useTheme } from './context/ThemeContext.jsx'
import { compareRequests, isRequest, REQUEST_STORAGE_KEY } from './queue.js'
import Header from './components/Header.jsx'
import QueueSummary from './components/QueueSummary.jsx'
import RequestForm from './components/RequestForm.jsx'
import RequestList from './components/RequestList.jsx'

export default function App() {
  const [requests, setRequests] = useState(loadRequests)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [storageWarning, setStorageWarning] = useState(false)
  const { theme } = useTheme()

  const waitingCount = requests.filter((request) => request.status === 'Waiting').length
  const resolvedCount = requests.length - waitingCount
  const visibleRequests = requests
    .filter((request) => selectedFilter === 'All' || request.status === selectedFilter)
    .slice()
    .sort(compareRequests)

  useEffect(() => {
    try {
      window.localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests))
      setStorageWarning(false)
    } catch {
      setStorageWarning(true)
    }
  }, [requests])

  useEffect(() => {
    const originalTitle = document.title
    document.title = `HelpDesk - ${waitingCount} waiting`
    return () => {
      document.title = originalTitle
    }
  }, [waitingCount])

  function addRequest({ studentName, concern, priority }) {
    const newRequest = {
      id: crypto.randomUUID(),
      studentName,
      concern,
      priority,
      status: 'Waiting',
      createdAt: Date.now(),
    }
    setRequests((previous) => [...previous, newRequest])
  }

  function resolveRequest(requestId) {
    setRequests((previous) => previous.map((request) => (
      request.id === requestId ? { ...request, status: 'Resolved' } : request
    )))
  }

  function deleteRequest(requestId) {
    setRequests((previous) => previous.filter((request) => request.id !== requestId))
  }

  return (
    <div className="app-shell" data-theme={theme}>
      <Header />
      <main className="main-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Laboratory support</p>
            <h1>Student assistance queue</h1>
          </div>
          <p className="page-description">Requests are kept on this device.</p>
        </div>
        {storageWarning && (
          <p className="storage-warning" role="alert">
            Browser storage is unavailable. Requests may not be restored after refreshing.
          </p>
        )}
        <QueueSummary waiting={waitingCount} resolved={resolvedCount} total={requests.length} />
        <div className="workspace-grid">
          <RequestForm onSubmitRequest={addRequest} />
          <RequestList
            requests={visibleRequests}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            onResolve={resolveRequest}
            onDelete={deleteRequest}
          />
        </div>
      </main>
    </div>
  )
}

function loadRequests() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(REQUEST_STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter(isRequest) : []
  } catch {
    return []
  }
}