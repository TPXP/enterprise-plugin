const type = 'kinesis'

function eventType(event = {}) {
  const { Records = [] } = event
  const [firstEvent = {}] = Records
  const { eventVersion, eventSource } = firstEvent
  return eventVersion === '1.0' && eventSource === 'aws:kinesis' ? type : false
}

export { eventType }
