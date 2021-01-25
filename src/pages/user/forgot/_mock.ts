import type { Request, Response } from 'express'

export default {
  'POST  /api/forgot/account': (req: Request, res: Response) => {
    const { email } = req.body
    if (email === 'caohv.dev@gmail.com') {
      res.send({
        status: 'ok',
      })
      return
    }
    res.send({
      status: 'error',
    })
  },
}
