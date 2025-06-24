export const routes = {
  // Auth
  login: "/auth/login",
  register: "/auth/register",

  // Home
  home: "/",

  // Dashboard (Admin)
  dashboard: "/dashboard",
  dashboardUsers: "/dashboard/users",
  dashboardUserEdit: (id: string) => `/dashboard/users/${id}`,

  // User Profile
  userProfile: (id: string) => `/user/profile/${id}`,
  userProfileDetail: (id: string) => `/user/profile/${id}/detail-${id}`,

  // Posts (if implemented later)
  dashboardPosts: "/dashboard/posts",
  dashboardPostEdit: (id: string) => `/dashboard/posts/${id}`,

  // Comments (optional future)
  dashboardComments: "/dashboard/comments",
};
