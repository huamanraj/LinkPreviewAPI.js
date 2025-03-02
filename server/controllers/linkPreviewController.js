const metaFetcher = require('meta-fetcher');

const getLinkPreview = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    // Fetch metadata using meta-fetcher
    const metadata = await metaFetcher(url);
    
    // Log the fetched metadata for debugging
    console.log('Fetched metadata:', metadata);
    
    // Extract and format the relevant data
    const response = {
      title: metadata.metadata.title || '',
      description: metadata.metadata.description || '',
      favicon: metadata.favicons?.[0] || '',
      ogImage: metadata.metadata.banner || '',
      url: metadata.metadata.website || url,
      siteName: metadata.metadata.title || '',
      type: 'website'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching link preview:', error);
    
    // Handle different types of errors
    if (error.message?.includes('ENOTFOUND') || error.message?.includes('fetch failed')) {
      return res.status(404).json({ error: 'Could not reach the specified URL' });
    }
    
    res.status(500).json({ error: 'Error fetching link preview' });
  }
};

module.exports = {
  getLinkPreview
};
