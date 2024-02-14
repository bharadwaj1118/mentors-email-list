import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/api/chatgpt",
    "/blog",
    "/blog/(.*)",
    "/subscribe",
    "/support",
    "/terms",
    "/privacy",
    "/about",
    "/pricing",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt", "/", "/subscribe"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
