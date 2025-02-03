import React, { useEffect, useState } from 'react';
import './AdminHomePage.css';
import { Line } from 'react-chartjs-2'; // Using Line chart
import axios from 'axios';
import { Pie } from 'react-chartjs-2';  // Importing Pie chart from chart.js
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Toolbar, Typography, IconButton, Checkbox, Button, Modal, Box, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Footer from '../../../Footer/Footer'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Registering the necessary components for the Line chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
);

const AdminHomePage = () => {
    const [signupData, setSignupData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [votes, SetVotes] = useState([]);
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);  // Modal state
    const [userId, setUserId] = useState(null);  // Store the user id to update
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedPhone, setUpdatedPhone] = useState('');

    // Fetch Users
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data)
            }).catch((error) => console.log(error))
    }, []);

    // Fetching user signups data for graph 
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/user-signups`)
            .then((response) => {
                setSignupData(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    // fetch votes data for pie chart
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/votes/pie-chart`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = response.data;
                    const labels = data.map((item) => item.candidateName);
                    const votes = data.map((item) => item.totalVotes);

                    const pieData = {
                        labels: labels,
                        datasets: [{
                            data: votes,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'],
                            hoverBackgroundColor: ['#FF4971', '#58A4D9', '#FFD966', '#FF6F61'],
                        }]
                    };
                    setPieChartData(pieData);
                    console.log("data successfully fetched", pieData); // Check the data structure
                } else {
                    console.error("No data found in the response");
                }
            })
            .catch((error) => {
                console.error("Error fetching pie chart data:", error);
            });
    }, []);


    // Preparing data for the Line chart
    const chartData = {
        labels: signupData.map((item) => {
            const date = new Date(item._id);
            return date.toLocaleDateString('en-US'); // Specify the format you want
        }),
        datasets: [
            {
                label: 'User Signups',
                data: signupData.map((item) => item.count),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(114, 205, 218, 0.3)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
            },
        ],

    };

    // user signup garph options
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'User Signups',
                color: '#fff',
            },
            legend: {
                labels: {
                    color: '#fff',
                }
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                min: 0,
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
                ticks: {
                    color: '#fff',
                }
            },
        }
    };


    const columns = [
        {
            field: "select", headerName: "Select", width: 100, renderCell: (params) => (
                <Checkbox checked={selected.includes(params.row.id)} onChange={() => handleSelect(params.row.id)} />
            )
        },
        { field: "id", headerName: "ID", width: 100 },
        { field: "username", headerName: "Username", width: 200 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phone", headerName: "Phone", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => openUpdateModal(params.row)}>
                    Update
                </Button>
            )
        }
    ];

    const handleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDelete = async () => {
        try {
            console.log("Selected IDs:", selected);  // Check what IDs are selected

            // Create a map of numeric IDs to MongoDB _id for deletion
            const idMap = users.reduce((acc, user, index) => {
                acc[index + 1] = user._id;  // Map the numeric ID to MongoDB _id
                return acc;
            }, {});

            console.log("ID Map:", idMap);  // Check the mapping of numeric IDs to MongoDB _id

            // Find the MongoDB _id values for the selected numeric IDs
            const deletableIds = selected.map(selectedId => idMap[selectedId]);

            console.log("Deletable IDs:", deletableIds);  // Check if deletable MongoDB _ids are found

            if (!deletableIds.length) {
                console.error("No valid users selected for deletion.");
                return;
            }

            // Proceed with deletion using MongoDB _id
            await Promise.all(deletableIds.map(id => axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`)));
            setUsers(users.filter(user => !deletableIds.includes(user._id)));
            setSelected([]);
            alert(`user deleted succesfully!`)
        } catch (error) {
            console.error("Error deleting users:", error);
        }
    };


    const handleUpdate = async () => {
        try {
            const updatedUser = {
                email: updatedEmail,
                username: updatedUsername,
                phone: updatedPhone,
            };

            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, updatedUser);

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === userId ? { ...user, ...updatedUser } : user))
            );

            setOpen(false); // Close the modal
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };


    //  on click the update button this will trigger
    const openUpdateModal = (user) => {
        setUserId(user._id);
        setUpdatedEmail(user.email);
        setUpdatedUsername(user.username);
        setUpdatedPhone(user.phone);
        setOpen(true);
    };

    const rows = users.map((user, index) => ({
        id: index + 1,  // This is the numeric ID for display
        username: user.username,
        email: user.email,
        phone: user.phone,
        _id: user._id,  // Retain the MongoDB _id for backend operations
    }));


    return (
        <div className="container">
            <h1 className='headingAdmin'>Admin Home Page</h1>
            <div className="charts-container">
                <div className="chart-container" style={{ position: 'relative', height: '400px', width: '600px' }}>
                    <Line data={chartData} options={options} />
                </div>
                
                <div className="pie-container">
                    <h1> Vote Polling</h1>
                    {pieChartData.datasets && pieChartData.datasets.length > 0 ? (
                        <Pie data={pieChartData} />
                    ) : (
                        <p>Loading pie chart data...</p>
                    )}
                </div>
            </div>

            <div className="users-container">

                <div className="headingUser-container">
                    <h1>Users List </h1>
                </div>
                <Paper>
                    <Toolbar>
                        {selected.length > 0 && (
                            <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
                                {selected.length} selected
                            </Typography>
                        )}
                        {selected.length > 0 && (
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                    <div className="table-container">
                        <div style={{ height: 400, width: '100%'  }} >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                 pagination
                                
                                style={{ paddingBottom: '20px' }}
                                checkboxSelection
                                onSelectionModelChange={(newSelection) => setSelected(newSelection.selectionModel)}
                            />
                        </div>
                    </div>
                    <Toolbar>
                        <Typography variant="body2" sx={{ flex: '1 1 100%', }}>
                            Rows per page: 5 | 1–5 of {users.length}
                        </Typography>
                    </Toolbar>
                </Paper>
            </div>

            {/* Modal for updating user details */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="update-user-modal"
                aria-describedby="update-user-details"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2>Update User</h2>
                    <TextField
                        label="Email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        value={updatedUsername}
                        onChange={(e) => setUpdatedUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        value={updatedPhone}
                        onChange={(e) => setUpdatedPhone(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            </Modal>


        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default AdminHomePage;

// mark da