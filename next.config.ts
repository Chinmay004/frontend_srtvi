// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "res.cloudinary.com",
//        "assets.bayut.com", 
//        "oss.pixxicrm.com", 
//        "s3-ap-southeast-1.amazonaws.com"
//     ], 
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//       {
//         protocol: "https",
//         hostname: "assets.bayut.com",
//       },
//       {
//         protocol: "https",
//         hostname: "oss.pixxicrm.com",
//       },
//       {
//         protocol: "https",
//         hostname: "s3-ap-southeast-1.amazonaws.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.bayut.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oss.pixxicrm.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pixxicrm.ae",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
