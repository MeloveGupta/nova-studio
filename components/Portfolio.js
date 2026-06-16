import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import useInView from "@/hooks/useInView";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, inView] = useInView();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box id="portfolio" ref={sectionRef} sx={{ py: 8, bgcolor: "grey.50" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
        >
          Our Portfolio
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, textAlign: "center" }}
        >
          A selection of our recent work
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={inView ? "fade-in-up" : ""}
                sx={{
                  opacity: inView ? 1 : 0,
                  animationDelay: `${index * 0.1}s`,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: "relative", width: "100%", height: 200 }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {project.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}