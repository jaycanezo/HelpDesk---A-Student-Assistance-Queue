import RequestCard from './RequestCard.jsx'

const filters = ['All', 'Waiting', 'Resolved']

export default function RequestList({ requests, selectedFilter, onFilterChange, onResolve, onDelete }) {
  return (
    <section className="queue-panel" aria-labelledby="queue-title">
      <div className="section-heading queue-heading">
        <div>
          <p className="section-kicker">Live board</p>
          <h2 id="queue-title">Assistance queue</h2>
        </div>
        <span className="queue-count">{requests.length} shown</span>
      </div>
      <div className="filter-row">
        <span className="filter-label" id="filter-label">Show</span>
        <fieldset className="filter-control">
          <legend className="visually-hidden">Filter requests</legend>
          {filters.map((filter) => (
            <button
              aria-pressed={selectedFilter === filter}
              className={`filter-button${selectedFilter === filter ? ' is-active' : ''}`}
              key={filter}
              onClick={() => onFilterChange(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </fieldset>
      </div>
      {requests.length > 0 ? (
        <ul className="request-list">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onResolve={onResolve}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-mark" aria-hidden="true">—</span>
          <h3>{selectedFilter === 'All' ? 'The queue is clear' : `No ${selectedFilter.toLowerCase()} requests`}</h3>
          <p>{selectedFilter === 'All' ? 'New student requests will appear here.' : 'Try another status filter to see more requests.'}</p>
        </div>
      )}
    </section>
  )
}