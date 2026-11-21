- **fix(usage):** Count retained provider URLs in the pending-request byte estimate so URL
  growth participates in the existing ceiling. Restart running processes when installing this
  estimator change, including development servers with live pending state.
