import { useLoaderData } from "react-router";

export function SafeLoaderWrapper({ children }) {
  let loaderData;
  try {
    loaderData = useLoaderData();
  } catch (error) {
    console.error("Loader data error:", error);
    loaderData = { showForm: false };
  }
  
  return children(loaderData);
}