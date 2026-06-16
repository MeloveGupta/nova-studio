import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useCountUp from "@/hooks/useCountUp";

export default function StatItem({ value, suffix, label, start }) {
  const count = useCountUp(value, start);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff" }}>
        {count}
        {suffix}
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", opacity: 0.85 }}>
        {label}
      </Typography>
    </Box>
  );
}