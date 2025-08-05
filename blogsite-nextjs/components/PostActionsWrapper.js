// components/PostActionsWrapper.jsx
"use client";

import dynamic from "next/dynamic";

// directly import PostActions as a client component (no ssr:false needed because this file is client)
const PostActions = dynamic(() => import("./PostActions"), { ssr: false });

export default function PostActionsWrapper({ postId, authorId }) {
  // we only pass simple props down to the real client component
  return <PostActions postId={postId} authorId={authorId} />;
}
