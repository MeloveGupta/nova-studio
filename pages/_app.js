import CssBaseline from "@mui/material/CssBaseline";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
