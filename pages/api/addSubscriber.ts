import addSubscriberFb from '../../lib/addSubscriberFb';

export default async function addSubscriber(req, res) {
  const result = await addSubscriberFb(req.body);
  if (result.error) {
    return res.status(200).json({ error: true, message: result.message });
  }
  res.status(200).json({ error: false, message: result.message });
}
