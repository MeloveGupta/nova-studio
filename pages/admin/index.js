import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { isValidSession } from "@/lib/auth";

const categories = ["Web Design", "Front-End Development", "Branding"];

export async function getServerSideProps(context) {
  const token = context.req.cookies.admin_session;

  if (!isValidSession(token)) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default function AdminDashboard() {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [newProject, setNewProject] = useState({ title: "", category: "", image: "" });
  const [projectErrors, setProjectErrors] = useState({});
  const [projectStatus, setProjectStatus] = useState(null);
  const [addingProject, setAddingProject] = useState(false);

  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setContactsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load contacts:", err);
        setContactsLoading(false);
      });

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setProjectsLoading(false);
      });

    fetch("/api/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then((data) => {
        setAnalytics(data);
        setAnalyticsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load analytics:", err);
        setAnalyticsLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const validateProject = () => {
    const errors = {};
    if (!newProject.title.trim()) errors.title = "Title is required";
    if (!newProject.category) errors.category = "Category is required";
    if (!newProject.image.trim()) errors.image = "Image path is required";
    return errors;
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const errors = validateProject();

    if (Object.keys(errors).length > 0) {
      setProjectErrors(errors);
      return;
    }

    setProjectErrors({});
    setAddingProject(true);
    setProjectStatus(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) throw new Error("Failed to add project");

      const created = await res.json();
      setProjects([...projects, created]);
      setNewProject({ title: "", category: "", image: "" });
      setProjectStatus("success");
    } catch (err) {
      console.error("Add project error:", err);
      setProjectStatus("error");
    } finally {
      setAddingProject(false);
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Failed to delete project. Please try again.");
    }
  };

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Nova Studio Admin
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Analytics Overview
        </Typography>

        {analyticsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
              mb: 4,
              maxWidth: 500,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {analytics?.pageVisits ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Page Visits
              </Typography>
            </Paper>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {analytics?.ctaClicks ?? 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CTA Clicks
              </Typography>
            </Paper>
          </Box>
        )}

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Contact Submissions
        </Typography>

        {contactsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : contacts.length === 0 ? (
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            No submissions yet.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    <TableCell>
                      {new Date(contact.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Manage Projects
        </Typography>

        <Box
          component="form"
          onSubmit={handleAddProject}
          sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mb: 4 }}
        >
          <TextField
            label="Title"
            name="title"
            value={newProject.title}
            onChange={handleProjectChange}
            error={!!projectErrors.title}
            helperText={projectErrors.title}
            fullWidth
          />
          <TextField
            select
            label="Category"
            name="category"
            value={newProject.category}
            onChange={handleProjectChange}
            error={!!projectErrors.category}
            helperText={projectErrors.category}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Image Path"
            name="image"
            placeholder="/images/project7.jpg"
            value={newProject.image}
            onChange={handleProjectChange}
            error={!!projectErrors.image}
            helperText={projectErrors.image || "Path of an image inside public/images"}
            fullWidth
          />

          {projectStatus === "success" && (
            <Alert severity="success">Project added successfully!</Alert>
          )}
          {projectStatus === "error" && (
            <Alert severity="error">Failed to add project. Please try again.</Alert>
          )}

          <Button type="submit" variant="contained" disabled={addingProject}>
            {addingProject ? "Adding..." : "Add Project"}
          </Button>
        </Box>

        {projectsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.image}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProject(project.id)}
                        aria-label="delete project"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}