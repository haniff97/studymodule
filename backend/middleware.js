export function authRequired(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

export function adminRequired(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.session.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
