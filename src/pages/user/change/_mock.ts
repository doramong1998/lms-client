import type { Request, Response } from 'express'

export default {
  'POST  /api/changePassword/account': (req: Request, res: Response) => {
    const { newPassword, confirmPassword, resetToken } = req.body
    if (newPassword === '123123' && confirmPassword === '123123' && resetToken === '') {
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
