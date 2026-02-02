"use client";

import React from "react";
import Chat from "./components/chat";

// Main page component
export default function Page() {
  return <Chat autoResume={false} />;
}
