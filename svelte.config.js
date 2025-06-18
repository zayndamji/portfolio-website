import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // default options are usually fine
      pages: 'build',     // output directory for static files
      assets: 'build',    // assets directory
      fallback: null,     // if using SPA fallback, set to 'index.html'
      precompress: false, // optional gzip brotli compression
    })
  }
};
