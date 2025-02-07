import { prototype } from "events";
import type { NextConfig } from "next";
import { hostname } from "os";


  /* config options here */
  const nextConfig:NextConfig ={
    eslint: {
      // Disable ESLint during production build
      ignoreDuringBuilds: true,
    },
    images:{
      remotePatterns:[
        {
          protocol:"https",
          hostname:"cdn.sanity.io"
        },
      ]
    }
  };


export default nextConfig;
