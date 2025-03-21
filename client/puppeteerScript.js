module.exports = async (page) => {
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const url = request.url();

    // Log the intercepted URL
    console.log(`Intercepted URL: ${url}`);

    // Skip requests to Google's authentication service
    if (url.startsWith("https://accounts.google.com/gsi/client")) {
      console.log(`Aborting request: ${url}`);
      return request.abort();
    }

    request.continue();
  });
};
