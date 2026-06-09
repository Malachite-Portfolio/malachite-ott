import { genreRows, movies } from "@/data/movies";

export type AdminSection = {
  slug: string;
  title: string;
  group: "Content" | "Management" | "Marketing" | "System";
  metric: string;
  description: string;
};

export const adminSections: AdminSection[] = [
  {
    slug: "movies",
    title: "Movies",
    group: "Content",
    metric: movies.length.toString(),
    description: "Manage movie metadata, artwork, trailers, publishing state, and featured placement.",
  },
  {
    slug: "shows",
    title: "Shows",
    group: "Content",
    metric: "28",
    description: "Manage serialized titles, seasons, episodes, artwork, and release schedules.",
  },
  {
    slug: "categories",
    title: "Categories",
    group: "Content",
    metric: genreRows.length.toString(),
    description: "Organize catalog taxonomy, sort order, featured genres, and row visibility.",
  },
  {
    slug: "banners",
    title: "Banners",
    group: "Content",
    metric: "9",
    description: "Control hero banners, promotional placements, linked titles, and CTA content.",
  },
  {
    slug: "users",
    title: "Users",
    group: "Management",
    metric: "12.8K",
    description: "Review subscribers, profile activity, account state, and watch history.",
  },
  {
    slug: "subscriptions",
    title: "Subscriptions",
    group: "Management",
    metric: "1,426",
    description: "Manage plans, prices, devices, active subscribers, and recurring revenue.",
  },
  {
    slug: "transactions",
    title: "Transactions",
    group: "Management",
    metric: "342",
    description: "Monitor payments, refunds, methods, statuses, and transaction exports.",
  },
  {
    slug: "coupons",
    title: "Coupons",
    group: "Management",
    metric: "14",
    description: "Create promo codes, configure limits, review usage, and control activation.",
  },
  {
    slug: "referral-earnings",
    title: "Referral Earnings",
    group: "Management",
    metric: "$8.2K",
    description: "Track referral rewards, payout states, referred users, and campaign attribution.",
  },
  {
    slug: "movie-analytics",
    title: "Movie Analytics",
    group: "Management",
    metric: "89",
    description: "Review views, watch hours, trailer plays, completion rates, and genre performance.",
  },
  {
    slug: "competitions",
    title: "Competitions",
    group: "Management",
    metric: "5",
    description: "Manage audience contests, participants, prizes, schedules, and winners.",
  },
  {
    slug: "notifications",
    title: "Notifications",
    group: "Marketing",
    metric: "31",
    description: "Compose push, email, and in-app messages for selected audience segments.",
  },
  {
    slug: "advertisements",
    title: "Advertisements",
    group: "Marketing",
    metric: "12",
    description: "Manage ad campaigns, placements, creative previews, impressions, and clicks.",
  },
  {
    slug: "settings",
    title: "Settings",
    group: "System",
    metric: "Ready",
    description: "Configure platform, branding, and streaming defaults for the demo app.",
  },
  {
    slug: "reports",
    title: "Reports",
    group: "System",
    metric: "18",
    description: "Generate revenue, user, content, and engagement exports for demo operations.",
  },
];

export const adminMovies = movies.slice(0, 18).map((movie, index) => ({
  ...movie,
  category: movie.genre,
  status: index % 5 === 0 ? "Draft" : index % 7 === 0 ? "Unpublished" : "Published",
  views: 94000 - index * 3125,
  revenue: 18200 - index * 430,
  featured: index % 4 === 0,
}));

export const adminShows = [
  { title: "Emerald City Files", seasons: 3, episodes: 28, category: "Mystery", status: "Published", views: 84200 },
  { title: "Midnight Signal", seasons: 2, episodes: 16, category: "Sci-Fi", status: "Draft", views: 31800 },
  { title: "The Crowned Table", seasons: 4, episodes: 42, category: "Drama", status: "Published", views: 77100 },
  { title: "After Dark Live", seasons: 1, episodes: 9, category: "Thriller", status: "Scheduled", views: 22400 },
  { title: "The Archive Room", seasons: 2, episodes: 18, category: "Crime", status: "Published", views: 54500 },
  { title: "Greenlight Stories", seasons: 5, episodes: 50, category: "Comedy", status: "Published", views: 68600 },
];

export const adminCategories = genreRows.map((row, index) => ({
  name: row.title,
  count: row.movies.length,
  featured: index % 3 === 0,
  sortOrder: index + 1,
  status: index % 6 === 0 ? "Hidden" : "Visible",
}));

export const adminBanners = movies.slice(0, 6).map((movie, index) => ({
  title: movie.title,
  subtitle: movie.description.slice(0, 92),
  imageUrl: movie.backdropUrl,
  linkedTitle: movie.title,
  ctaText: index % 2 === 0 ? "Watch Trailer" : "Explore Now",
  status: index % 4 === 0 ? "Inactive" : "Active",
  order: index + 1,
}));

export const adminUsers = [
  { name: "Ava Stone", email: "ava@example.com", plan: "Premium", status: "Active", watchTime: "128h", joined: "2026-01-12" },
  { name: "Noah Reed", email: "noah@example.com", plan: "Standard", status: "Active", watchTime: "82h", joined: "2026-02-08" },
  { name: "Mira Khan", email: "mira@example.com", plan: "Premium", status: "Subscribed", watchTime: "146h", joined: "2025-12-19" },
  { name: "Leo Park", email: "leo@example.com", plan: "Basic", status: "Inactive", watchTime: "21h", joined: "2026-04-03" },
  { name: "Iris Chen", email: "iris@example.com", plan: "Standard", status: "Active", watchTime: "64h", joined: "2026-03-15" },
];

export const watchHistory = ["Dune", "John Wick", "Interstellar", "The Dark Knight"];

export const adminPlans = [
  { name: "Basic", price: "$5.99", devices: 1, quality: "HD", activeUsers: 420, revenue: "$2,516", status: "Active" },
  { name: "Standard", price: "$9.99", devices: 2, quality: "Full HD", activeUsers: 611, revenue: "$6,103", status: "Active" },
  { name: "Premium", price: "$14.99", devices: 4, quality: "4K HDR", activeUsers: 395, revenue: "$5,921", status: "Active" },
];

export const adminTransactions = [
  { id: "TXN-1042", user: "Ava Stone", plan: "Premium", amount: "$14.99", method: "Card", status: "Success", date: "2026-06-07" },
  { id: "TXN-1041", user: "Noah Reed", plan: "Standard", amount: "$9.99", method: "UPI", status: "Pending", date: "2026-06-06" },
  { id: "TXN-1040", user: "Mira Khan", plan: "Premium", amount: "$14.99", method: "Card", status: "Refunded", date: "2026-06-05" },
  { id: "TXN-1039", user: "Leo Park", plan: "Basic", amount: "$5.99", method: "Wallet", status: "Failed", date: "2026-06-05" },
  { id: "TXN-1038", user: "Iris Chen", plan: "Standard", amount: "$9.99", method: "Card", status: "Success", date: "2026-06-04" },
];

export const adminCoupons = [
  { code: "MALA30", type: "Percent", value: "30%", limit: 500, used: 184, expiry: "2026-07-01", status: "Active" },
  { code: "FIRST100", type: "Flat", value: "$1.00", limit: 1000, used: 622, expiry: "2026-08-15", status: "Active" },
  { code: "PREMIUM7", type: "Trial", value: "7 days", limit: 250, used: 91, expiry: "2026-06-30", status: "Inactive" },
];

export const adminReferrals = [
  { referrer: "Ava Stone", referred: "Ray Miles", amount: "$12", status: "Pending", date: "2026-06-07" },
  { referrer: "Mira Khan", referred: "Sana Roy", amount: "$18", status: "Paid", date: "2026-06-06" },
  { referrer: "Noah Reed", referred: "Ken Fox", amount: "$10", status: "Pending", date: "2026-06-05" },
];

export const topMovies = adminMovies.slice(0, 6).map((movie, index) => ({
  title: movie.title,
  views: movie.views,
  watchHours: 12400 - index * 740,
  trailerPlays: 5200 - index * 360,
  completion: `${88 - index * 3}%`,
}));

export const genrePerformance = genreRows.slice(0, 8).map((row, index) => ({
  genre: row.title,
  views: 82000 - index * 6200,
  completion: 86 - index * 4,
}));

export const adminCompetitions = [
  { title: "Weekend Watch Quest", prize: "$500", start: "2026-06-01", end: "2026-06-14", status: "Active", participants: 1840 },
  { title: "Trailer Trivia", prize: "$250", start: "2026-06-12", end: "2026-06-20", status: "Scheduled", participants: 640 },
  { title: "Family Movie Marathon", prize: "$300", start: "2026-05-10", end: "2026-05-20", status: "Closed", participants: 2210 },
];

export const adminParticipants = [
  { name: "Ava Stone", points: 940, status: "Eligible" },
  { name: "Noah Reed", points: 820, status: "Eligible" },
  { name: "Mira Khan", points: 780, status: "Review" },
];

export const sentNotifications = [
  { title: "New blockbusters added", audience: "All users", status: "Sent", time: "2026-06-07 18:00" },
  { title: "Premium trial reminder", audience: "Trial users", status: "Scheduled", time: "2026-06-10 10:00" },
  { title: "Payment failed", audience: "Failed payments", status: "Failed", time: "2026-06-06 09:30" },
];

export const adCampaigns = [
  { name: "Premium Summer", placement: "Home Hero", mediaUrl: movies[0].backdropUrl, start: "2026-06-01", end: "2026-06-30", impressions: 940000, clicks: 28400, status: "Active" },
  { name: "Family Weekend", placement: "Rows", mediaUrl: movies[54].backdropUrl, start: "2026-06-05", end: "2026-06-16", impressions: 410000, clicks: 12200, status: "Active" },
  { name: "Horror Nights", placement: "Pre-roll", mediaUrl: movies[24].backdropUrl, start: "2026-06-12", end: "2026-06-20", impressions: 260000, clicks: 7800, status: "Inactive" },
];

export const reportRows = [
  { name: "Revenue report", total: "$42.6K", date: "June 2026", status: "Ready" },
  { name: "User report", total: "12.8K users", date: "June 2026", status: "Ready" },
  { name: "Content report", total: `${movies.length} movies`, date: "June 2026", status: "Ready" },
  { name: "Engagement report", total: "68% completion", date: "June 2026", status: "Ready" },
];
