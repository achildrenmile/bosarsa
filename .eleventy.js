module.exports = function(eleventyConfig) {
  // Passthrough copy — static assets stay in root
  eleventyConfig.addPassthroughCopy({ "fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "*.mp4": "/" });
  eleventyConfig.addPassthroughCopy({ "*.png": "/" });
  eleventyConfig.addPassthroughCopy({ "*.webp": "/" });
  eleventyConfig.addPassthroughCopy({ "*.pdf": "/" });
  eleventyConfig.addPassthroughCopy({ "presseaussendungen": "presseaussendungen" });
  eleventyConfig.addPassthroughCopy({ "js": "js" });
  eleventyConfig.addPassthroughCopy("src/css");
  // Altbestand: auf der Live-Seite ausgeliefert, nicht verlinkt, ohne Quell-Template (siehe SYNC-LIVE-2026-11.md)
  eleventyConfig.addPassthroughCopy({ "legacy/aktuelles": "aktuelles" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
