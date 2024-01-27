import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook", "/api/chatgpt"],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt", "/", "/subscribe"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
