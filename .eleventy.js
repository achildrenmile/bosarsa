module.exports = function(eleventyConfig) {
  // Passthrough copy — static assets stay in root
  eleventyConfig.addPassthroughCopy({ "fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "*.mp4": "/" });
  eleventyConfig.addPassthroughCopy({ "*.png": "/" });
  eleventyConfig.addPassthroughCopy({ "*.webp": "/" });
  eleventyConfig.addPassthroughCopy("src/css");

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
