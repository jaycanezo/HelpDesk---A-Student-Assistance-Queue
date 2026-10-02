import { useEffect, useRef, useState } from 'react'

export default function RequestForm({ onSubmitRequest }) {
  const [studentName, setStudentName] = useState('')
  const [concern, setConcern] = useState('')
  const [priority, setPriority] = useState('Normal')
  const [validationMessage, setValidationMessage] = useState('')
  const nameInputRef = useRef(null)
  const concernInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = studentName.trim()
    const trimmedConcern = concern.trim()

    if (!trimmedName) {
      setValidationMessage('Enter a student name to add this request.')
      nameInputRef.current?.focus()
      return
    }

    if (!trimmedConcern) {
      setValidationMessage('Describe the concern before adding this request.')
      concernInputRef.current?.focus()
      return
    }

    onSubmitRequest({ studentName: trimmedName, concern: trimmedConcern, priority })
    setStudentName('')
    setConcern('')
    setPriority('Normal')
    setValidationMessage('')
    nameInputRef.current?.focus()
  }

  return (
    <section className="form-panel" aria-labelledby="request-form-title">
      <div className="section-heading">
        <div>
          <p className="section-kicker">New request</p>
          <h2 id="request-form-title">Ask for help</h2>
        </div>
        <span className="step-mark" aria-hidden="true">01</span>
      </div>
      <form className="request-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label htmlFor="student-name">Student name</label>
          <input
            ref={nameInputRef}
            id="student-name"
            name="studentName"
            autoComplete="name"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="e.g. Ana Rivera"
          />
        </div>
        <div className="field-group">
          <label htmlFor="student-concern">What do you need help with?</label>
          <textarea
            ref={concernInputRef}
            id="student-concern"
            name="concern"
            rows="4"
            value={concern}
            onChange={(event) => setConcern(event.target.value)}
            placeholder="Describe the issue or question..."
          />
        </div>
        <div className="field-group">
          <label htmlFor="request-priority">Priority</label>
          <select
            id="request-priority"
            name="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        {validationMessage && <p className="validation-message" role="alert">{validationMessage}</p>}
        <button className="submit-button" type="submit">Add to queue <span aria-hidden="true">+</span></button>
      </form>
      <p className="form-footnote">Your request is saved in this browser on this device.</p>
    </section>
  )
}