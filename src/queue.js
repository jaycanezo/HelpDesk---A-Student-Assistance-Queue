export const REQUEST_STORAGE_KEY = 'helpdesk-requests'

export function isRequest(value) {
  return Boolean(
    value
    && typeof value === 'object'
    && typeof value.id === 'string'
    && value.id.trim()
    && typeof value.studentName === 'string'
    && value.studentName.trim()
    && typeof value.concern === 'string'
    && value.concern.trim()
    && (value.priority === 'High' || value.priority === 'Normal')
    && (value.status === 'Waiting' || value.status === 'Resolved')
    && Number.isFinite(value.createdAt)
    && Number.isFinite(new Date(value.createdAt).getTime()),
  )
}

export function compareRequests(first, second) {
  const priorityDifference = Number(first.priority !== 'High') - Number(second.priority !== 'High')
  return priorityDifference || first.createdAt - second.createdAt
}