const supabase = require('../../lib/supabase');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select(`
        *,
        users:user_id (id, name, avatar_url)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(videos);
  } catch (error) {
    console.error('Videos fetch error:', error);
    res.status(500).json({ error: error.message });
  }
};