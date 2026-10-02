function formatCreatedAt(timestamp) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp)
}

export default function RequestCard({ request, onResolve, onDelete }) {
  return (
    <li className={`request-card${request.status === 'Resolved' ? ' is-resolved' : ''}`}>
      <div className="request-card-topline">
        <span className={`priority-tag${request.priority === 'High' ? ' priority-high' : ''}`}>
          <span className="priority-dot" aria-hidden="true" />
          {request.priority} priority
        </span>
        <span className={`status-tag status-${request.status.toLowerCase()}`}>{request.status}</span>
      </div>
      <div className="request-card-content">
        <h3>{request.studentName}</h3>
        <p>{request.concern}</p>
      </div>
      <div className="request-card-footer">
        <time dateTime={new Date(request.createdAt).toISOString()}>{formatCreatedAt(request.createdAt)}</time>
        <div className="request-actions">
          {request.status === 'Waiting' && (
            <button className="resolve-button" onClick={() => onResolve(request.id)} type="button">
              Resolve
            </button>
          )}
          <button
            aria-label={`Delete request from ${request.studentName}`}
            className="delete-button"
            onClick={() => onDelete(request.id)}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}