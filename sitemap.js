const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream");

const baseUrl = "https://ridefraser.com";
const driverSubdomain = "https://driver.ridefraser.com";
const adminSubdomain = "https://admin.ridefraser.com";

const landingPage = "/";
const availableTrip = "/bookings";
const signIn = "/signin";
const signUp = "/signup";
const bookARide = "/bookaride";
const checkOut = "/checkout";
const notFound = "*";
const termsOfService = "/termsofservice";

const driverPortal = "/";
const driverLogin = "/driverlogin";
const driverSignup = "/driversignup";

const adminDashboard = "/";
const adminLogin = "/login";

const routes = [
  { url: landingPage, priority: 1 },
  { url: bookARide, priority: 0.9 },
  { url: signIn, priority: 0.8 },
  { url: signUp, priority: 0.8 },
  { url: availableTrip, priority: 0.7 },
  { url: checkOut, priority: 0.6 },
  { url: notFound, priority: 0.5 },
  { url: termsOfService, priority: 0.4 },
];

const driverRoutes = [
  { url: driverPortal, priority: 1 },
  { url: driverLogin, priority: 0.8 },
  { url: driverSignup, priority: 0.8 },
];

const adminRoutes = [
  { url: adminDashboard, priority: 1 },
  { url: adminLogin, priority: 0.8 },
];

const sitemap = new SitemapStream({
  hostname: baseUrl,
  cacheTime: 600000, // 600 sec - cache purge period
  urls: [
    ...routes.map((route) => ({ ...route, url: `${baseUrl}${route.url}` })),
    ...driverRoutes.map((route) => ({
      ...route,
      url: `${driverSubdomain}${route.url}`,
    })),
    ...adminRoutes.map((route) => ({
      ...route,
      url: `${adminSubdomain}${route.url}`,
    })),
  ],
});

// Create a write stream for the sitemap.xml file
const writeStream = createWriteStream("./public/sitemap.xml");
const gzip = createGzip();

// Pipe the sitemap stream to the gzip and then to the write stream
pipeline(sitemap, gzip, writeStream, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

writeStream.on("finish", () => {
  // Log a success message
  console.log("Sitemap generated successfully!");
});
