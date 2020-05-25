import { SECURES } from '../db/in-memory-db';

export const saveSecure = (req: any, res: any) => {
  const secure = req.body;

  SECURES.push(secure);
  console.log('Added secure', secure);

  res.status(200).json({ message: 'Secure added with success!' });
};

export const listSecures = (req: any, res: any) => {
    res.status(200).json(SECURES)
}
