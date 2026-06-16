import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Hero() {
  const handleCtaClick = () => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "cta_click", page: "/" }),
    }).catch((err) => console.error("Failed to log CTA click:", err));

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      id="hero"
      className="fade-in-up"
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "grey.100",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Nova Studio
        </Typography>

        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Creative Digital Solutions for Modern Brands
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          We design and build websites, brands, and digital experiences that help businesses grow online.
        </Typography>

        <Button variant="contained" size="large" onClick={handleCtaClick}>
          Start a Project
        </Button>
      </Container>
    </Box>
  );
}