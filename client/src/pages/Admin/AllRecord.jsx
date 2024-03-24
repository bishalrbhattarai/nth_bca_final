import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Download, Phone, Search } from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const AllRecord = () => {
  console.log(import.meta.env.VITE_API_URL);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllRecords = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/record/all-records`
      );
      setRecords(data.records);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const downloadImage = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imageUrl.split("profilePic-")[1]);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return records?.length > 0 ? (
    <>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: <Search />,
            sx: {
              borderRadius: 40,
            },
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredRecords.map((record) => (
          <Grid item key={record._id} xs={12} sm={6} md={4} lg={3}>
            <Card elevation={5} sx={{ height: "100%" }}>
              <CardContent>
                <Avatar
                  alt="No-Image Found"
                  src={`${import.meta.env.VITE_API_URL}/${record.profilePic}`}
                  sx={{ width: 150, height: 150, margin: "auto" }}
                />
                <Typography textAlign={"center"} variant="h5" mt={2}>
                  {record.name}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Phone />
                  <Typography variant="body1" ml={1}>
                    {record.phoneNumber}
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Button
                    fullWidth
                    endIcon={<Download />}
                    variant="contained"
                    onClick={() =>
                      downloadImage(
                        `${import.meta.env.VITE_API_URL}/${record.profilePic}`
                      )
                    }
                  >
                    Download Image
                  </Button>
                </Box>
                <Box mt={1}>
                  <Button
                    fullWidth
                    sx={{
                      backgroundColor: "#0c1c55",
                    }}
                    endIcon={<PictureAsPdfIcon />}
                    variant="contained"
                    href={`${import.meta.env.VITE_API_URL}/${record.pdfFile}`}
                    download
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <>
      <Typography variant="h5" align="center" pt={10} sx={{ color: "#0c1c55" }}>
        No Records to Show
        <IconButton>
          <InfoIcon sx={{ color: "red", fontSize: "30px" }} />
        </IconButton>
      </Typography>
    </>
  );
};

export default AllRecord;
