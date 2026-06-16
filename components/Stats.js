import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import StatItem from "@/components/StatItem";
import useInView from "@/hooks/useInView";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, inView] = useInView();

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      id="stats"
      ref={sectionRef}
      sx={{ py: 8, bgcolor: "primary.main" }}
    >
      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress sx={{ color: "#fff" }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {stats.map((stat) => (
              <StatItem
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                start={inView}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}