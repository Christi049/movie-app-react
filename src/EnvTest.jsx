import React, { useEffect } from "react";

const EnvTest = () => {
  useEffect(() => {
    console.log("VITE_TMDB_API_KEY:", import.meta.env.VITE_TMDB_API_KEY);
    console.log("VITE_APPWRITE_PROJECT_ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);
  }, []);

  return <div>Check console for env vars</div>;
};

export default EnvTest;
